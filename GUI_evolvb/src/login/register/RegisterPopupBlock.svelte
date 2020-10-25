<script>
    import {createEventDispatcher} from 'svelte';
    import CommonLoginInput from '../common/CommonLoginInput.svelte';
    import LoginButton from '../common/LoginButton.svelte';
    export let open;

    const closePopup = createEventDispatcher();

    let newLogin = '',
    newPass = '',
    loginAlreadyExist = false;

    const create = () => {
        loginAlreadyExist = true;
    }
</script>

{#if open}
<div class="popup-background">
    <div class="popup-content">
        <div class="popup-title">
            <span class="closing-square" on:click={() => closePopup('close-register-popup')}>&times;</span>
        </div>
        <div class="popup-input">
            <CommonLoginInput type={"register-login"} bind:value={newLogin}/>
            <br><br>
            <CommonLoginInput type={"register-pass"} bind:value={newPass}/>
            <br><br>
            <LoginButton type={"register"} on:click={create}>create</LoginButton>
            {#if loginAlreadyExist}
                <div class="popup-info">This login already exist</div>
            {/if}
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
    background-color: rgba(0,0,0,0.5);
    animation: showPopup 0.8s 1;
}

.popup-content {
    position: relative;
    background-color: white;
    margin: auto;
    width: 20%;
    height: 30%;
    overflow: auto;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.popup-title {
    position: absolute;
    top: 0px;
    background-color:  rgb(219, 218, 218);
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
}

.popup-info {
    color: #ff3e00;
    padding: 2em;
    font-family: Overpass, sans-serif;
    animation: popup-info-dissapear 3.0s 1;
    visibility: hidden;
}

@keyframes showPopup {
    0% {opacity: 0.0};
    100%{opacity: 1.0};
}

@keyframes popup-info-dissapear {
    0% {visibility:visible; 
        opacity: 1.0};
    100%{opacity: 0.0};
}
</style>