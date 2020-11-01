const UserApi = {
    getAllUser: async() => {
        let res = await fetch('http://localhost:3000/user/getAllUser');
        let data = await res.json();
        if (data.success !== true) {
            return "";
        } else {
            return data.data;
        }
    },

    findUser: async(userData) => {
        let res = await fetch('http://localhost:3000/user/findUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(userData)
        });
        let data = await res.json();
        if (data.success !== true) {
            return "";
        } else {
            return data.data;
        }
    },

    addNewUser: async(userData) => {
        let res = await fetch('http://localhost:3000/user/addNewUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(userData)
        });
        let data = await res.json();
        if (data.success !== true) {
            return "";
        } else {
            return data.login;
        }
    }

}

export default UserApi;