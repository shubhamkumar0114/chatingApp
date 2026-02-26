import {isValidUsername} from "6pp"
export const userValidator = (username)=> {
    if(!isValidUsername(username))
        return {isValid: false , errorMessage: "Username is inviled"}
}