<button on:click>
    <slot/>
</button>


<style>
    button {
    background-color: rgba(0,0,0,0);
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
    color: gray;
    }

    button:hover {
    color: white;
    cursor: pointer;
    border-bottom: 2px solid white;
    outline: none;
    text-shadow:
			0 0 1px #fff,
    		0 0 7px #fff,
    		0 0 10px #fff,
    		0 0 21px #fff
    }

    button:active {
    border-bottom: 2px solid #ff3e00;;
    }

    button:focus {
    border-bottom: 2px solid white;
    }
</style>