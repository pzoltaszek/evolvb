<script>
    import LoginButton from './common/LoginButton.svelte';
    import CommonLoginInput from './common/CommonLoginInput.svelte';
    import RegisterPopupBlock from './register/RegisterPopupBlock.svelte';

    let login = '',
    pass = '',
    modalOpen=false;

    const closeRegisterPopup = () =>{
        modalOpen = !modalOpen;
    }

    const handleSubmit = () => {
        console.log(login + ' : ' + pass);
    }

    const handleRegister = () => {
        console.log(login + ' : ' + pass);
    }
</script>

<div>
    <CommonLoginInput type={"login-login"} bind:value={login} />
    <br>
    <br>
    <CommonLoginInput type={"login-pass"} bind:value={pass} />
    <br>
    <br>
    <span>
        <LoginButton type={"login"} on:click={handleSubmit}>submit</LoginButton>
        <LoginButton type={"login"} on:click={closeRegisterPopup}>register</LoginButton>
    </span>
</div>
<RegisterPopupBlock open={modalOpen} on:close-register-popup={closeRegisterPopup}/>