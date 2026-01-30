import { Toast, toast } from "@heroui/react";

export const ToastContainer = () => {
  return <Toast.Container />;
};

type ShowToastParams = {
  message: string;
  type?: "info" | "error";
  timeout?: number;
};

export const showToast = ({
  message,
  type = "error",
  timeout = 3000,
}: ShowToastParams) => {
  const show = type === "error" ? toast.danger : toast.info;

  show(message, { timeout });
};
