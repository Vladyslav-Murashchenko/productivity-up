import { TextField as TextFieldH } from "@heroui/react";

type TextFieldProps = {
  className?: string;
  children: React.ReactNode;
};

export const TextField = (props: TextFieldProps) => {
  return <TextFieldH {...props} />;
};
