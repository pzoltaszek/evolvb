<script>
    import {createEventDispatcher} from 'svelte';
    export let selectedActor;

    const closeTooltip = createEventDispatcher();

    const handleTooltipClick = () => {
        closeTooltip('close-actor-tooltip');
    }

    const handleTooltipClick2 = () => {
        closeTooltip('click-actor-tooltip');
    }
</script>


<div
class='tool'
style="width:{100}px;
top:{selectedActor.y0}px;
left:{selectedActor.x0}px;
position:relative;">
<div class='tooltip-option'on:click={handleTooltipClick2}>{selectedActor.actorId}</div>
<div class='tooltip-option'>aaaa</div>
<div class='tooltip-option'>ssss</div>
<div class='tooltip-option' on:click={handleTooltipClick}>Exit</div>
</div>

<style>
.tool{
    background-color: rgba(62, 85, 107, 0.8);
    border-radius: 20%;
}

.tooltip-option{
    color: lightgray;
}

.tooltip-option:hover{
    color: white;
    cursor: pointer;
    font-weight: bold;
    background-color: rgb(62, 85, 107);
    text-decoration: underline;
    border-radius: 20%;
}
    
</style>