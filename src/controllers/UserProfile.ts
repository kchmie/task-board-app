import IUserProfile from "../models/UserProfile";
import Serializable from "./Serializable";

export default class UserProfile extends Serializable implements IUserProfile {
    profileName: string;
    inputText: string;

    constructor(profileName: string, inputText: string) {
        super()

        this.profileName = profileName
        this.inputText = inputText
    }

}
