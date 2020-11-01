<script>
    import LoginButton from './common/LoginButton.svelte';
    import CommonLoginInput from './common/CommonLoginInput.svelte';
    import RegisterPopupBlock from './register/RegisterPopupBlock.svelte';
    import { isUserLogged } from '../store/mainStore.js';
    import UserApi from '../api/UserApi.js';

    let login = '',
    pass = '',
    modalOpen = false;

    const switchRegisterPopup = () =>{
        modalOpen = !modalOpen;
    }
    const aa  = async () => {
        let users = await UserApi.getAllUser();
        users.forEach(element => {
            console.log(element);
        });
        
        }

    const handleSubmit = async () => {
        console.log(login + ' : ' + pass);
        let res = await UserApi.findUser({login: login, pass: pass});
        if (res){
            console.log(res);
            //isUserLogged.set(true);
        } else {
            alert ('no user '+ login);
        }
        login = '';
        pass = '';
        // isUserLogged.update(value => !value);
    }

    const getall = () =>{
        aa();
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
        <LoginButton type={"login"} on:click={getall}>getAll</LoginButton>
        <LoginButton type={"login"} on:click={switchRegisterPopup}>register</LoginButton>
    </span>
</div>
<RegisterPopupBlock open={modalOpen} on:close-register-popup={switchRegisterPopup}/>