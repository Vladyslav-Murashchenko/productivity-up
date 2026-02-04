import { FieldError as FieldErrorH } from "@heroui/react";

type FieldErrorProps = {
  children: React.ReactNode;
};

export const FieldError = ({ children }: FieldErrorProps) => {
  return <FieldErrorH>{children}</FieldErrorH>;
};
