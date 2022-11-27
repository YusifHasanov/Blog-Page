export const Regex= {
    email:(paramsEmail)=>{
        return paramsEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    },
    password:(paramsPassword)=>{
        return paramsPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    },
    name:(paramsName)=>{
        return paramsName.match(/^[a-zA-Z ]{2,30}$/);
    }
};

