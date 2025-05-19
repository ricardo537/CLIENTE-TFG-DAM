import { Validator } from "app/shared/utils/validator";

export class RegisterDTO {
    email: string;
    password: string;
    confirm_password: string;
    name: string;
    gender: string;

    constructor (email:string, password:string, confirmPassword:string, name:string, gender:string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.confirm_password = confirmPassword;
        this.gender = gender;
    }

    public static fromJSON (json:any): RegisterDTO|string {
        if (json.password === json.password_confirm) {
            if (Validator.emailComprobation(json.email)) {
                const message = Validator.passwordComprobation(json.password);
                if (message == "") {
                    return new RegisterDTO(json.email, json.password, json.password_confirm, json.name, json.gender);
                } else {
                    return message;
                }
            } else {
                return "El email no cumple el formato correcto. Tiene que tener este formato xxxx@xxxx.xxx";
            }
        } else {
            return "Las contraseñas que has introducido tienen que ser iguales, revísalas por favor.";
        }
    }
}