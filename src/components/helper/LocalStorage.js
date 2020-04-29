
const wrappers = {
    getItem(key) {
        return localStorage.getItem(key);
    },

    setItem(key, value) {
        localStorage.setItem(key, value);
    },

    rmItem(key) {
        localStorage.removeItem(key)
    }
}
export class LocalStorage {


    USER_DATA = "user_data";
    USER_JWT = "user_jwt";


    setUserData(value) {
        wrappers.setItem(this.USER_DATA, value);
    }
    getUserData() {
        return wrappers.getItem(this.USER_DATA)
    }
    rmUserData() {
        wrappers.rmItem(this.USER_DATA);
    }


    setUserJwt(value) {
        wrappers.setItem(this.USER_JWT, value);
    }
    getUserJwt() {
        return wrappers.getItem(this.USER_JWT)
    }
    rmUserJwt() {
        wrappers.rmItem(this.USER_JWT);
    }


}