import { Validator } from "app/shared/utils/validator";

export class UpdateDTO {
    email: string;
    password: string;
    confirm_password: string;
    name: string;
    description: string;

    constructor (email:string, password:string, confirmPassword:string, name:string, description:string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.confirm_password = confirmPassword;
        this.description = description;
    }

    public static fromJSON (json:any): UpdateDTO|string {
        if (json.password === json.password_confirm) {
            if (json.email == "" || Validator.emailComprobation(json.email)) {
                const message = Validator.passwordComprobation(json.password);
                if (message == "" || json.password == "") {
                    return new UpdateDTO(json.email, json.password, json.password_confirm, json.name, json.description);
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