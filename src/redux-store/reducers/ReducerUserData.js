import {
    USER_DATA,
    USER_LOGOUT
} from "../types";
import { LocalStorage } from "../../components/helper/LocalStorage";

const INITIAL_STATE = {
    user: {},
    token: undefined
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case USER_DATA: {
            return {
                ...state,
                user: action.payload.data,
                token: action.payload.jwt,
            }
        }
        case USER_LOGOUT: {
            new LocalStorage().rmUserData()
            new LocalStorage().rmUserJwt()
            return {
                ...state,
                user: {},
                token: undefined
            }
        }

        default:
            return {
                ...state
            }
    }

}