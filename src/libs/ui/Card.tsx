import { Card as CardH } from "@heroui/react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = (props: CardProps) => {
  return <CardH {...props} />;
};
