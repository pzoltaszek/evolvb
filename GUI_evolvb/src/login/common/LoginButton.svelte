
<button class='login-button' on:click>
    <slot/>
</button>

<style>
    .login-button {
    background-color: rgba(0,0,0,0);
    color: white;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
    color: gray;
    }

    .login-button:focus, .login-button:hover {
    color: white;
    cursor: pointer;
    border-bottom: 2px solid white;
    outline: none;
    }

    .login-button:active {
    border-bottom: 2px solid green;
    }
</style>