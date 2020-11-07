<script>
    import LoginButton from '../../login/common/LoginButton.svelte';
    import CommonLoginInput from '../../login/common/CommonLoginInput.svelte';
    export let user;
    let newPass = '',
    oldPass = '',
    wrongCredentials = false;

    const handlePassChange = () => {
        if (oldPass !== user.pass) {
            setWrongCredentials();
            clear();
        } else {
            //send to server
            clear();
        }
    };

    const clear = () => {
        newPass = '';
        oldPass = '';
    };

    const setWrongCredentials = () => {
        if (wrongCredentials){
            return;
        }
        wrongCredentials = true;
        setTimeout(()=> {wrongCredentials = false}, 3000);
    };
</script>


<p>You can change your password here:</p>
<CommonLoginInput type={"register-old pass"} bind:value={oldPass}/>
<br><br>
<CommonLoginInput type={"register-new pass"} bind:value={newPass}/>
<br><br>
<LoginButton type={"register"} on:click={handlePassChange}>change pass</LoginButton>
<br><br>
{#if wrongCredentials}
<div class="login-info">Wrong credentials</div>
{/if}

<style>
     .login-info {
    color: #ff3e00;
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