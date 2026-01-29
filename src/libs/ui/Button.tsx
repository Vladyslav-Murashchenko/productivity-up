import { Button as ButtonH } from "@heroui/react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  isIconOnly?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  className?: string;
};

export const Button = (props: ButtonProps) => {
  return <ButtonH {...props} />;
};
