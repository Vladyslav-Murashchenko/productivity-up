import { Button as ButtonHU } from "@heroui/react";

type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return <ButtonHU>{children}</ButtonHU>;
};
