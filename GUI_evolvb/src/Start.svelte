<script>
	import Image from './common/Image.svelte';
	import LoadingMask from './common/LoadingMask.svelte';
	import Menu from './Menu.svelte';
	import { isLoading } from './store/mainStore.js';
	export let title;

	let loading;
	const unsubscribeLoading = isLoading.subscribe(value => {
		loading = value;
	});

</script>

<div class='main'>
	<Image/>
	<LoadingMask active={loading}/>
	<h1>{title}</h1>
	<Menu/>
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