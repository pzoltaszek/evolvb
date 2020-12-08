<script>
    import { menuState } from '../store/mainStore.js';
    import Enum from '.././common/Enum.js';
    import Levels from './Levels.svelte';
    import GameOptionsButton from './common/GameOptionsButton.svelte';

    let pauseGame = false;
    const handleBackToMenu = () => {
        menuState.set(Enum.MENU_STATE.LOGGED);
    };
    
    const pause = () => {
        pauseGame = !pauseGame;
    };
</script>

<div class='game-menu-container'>
    <div class='game-options-container'>
        <GameOptionsButton on:click={handleBackToMenu}>back to menu</GameOptionsButton>
        <GameOptionsButton on:click={pause}>pause</GameOptionsButton>
    </div>
   
    <div class='game-block-container'>
        <Levels {pauseGame}/>
    </div>
</div>

<style>
    .game-menu-container{
		display: flex;
        text-align: center;
		align-items: center;
		justify-content: flex-start;
    }

    .game-options-container{
        display: flex;
        flex-direction: column;
        top: 10%;
        position: absolute;
    }
</style>