<button on:click>
    <slot/>
</button>


<style>
    button {
    background-color: rgba(0,0,0,0);
    color: gray;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    outline: none;
    color: gray;
    }

    button:hover {
    color: black;
    cursor: pointer;
    border-bottom: 2px solid black;
    outline: none;
    }

    button:active {
    border-bottom: 2px solid #ff3e00;;
    }
</style>