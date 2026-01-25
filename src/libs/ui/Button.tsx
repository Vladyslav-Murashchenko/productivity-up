import { Button as ButtonHU } from "@heroui/react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  isIconOnly?: boolean;
  variant?: "primary" | "secondary";
};

export const Button = ({
  children,
  onClick,
  size,
  isIconOnly,
  variant,
}: ButtonProps) => {
  return (
    <ButtonHU
      onPress={onClick}
      size={size}
      isIconOnly={isIconOnly}
      variant={variant}
    >
      {children}
    </ButtonHU>
  );
};
