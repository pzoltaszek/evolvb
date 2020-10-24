<script>
    import LoginButton from './common/LoginButton.svelte';
    import CommonLoginInput from './common/CommonLoginInput.svelte';
    let login = '';
    let pass = '';
    const handleSubmit = () => {
        console.log(login + ' : ' + pass);
    }

    const handleRegister = () => {
        console.log(login + ' : ' + pass);
    }
</script>

<div>
    <CommonLoginInput/>
    <input class= "login-input"
        type="text" placeholder="login"
        autoComplete='off' bind:value={login}>
    <br>
    <br>
    <input class="pass-input"
        type="text" placeholder="pass"
        autoComplete='off' bind:value={pass}>
    <br>
    <br>
    <span>
        <LoginButton on:click={handleSubmit}>submit</LoginButton>
        <LoginButton on:click={handleRegister}>register</LoginButton>
    </span>
</div>

<style>   
	input {
	padding: 0.4em;
	margin: 0em;
    }
    
	.login-input, .pass-input, .login-input-wrong, .pass-input-wrong {
    background-color: rgba(0,0,0,0);
    color: white;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
    }

    .login-input-wrong, .pass-input-wrong {
    border-bottom: 2px solid rgba(255, 40, 0, 0.7);
    }

    .login-input:focus, .pass-input:focus {
    border-bottom: 2px solid white;
    }
</style>