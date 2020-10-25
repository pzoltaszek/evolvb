<script>
    export let type;
    export let value;

    let placeholder = type.slice(type.indexOf("-") + 1 ,type.length),
    name = type.slice(0, type.indexOf("-")),
    className = name + '-input';
</script>

<input class={className}
    type="text" placeholder={placeholder}
    autoComplete='off' bind:value 
/>

<style>  
	input {
	padding: 0.4em;
	margin: 0em;
    }
    
	.login-input, .pass-input, .login-input-wrong {
    background-color: rgba(0,0,0,0);
    color: white;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
    }

    .register-input, .register-input-wrong {
    background-color: rgba(0,0,0,0);
    color: black;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
    }

    .login-input-wrong, .register-input-wrong {
    border-bottom: 2px solid rgba(255, 40, 0, 0.7);
    }

    .login-input:focus {
    border-bottom: 2px solid white;
    }

    .register-input:focus {
    border-bottom: 2px solid black;
    }
</style>