import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SPECIAL_ACCESS, PROFILE_SUCCESS } from "./auth.type";

let token = localStorage.getItem("user");
const intialState = {
    user: {},
    isAuth: false,
    adminAuth: false,
    token: token,
    loading: false,
    error: false,
    errorMessage: "",
};

export const authReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }

        }
        case SPECIAL_ACCESS: {
            return {
                ...state,
                specialAccess: payload,
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("token", JSON.stringify(payload?.token));
            return {
                ...state,
                isAuth: true,
                token: payload?.token,
                loading: false,
                error: false,
            }
        }
        case PROFILE_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                token: payload?.token,
                user: payload?.userpersent,
                loading: false,
                error: false,
            }
        }
        case LOGIN_ERROR: {

            return {
                ...state,
                isAuth: false,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }

        case LOGOUT: {
            localStorage.removeItem("token");
            return {
                ...state,
                isAuth: false,
            }
        }
        default: {
            return state;
        }
    }
}