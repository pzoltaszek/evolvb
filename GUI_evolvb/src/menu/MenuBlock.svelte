<script>
    import CommonMenuButton from './common/CommonMenuButton.svelte';
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

    <CommonMenuButton on:click={handleStart}>Start</CommonMenuButton>
    <br><br>
    <CommonMenuButton on:click={handleLoad}>Load</CommonMenuButton>
    <br><br>
    <CommonMenuButton on:click={switchSettingsPopup}>Settings</CommonMenuButton>
    <br><br>
    <CommonMenuButton on:click={handleExit}>Exit</CommonMenuButton>
    {#if modalOpen}
    <SettingsPopupBlock on:close-settings-popup={switchSettingsPopup}/>
    {/if}