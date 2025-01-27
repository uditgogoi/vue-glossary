const useToastNotification=(toast)=> {
    const showToast= ({type="info", title="Notice",message="", time=3000})=> {
        toast.add({severity:type, summary:title,detail:message, life:time})
    }
    return {showToast};
}

export const showToastMessage = (toast,obj) => {
    const {showToast}= useToastNotification(toast);
    showToast({
      type: obj.type,
      title: obj.title,
      message: obj.message,
      time: obj.time || 3000,
    });
  };