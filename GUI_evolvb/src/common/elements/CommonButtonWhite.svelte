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
    }

    button:active {
    border-bottom: 2px solid #ff3e00;;
    }
</style>