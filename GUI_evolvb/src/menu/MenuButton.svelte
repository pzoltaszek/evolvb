<script>
    import CommonButtonWhite from '../common/elements/CommonButtonWhite.svelte'
    export let text;
</script>

<div>
    <CommonButtonWhite on:click> {text} </CommonButtonWhite>
</div>

<style>
    div {
        margin-bottom: 1.5em;
    }
</style>