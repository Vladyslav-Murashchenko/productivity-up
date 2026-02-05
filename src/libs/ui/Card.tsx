import { Card as CardH } from "@heroui/react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary";
};

export const Card = (props: CardProps) => {
  return <CardH {...props} />;
};
