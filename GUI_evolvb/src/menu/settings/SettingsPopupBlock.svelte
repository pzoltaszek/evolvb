<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import UserSettingsTab from './UserSettingsTab.svelte';
    import UserApi from '../../api/UserApi.js';
    import { loggedUser } from '../../store/mainStore.js';

    let user;
    let isLogged = null,
    activeTab = "1";
    const unsubscribe = loggedUser.subscribe(value => {
		isLogged = value;
	});
    onMount( async() => {
        user = await UserApi.findUserByLogin({login: isLogged});
        !user ? clearAndClose() : null;
    });

    const closeSettingsPopup = createEventDispatcher();

    const clearAndClose = () => {
        isLogged = null;
        closeSettingsPopup('close-settings-popup'); 
    };

    const switchTab = (event) => {
        activeTab = event.target.id;
        let tabLinks = document.getElementsByClassName("tab-link");
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        }
        event.target.className += ' active';
    }
    
</script>

{#if user}
<div class="popup-background">
    <div class="popup-content">
        <div class="tabs-menu">
            <span class="tab-link active" on:click={switchTab} id="1">Tab1</span>
            <span class="tab-link" on:click={switchTab} id="2">Tab2</span>
            <div class="popup-close">
                <span class="closing-square" on:click={clearAndClose}>&times;</span>
            </div>
        </div>
        <div class="tab-content {activeTab}">
            {#if activeTab === "1"}
            <UserSettingsTab {user}/>
            {:else}
            <p>empty</p>
            {/if}
        </div>
    </div>
</div>
{/if}         

<style>
    .popup-background {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
    animation: showPopup 0.8s 1;
}

.popup-content {
    position: relative;
    background-color: white;
    margin: auto;
    width: 20%;
    height: 30%;
    overflow: auto;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.tabs-menu {
    position: absolute;
    top: 0px;
    background-color:  rgb(219, 218, 218);
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: black;
    border-bottom: 1px solid black;
}

.tab-link {
    font-size: 1.1em;
    color:black;
    margin-left: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.tab-link.active {
    font-weight: bold;
    color: #ff3e00;
}

.tab-link:hover,
.tab-link:focus {
    color: #ff3e00;
    cursor: pointer;
    text-decoration: underline;
}

.popup-close {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;   
}

.closing-square {
    color: gray;
    font-weight: bold;
    padding-right: 5px;
    font-size: 2.0em;
}

.closing-square:hover,
.closing-square:focus {
    color: #ff3e00;
    text-decoration: none;
    cursor: pointer;
}

.tab-content {
    padding: 30px;
}

@keyframes showPopup {
    0% {opacity: 0.0};
    100%{opacity: 1.0};
}

</style>