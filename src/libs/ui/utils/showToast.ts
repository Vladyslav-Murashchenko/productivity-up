import { toast } from "@heroui/react";

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
