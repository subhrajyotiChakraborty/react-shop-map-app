import { toast } from "react-toastify";

export const showToast = (isSuccess, toastMessage) => {
  toast(toastMessage, {
    onOpen: (props) => console.log("Toast mounted in DOM"),
    onClose: (props) => console.log("Toast unmounted from DOM"),
    autoClose: 6000,
    type: isSuccess ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
  });
};
