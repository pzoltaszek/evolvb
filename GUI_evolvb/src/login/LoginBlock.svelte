<script>
    import CommonButtonWhite from '../common/elements/CommonButtonWhite.svelte';
    import CommonLoginInput from './common/CommonLoginInput.svelte';
    import RegisterPopupBlock from './register/RegisterPopupBlock.svelte';
    import { loggedUser, menuState } from '../store/mainStore.js';
    import UserApi from '../api/UserApi.js';
    import Enum from '.././common/Enum.js';

    let login = '',
    pass = '',
    modalOpen = false,
    wrongCredentials = false;

    const switchRegisterPopup = () =>{
        modalOpen = !modalOpen;
    };

    const handleSubmit = async () => {
        if (login === '' || pass === ''){
            setWrongCredentials();
            return;
        }
        let res = await UserApi.findUser({login: login, pass: pass});
        if (res) {
            loggedUser.set(login);
            menuState.set(Enum.MENU_STATE.LOGGED);
        } else {
            setWrongCredentials();
        }
        clear();
    };

    const setWrongCredentials = () => {
        if (wrongCredentials){
            return;
        }
        wrongCredentials = true;
        setTimeout(()=> {wrongCredentials = false}, 3000);
    };

    const clear = () => {
        login = '';
        pass = '';
    };
</script>

<div>
    <CommonLoginInput type={"login-login"} bind:value={login} />
    <br>
    <br>
    <CommonLoginInput type={"login-pass"} bind:value={pass} />
    <br>
    <br>
    <span>
        <CommonButtonWhite on:click={handleSubmit}>submit</CommonButtonWhite>
        <CommonButtonWhite on:click={switchRegisterPopup}>register</CommonButtonWhite>
    </span>
    {#if wrongCredentials}
        <div class="login-info">Wrong credentials</div>
    {/if}
</div>
<RegisterPopupBlock open={modalOpen} on:close-register-popup={switchRegisterPopup}/>

<style>
    .login-info {
    color: #ff3e00;
    padding: 1em;
    font-family: Overpass, sans-serif;
    animation: login-info-dissapear 4.0s 1;
    visibility: hidden;
}

@keyframes login-info-dissapear {
    0% {visibility:visible; 
        opacity: 1.0};
    50% {visibility:visible; 
        opacity: 1.0};   
    100%{opacity: 0.0};
}
</style>