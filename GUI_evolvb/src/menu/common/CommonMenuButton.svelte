<button class='menu-button' on:click>
    <slot/>
</button>

<style>
    .menu-button {
    background-color: rgba(0,0,0,0);
    color: white;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
    color: gray;
    }

    .menu-button:hover {
    color: white;
    cursor: pointer;
    border-bottom: 2px solid white;
    outline: none;
    }

    .menu-button:active {
    border-bottom: 2px solid #ff3e00;;
    }
</style>