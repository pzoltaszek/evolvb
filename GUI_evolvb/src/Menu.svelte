<script>
    import LoginBlock from './login/LoginBlock.svelte';
    import MenuBlock from './menu/MenuBlock.svelte';
    import GameBlock from './game/GameBlock.svelte';
    import { menuState } from './store/mainStore.js';
    import Enum from './common/Enum.js';
    
    let state = null;
    const unsubscribe = menuState.subscribe(value => {
		state = value;
	});
</script>


   {#if state === Enum.MENU_STATE.NOT_LOGGED}
    <div class='login-block-container'>
        <LoginBlock/>
    </div>
    {:else if state === Enum.MENU_STATE.LOGGED}
    <div class='menu-block-container'>
        <MenuBlock/>
    </div>
    {:else}
    <div class='game-block-container'>
        <GameBlock/>
    </div>
    {/if}

<style>
	.login-block-container {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
    }
    
    .menu-block-container {
        text-align: right;
		padding: 1em;
        margin: 0 auto;
        margin-right: 5%;
        margin-top: 30%;
	}

    .game-block-container{
        text-align: center;
    }
</style>