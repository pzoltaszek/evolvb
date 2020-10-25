<script>
	import Image from './common/Image.svelte';
	import LoginBlock from './login/LoginBlock.svelte';
	export let title;
</script>

<main>
	<Image/>
	<h1>{title}</h1>
	<LoginBlock/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: bold;
		font-family: RonduitCapitals;
	
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>