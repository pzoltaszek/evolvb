<script>
    import { gameStatus } from '../store/gameStore.js';
    import Enum from '.././common/Enum.js';
    import Levels from './Levels.svelte';
    import GameOptionsButton from './common/GameOptionsButton.svelte';
    import OptionMenuPopup from './popups/OptionMenuPopup.svelte';

    let pauseGame = Enum.GAME_STATE.PLAY;
    let openOptionMenuPopup = false;
    const unsubscribe = gameStatus.subscribe(value => {
		pauseGame = value;
    });

    const closeOptionMenuPopup = () => {
        openOptionMenuPopup = false;
    }
    
    const handleOpenOptionMenuPopup = () => {
        gameStatus.set(Enum.GAME_STATE.PAUSE);
        openOptionMenuPopup = true;
    };
    
    const pause = () => {
        pauseGame === Enum.GAME_STATE.PAUSE ? gameStatus.set(Enum.GAME_STATE.PLAY) : gameStatus.set(Enum.GAME_STATE.PAUSE);
    };
</script>

<div class='game-menu-container'>
    <div class='game-options-container'>
        <GameOptionsButton on:click={handleOpenOptionMenuPopup} text='Menu'></GameOptionsButton>
        <br>
        <GameOptionsButton on:click={pause} text='pause'></GameOptionsButton>
    </div>
   
    <div class='game-block-container'>
        <Levels/>
    </div>
    <div class='game-info-container'>
        <p>{pauseGame}</p>
    </div>
</div>
<OptionMenuPopup on:close-option-menu-popup={closeOptionMenuPopup} open={openOptionMenuPopup}></OptionMenuPopup>


<style>
    .game-menu-container{
		display: flex;
        text-align: center;
		align-items: center;
    }

    .game-options-container{
        flex-direction: column;
        top: 10%;
        position: absolute;
        width: 8%;
    }

    .game-info-container {
        position: absolute;
        top: 6%;
        left: 10%;
    }
</style>