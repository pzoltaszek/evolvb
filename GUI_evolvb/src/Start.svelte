<script>
	import Image from "./common/Image.svelte";
	import LoadingMask from "./common/LoadingMask.svelte";
	import Menu from "./Menu.svelte";
	import GameBlock from "./game/GameBlock.svelte";
	import { isLoading, menuState } from "./store/mainStore.js";
	import Enum from "./common/Enum.js";
	export let title;
</script>

<div class="main">
	<Image />
	<LoadingMask active={$isLoading} />
	{#if $menuState !== Enum.MENU_STATE.GAME}
		<h1>{title}</h1>
		<Menu />
	{:else}
		<GameBlock />
	{/if}
</div>

<style>
	.main {
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: bold;
		font-family: RonduitCapitals;
		text-align: center;
		text-shadow:
			0 0 1px #fff,
    		0 0 7px #ff3e00,
    		0 0 10px #ff3e00,
    		0 0 21px #ff3e00,
    		0 0 42px #ff3e00,
    		0 0 82px #ff3e00,
    		0 0 92px #ff3e00,
    		0 0 102px #ff3e00,
    		0 0 151px #ff3e00;
	}
</style>
