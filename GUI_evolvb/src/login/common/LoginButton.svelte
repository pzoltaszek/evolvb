<script>
    export let type;
    
    let className = type + '-button';
</script>

<button class={className} on:click>
    <slot/>
</button>

<style>
    .login-button, .register-button {
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

    .register-button:focus, .register-button:hover {
    color: black;
    cursor: pointer;
    border-bottom: 2px solid black;
    outline: none;
    }

    .login-button:active, .register-button:active {
    border-bottom: 2px solid #ff3e00;;
    }
</style>