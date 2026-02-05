import { Button as ButtonH } from "@heroui/react";
import { buttonVariants, tv } from "@heroui/styles";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  isIconOnly?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "text";
  className?: string;
  type?: "button" | "submit";
  isDisabled?: boolean;
};

const customButtonVariants = tv({
  extend: buttonVariants,
  variants: {
    variant: {
      text: "bg-transparent hover:opacity-80 p-0 text-base h-fit",
    },
  },
});

export const Button = ({ className, variant, ...props }: ButtonProps) => {
  return (
    <ButtonH
      className={customButtonVariants({ variant, className })}
      {...props}
    />
  );
};
