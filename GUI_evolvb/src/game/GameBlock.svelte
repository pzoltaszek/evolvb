<script>
    import { gameStatus, playerEnergy } from "../store/gameStore.js";
    import Enum from ".././common/Enum.js";
    import Levels from "./Levels.svelte";
    import Player from "./common/Player";
    import GameOptionsButton from "./common/GameOptionsButton.svelte";
    import OptionMenuPopup from "./popups/OptionMenuPopup.svelte";
    import { onMount } from "svelte";
    import GameOverPopup from "../game/popups/GameOverPopup.svelte";
    import { menuState } from '../store/mainStore';

    onMount(() => {
        energyBarDOM = document.querySelector(".game-info-energy-bar");
    });

    let energyBarDOM = null;
    let openOptionMenuPopup = false,
    openGameOverPopup  = false,
    openPlayerPopup = false;
    $: if (energyBarDOM !== null) {
        energyBarDOM.style.width = `${(500 * $playerEnergy) / Player.maxEnergy}px`;
    };

    $: if ($gameStatus === Enum.GAME_STATE.STOP) {
        openGameOverPopup = true;
    };
        
    const closeOptionMenuPopup = () => {
        openOptionMenuPopup = false;
    };

    const closeGameOverPopup = () => {
        openGameOverPopup = false;
        menuState.set(Enum.MENU_STATE.LOGGED);
    };

    const closePlayerPopup = () => {
        openPlayerPopup = false;
        gameStatus.set(Enum.GAME_STATE.PLAY);
    };

    const handleOpenOptionMenuPopup = () => {
        gameStatus.set(Enum.GAME_STATE.PAUSE);
        openOptionMenuPopup = true;
    };

    const handleOpenPlayerPopup = () => {
        gameStatus.set(Enum.GAME_STATE.PAUSE);
        openPlayerPopup = true;
    };

    const pause = () => {
        gameStatus.set(
            $gameStatus === Enum.GAME_STATE.PAUSE
                ? Enum.GAME_STATE.PLAY
                : Enum.GAME_STATE.PAUSE
        );
    };
</script>

<div class="game-menu-container">
    <div class="game-options-container">
        <p>{$gameStatus}</p>
        <GameOptionsButton on:click={handleOpenOptionMenuPopup} text="Menu" />
        <GameOptionsButton on:click={pause} text="Pause" />
        <GameOptionsButton on:click={handleOpenPlayerPopup} text="Player" />
    </div>

    <div class="game-block-container">
        <Levels />
    </div>
    <div class="game-info-energy-container">
        <div class="game-info-energy-bar" />
        <span>Energy: {$playerEnergy} / {Player.maxEnergy}</span>
    </div>
</div>
<OptionMenuPopup
    on:close-option-menu-popup={closeOptionMenuPopup}
    open={openOptionMenuPopup}/>

<GameOverPopup
    on:close-game-over-popup={closeGameOverPopup}
    open={openGameOverPopup} />

<style>
    .game-menu-container {
        display: flex;
        text-align: center;
        align-items: center;
        color: white;
    }

    .game-options-container {
        flex-direction: column;
        top: 7%;
        position: absolute;
        width: 8%;
    }

    .game-info-energy-container {
        position: absolute;
        background-color: gray;
        top: 90%;
        left: 10%;
        width: 500px;
        height: 10px;
    }

    .game-info-energy-bar {
        width: 500px;
        height: 10px;
        background: green;
    }
</style>
