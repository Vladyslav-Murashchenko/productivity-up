import { Label as LabelH } from "@heroui/react";

type LabelProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

export const Label = (props: LabelProps) => {
  return <LabelH {...props} />;
};
