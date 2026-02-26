import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAdmin: false,
    loader: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload
            state.loader = false
        },
        userNoExist: (state) => {
            state.user = null
        }
    }
})

export default authSlice 
export const {userExist , userNoExist} = authSlice.actions