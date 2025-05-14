import { Validator } from "app/shared/utils/validator";


export class LoginDTO {
    email: string;
    password: string;
    type: string;

    constructor (email: string, password: string, type: string) {
        this.email = email;
        this.password = password;
        this.type = type;
    }

    public static fromJSON (json:any): LoginDTO|string {
            if (Validator.emailComprobation(json.email)) {
                return new LoginDTO(json.email, json.password, "n");
            } else {
                return "El email no cumple el formato correcto, revísalo por favor.";
            }
    }

    public static getSession (): LoginDTO {
        const sessionData = sessionStorage.getItem("token");
        if (sessionData) {
            try {
                return JSON.parse(sessionData) as LoginDTO;
            } catch (error) {
                console.error("Error parsing session data", error);
                return new LoginDTO("", "", "");
            }
        } else {
            return new LoginDTO("", "", "");
        }
    }
}