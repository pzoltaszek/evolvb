import { isLoading } from '../store/mainStore.js';

const GameApi = {
    loadGame: async(userData) => {
        isLoading.set(true);
        let res = await fetch('http://localhost:3001/we/readFile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(userData)
        });
        let data = await res.json();
        isLoading.set(false);
        if (data.success !== true) {
            return null;
        } else {
            return JSON.parse(data.data);
        }
    }
}

export default GameApi;