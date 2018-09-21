import { Player } from './player';
import { Negative } from './negative';
import { Positive } from './positive';
import { Engine, Color } from 'excalibur';
import { BlockBase } from './blockBase';
import { Consts } from '../common/consts';
import { BlockAndPlayerCollider } from '../utils/blockAndPlayerCollider';
import { PlayerAffectedFieldsService } from '../utils/playerAffectedFieldsService';
import { PlayerVelocityCalculator } from '../utils/playerVelocityCalculator';

export class Game {
    private static readonly BlockVelocity = 100;
    private static readonly PlayerVelocity = -100;
    private _engine: Engine;
    private _playerStopY: number;
    private _player: Player;
    private readonly _playerAffectedFieldsService: PlayerAffectedFieldsService = new PlayerAffectedFieldsService();
    private _allBlocks: Set<BlockBase> = new Set<BlockBase>();

    constructor() {
        this.createGameEngine();
        this.startGame();
    }

    private createGameEngine(): void {
        this._engine = new Engine({
            width: 500,
            height: 700,
            canvasElementId: 'background-canvas',
            backgroundColor: Color.fromHex(Consts.GameBackgroundColor)
        });

        this._playerStopY = (this._engine.getWorldBounds().getHeight() / 3) * 2;
        this._engine.start();
    }

    private startGame(): void {
        this._playerAffectedFieldsService.clearAll();

        this.addPlayer();
        this.addPositive(0);
        this.addNegative(0);
    }

    private gameOver() {
        this.removePlayer();

        this._engine.rootScene.actors.forEach(actor => {
            this._engine.remove(actor);
        });

        // this._allBlocks.forEach(block => {
        //     this.removeBlock(block, false);
        // });

        this._allBlocks.clear();
    }

    private addPlayer() {
        this._player = new Player(Game.PlayerVelocity, this._engine.getWorldBounds());
        this._player.onPostUpdate = () => this.onPlayerPostUpdate(this._player);
        this._engine.add(this._player);
        this._engine.input.pointers.primary.on('up', () => { this._player.invertPolarity(); });
    }

    private removePlayer() {
        this._engine.remove(this._player);
        this._player.onPostUpdate = () => {};
        this._player = null;
    }

    private addPositive(offset: number): void {
        const positive = new Positive(offset, Game.BlockVelocity, this._engine.getWorldBounds());
        positive.onPostUpdate = (engine: Engine) =>
            this.onBlockUpdate(engine, positive, (offsetLocal: number) => { this.addPositive(offsetLocal); });
        this.addBlock(positive);
    }

    private addNegative(offset: number): void {
        const negative = new Negative(offset, Game.BlockVelocity, this._engine.getWorldBounds());
        negative.onPostUpdate = (engine: Engine) =>
            this.onBlockUpdate(engine, negative, (offsetLocal: number) => { this.addNegative(offsetLocal); });
        this.addBlock(negative);
    }

    private addBlock(block: BlockBase) {
        this._allBlocks.add(block);
        this._engine.add(block);
    }

    private removeBlock(block: BlockBase, removeFromAllBlocks: boolean) {
        block.onPostUpdate = () => {};
        this._engine.remove(block);

        if (removeFromAllBlocks) {
            this._allBlocks.delete(block);
        }
    }

    private onPlayerPostUpdate(player: Player) {
        if (player.pos.y <= this._playerStopY) {
            player.onPostUpdate = () => {};
            player.vel.y = 0;
        }
    }

    private onBlockUpdate(engine: Engine, block: BlockBase, addAction: (offset: number) => void): void {
        const fieldBounds = block.getFieldBounds();
        const blockBounds = block.getBounds();
        const playerBounds = this._player.getPlayerBounds();

        if (BlockAndPlayerCollider.IsCollide(blockBounds, playerBounds)) {
            this.gameOver();
            return;
        }

        const isBlockFieldCollide = BlockAndPlayerCollider.IsCollide(fieldBounds, playerBounds);
        block.setIsCollide(isBlockFieldCollide);
        if (isBlockFieldCollide) {
            this._playerAffectedFieldsService.addBlock(block);
        } else {
            this._playerAffectedFieldsService.removeBlock(block);
        }

        this._player.vel.x = PlayerVelocityCalculator.calculateVelocityX(
            this._playerAffectedFieldsService.getPlayerAffectedPolarities(),
            this._player.Polarity);

        const bounds = engine.getWorldBounds();
        const top = block.getTop();

        if (top > bounds.bottom) {
            // Удаление блока за пределами нижней границы экрана.
            this.removeBlock(block, true);
            return;
        }

        const createNextPartHeight = (block.getHeight() / 4) * 3;
        const hiddenPartHeight = top - bounds.top;

        if (hiddenPartHeight < 0 &&
            Math.abs(hiddenPartHeight) < createNextPartHeight &&
            !block.createNext) {
            // Если текущий блок почти отобразился - подготавливаем следующий.
            block.createNext = true;
            addAction(top - 1);
        }
    }
}
