<script>
    import CommonButtonWhite from '../common/elements/CommonButtonWhite.svelte';
    import SettingsPopupBlock from './settings/SettingsPopupBlock.svelte';
    import { loggedUser, menuState } from '../store/mainStore.js';
    import Enum from '../common/Enum';

    let modalOpen = false;
    const handleStart = () => {
        menuState.set(Enum.MENU_STATE.GAME);
    };

    const handleLoad = () => {
        return;
    };

    const switchSettingsPopup = async () => {
        modalOpen = !modalOpen;
    };

    const handleExit = () => {
        loggedUser.set(null);
        menuState.set(Enum.MENU_STATE.NOT_LOGGED);
    }
    
</script>

    <CommonButtonWhite on:click={handleStart}>Start</CommonButtonWhite>
    <br><br>
    <CommonButtonWhite on:click={handleLoad}>Load</CommonButtonWhite>
    <br><br>
    <CommonButtonWhite on:click={switchSettingsPopup}>Settings</CommonButtonWhite>
    <br><br>
    <CommonButtonWhite on:click={handleExit}>Exit</CommonButtonWhite>
    {#if modalOpen}
    <div class='settings-popup'>
    <SettingsPopupBlock on:close-settings-popup={switchSettingsPopup}/>
    </div>
    {/if}

    <style>
        .settings-popup {
            text-align: left;
        }
    </style>