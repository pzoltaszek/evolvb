<script>
    import { menuState } from '../store/mainStore.js';
    import Enum from '.././common/Enum.js';
    import Levels from './Levels.svelte'

    let pauseGame = false;
    const handleBackToMenu = () => {
        menuState.set(Enum.MENU_STATE.LOGGED);
    }
    const pause = () => {
        pauseGame = !pauseGame;
    }
</script>

<div class='game-menu-container'>
    <button on:click={handleBackToMenu}>back to menu</button>
    <button on:click={pause}>pause</button>
    <div class='game-block-container'>
        <Levels {pauseGame}/>
    </div>
</div>

<style>
    .game-menu-container{
		display:flex;
        text-align: center;
		align-items: center;
		justify-content: flex-start;
    }
	.game-block-container{
		display:flex;
        text-align: center;
		align-items: center;
		justify-content: center;
    }
</style>