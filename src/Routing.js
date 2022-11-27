export const Routing = {
    goTo:(navigate,path)=>{
        navigate(path);
    },
    goBack:(navigate)=>{
        navigate(-1);
    },
    goForward:(navigate)=>{
        navigate(1);
    }
}

