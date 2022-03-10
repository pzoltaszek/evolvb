<script>
    import MenuButton from "./MenuButton.svelte";
    import SettingsPopupBlock from "./settings/SettingsPopupBlock.svelte";
    import { loggedUser, menuState } from "../store/mainStore.js";
    import Enum from "../common/Enum";

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

    const handleWE = () => {
        window.open("http://localhost:3000/", '_blank');
    };

    const handleExit = () => {
        loggedUser.set(null);
        menuState.set(Enum.MENU_STATE.NOT_LOGGED);
    };
</script>

<MenuButton on:click={handleStart} text="Start"></MenuButton>
<MenuButton on:click={handleLoad} text="Load"></MenuButton>
<MenuButton on:click={switchSettingsPopup} text="Settings"></MenuButton>
<MenuButton on:click={handleWE} text="World Editor"></MenuButton>
<MenuButton on:click={handleExit} text="Exit"></MenuButton>
{#if modalOpen}
    <div class="settings-popup">
        <SettingsPopupBlock on:close-settings-popup={switchSettingsPopup} />
    </div>
{/if}

<style>
    .settings-popup {
        text-align: left;
    }
</style>
