<script>
	import Image from './common/Image.svelte';
	import LoadingMask from './common/LoadingMask.svelte';
	import Menu from './Menu.svelte';
	import GameBlock from './game/GameBlock.svelte';
	import { isLoading, menuState } from './store/mainStore.js';
    import Enum from './common/Enum.js';
	export let title;

	let loading;
	const unsubscribeLoading = isLoading.subscribe(value => {
		loading = value;
	});
	let state = null;
    const unsubscribe = menuState.subscribe(value => {
		state = value;
	});

</script>

<div class='main'>
	<Image/>
	<LoadingMask active={loading}/>
	{#if state !== Enum.MENU_STATE.GAME}
		<h1>{title}</h1>
		<Menu/>
	{:else}
			<GameBlock/>
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
	}
</style>