import { ButtonGroup as ButtonGroupH } from "@heroui/react";

type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  return <ButtonGroupH className={className}>{children}</ButtonGroupH>;
};
