<script>
    import CommonButtonWhite from '../../common/elements/CommonButtonWhite.svelte'
    export let text;
</script>

<div>
    <CommonButtonWhite on:click> {text} </CommonButtonWhite>
</div>

<style>
    div {
        height: 2em;
        border: 1px solid black;
    }
</style>