<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import UserSettingsTab from './UserSettingsTab.svelte';
    import UserApi from '../../api/UserApi.js';
    import { loggedUser } from '../../store/mainStore.js';

    let user = true;
    let isLogged = null,
    activeTab = "1";
    const unsubscribe = loggedUser.subscribe(value => {
		isLogged = value;
	});
    onMount( async() => {
       // user = await UserApi.findUserByLogin({login: isLogged});
       // !user ? clearAndClose() : null;
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
        <div class="title">
            <div class ="tabs-title">
                <span class="tab-link active" on:click={switchTab} id="1">User data</span>
                <span class="tab-link" on:click={switchTab} id="2">Tab2</span>
            </div>
            <div class="closing-square"  on:click={clearAndClose}>&times;</div>
        </div>
        <div class="tabs-content {activeTab}">
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
    background-color: rgba(0,0,0,0.2);
}

.popup-content {
    color: gray;
    position: relative;
    background-color: rgba(0,0,0,0.6);
    margin: auto;
    width: 25%;
    height: 35%;
    overflow: none;
    animation: showPopup 0.8s 1;
    backdrop-filter: blur(2px);
}

.title {
    position: absolute;
    top: 0px;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: gray; 
    border-bottom: 1px solid black;
}

.tabs-title {
    width: 100%;
}

.tab-link {
    font-size: 1.1em;
    color:gray;
    margin-left: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.tab-link.active {
    font-weight: bold;
    color: white;
    cursor: pointer;
    border-bottom: 2px solid white;
    outline: none;
    text-shadow:
			0 0 1px #fff,
    		0 0 7px #fff
}

.tab-link:hover,
.tab-link:focus {
    font-weight: bold;
    color: white;
    cursor: pointer;
    border-bottom: 2px solid white;
    outline: none;
    text-shadow:
			0 0 1px #fff,
    		0 0 7px #fff
}

.closing-square {
    color: gray;
    font-weight: bold;
    padding-right: 5px;
    font-size: 2.0em;
}

.closing-square:hover,
.closing-square:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
    text-shadow:
			0 0 1px #fff,
    		0 0 7px #fff
}

.tabs-content {
    padding: 30px;
}

@keyframes showPopup {
    0% {opacity: 0.0; height: 1%};
    100%{opacity: 1.0; height: 30%};
}

</style>