import {
    USER_DATA,
    USER_LOGOUT
} from "../types";

export const userData = (data, jwt) => {

    return {
        type: USER_DATA,
        payload: {
            data,
            jwt
        },
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
        payload: null,
    }
}