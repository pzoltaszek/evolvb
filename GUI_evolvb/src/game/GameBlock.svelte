<script>
    import { loggedUser, menuState } from '../store/mainStore.js';
    import Enum from '.././common/Enum.js';

    const handleBackToMenu = () => {
        menuState.set(Enum.MENU_STATE.LOGGED);
    }
</script>


<button on:click={handleBackToMenu}>back to menu</button>
<p>game block</p>