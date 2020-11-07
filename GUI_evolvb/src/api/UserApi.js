import { isLoading } from '../store/mainStore.js';

const UserApi = {
    getAllUser: async() => {
        isLoading.set(true);
        let res = await fetch('http://localhost:3000/user/getAllUser');
        let data = await res.json();
        isLoading.set(false);
        if (data.success !== true) {
            return "";
        } else {
            return data.data;
        }
    },

    findUser: async(userData) => {
        isLoading.set(true);
        let res = await fetch('http://localhost:3000/user/findUser', {
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
            return data.data;
        }
    },

    findUserByLogin: async(userData) => {
        isLoading.set(true);
        let res = await fetch('http://localhost:3000/user/findUserByLogin', {
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
            return data.data;
        }
    },

    addNewUser: async(userData) => {
        isLoading.set(true);
        let res = await fetch('http://localhost:3000/user/addNewUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(userData)
        });
        let data = await res.json();
        isLoading.set(false);
        if (data.success !== true) {
            return "DB_ERROR";
        } else {
            return data.login;
        }
    }

}

export default UserApi;