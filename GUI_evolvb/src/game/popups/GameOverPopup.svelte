<script>
    import {createEventDispatcher} from 'svelte';
    import CommonButtonWhite from '../../common/elements/CommonButtonWhite.svelte';
    export let open;

    const closePopup = createEventDispatcher();

    const close = () => {
        closePopup('close-game-over-popup');   
    };

</script>

{#if open}
<div class="popup-background">
    <div class="popup-content">
        <div class="popup-title">
            <span class="closing-square" on:click={close}>&times;</span>
        </div>
        <div class="popup-input">
            Lost
            <br><br>
            <CommonButtonWhite on:click={close}>Exit</CommonButtonWhite>
        </div>       
    </div>
</div>
{/if}          

<style>
    .popup-background {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.2);
}

.popup-content {
    position: relative;
    background-color: rgba(0,0,0,0.6);
    margin: auto;
    width: 20%;
    height: 30%;
    overflow: auto;
    display: flex;
    justify-content: center;
    padding: 20px;
    animation: showPopup 0.8s 1;
    backdrop-filter: blur(2px);
}

.popup-title {
    position: absolute;
    top: 0px;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: gray; 
    font-weight: bold;
    border-bottom: 1px solid black;
}

.closing-square {
    padding-right: 5px;
    font-size: 2.0em;
}

.closing-square:hover,
.closing-square:focus {
    color: #ff3e00;
    text-decoration: none;
    cursor: pointer;
}

.popup-input {
    padding: 30px;
    color: #ff3e00;;
}

@keyframes showPopup {
    0% {opacity: 0.0; height: 1%};
    100%{opacity: 1.0; height: 30%};
}
</style>