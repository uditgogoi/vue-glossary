import {useToast} from "primevue/usetoast";

export const useToastNotification=()=> {
    const toast= useToast();

    const showToast= ({type="info", title="Notice",message="", time=3000})=> {
        toast.add({severity:type, summary:title,detail:message, life:time})
    }
    return {showToast};
}