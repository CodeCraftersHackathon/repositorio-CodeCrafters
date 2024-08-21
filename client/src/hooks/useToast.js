import { toast, Bounce } from 'react-toastify';

export const useToast = (response, message) => {

    const stringResponse = response.toString();

    if (stringResponse.includes("2")) {
        toast.dismiss();
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    } else if (stringResponse.includes("4") || stringResponse.includes("5")) {
        toast.dismiss();
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true, 
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
};
