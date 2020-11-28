<script>
    import {createEventDispatcher} from 'svelte';
    export let selectedActor;

    const closeTooltip = createEventDispatcher();

    const handleTooltipClick = () => {
        closeTooltip('close-actor-tooltip');
    }
</script>


<div
on:click={handleTooltipClick}
class='tool'
style="width:{100}px;
height:{100}px;
top:{selectedActor.y0}px;
left:{selectedActor.x0}px;
position:relative;">{selectedActor.actorId}</div>

<style>
.tool{
    background-color: brown;
}
    
</style>