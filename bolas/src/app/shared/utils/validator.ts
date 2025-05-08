export class Validator {
    
    public static emailComprobation (email:string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public static passwordComprobation (password:string): string {
        const mayusRegex = /[A-Z]/;
        const minusRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialRegex = /[^A-Za-z0-9]/;

        if (password.length < 7) {
            return "La contraseña tiene que tener como mínimo 7 caracteres.";
        } else if (!mayusRegex.test(password)) {
            return "La contraseña tiene que tener una mayúscula como mínimo.";
        } else if (!minusRegex.test(password)) {
            return "La contraseña tiene que tener una minúscula como mínimo.";
        } else if (!numberRegex.test(password)) {
            return "La contraseña tiene que tener un número como mínimo.";
        } else if (!specialRegex.test(password)) {
            return "La contraseña tiene que tener un caracter especial como mínimo";
        }

        return "";
    }
}