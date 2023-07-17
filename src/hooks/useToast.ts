import toast from "react-hot-toast";

export const useToast = () => {
  const successToast = (message: string) => {
    toast.success(message);
  };
  const errorToast = (message: string) => {
    console.log("error toast", message);
    toast.error(message);
  };

  return {
    successToast,
    errorToast,
  };
};
