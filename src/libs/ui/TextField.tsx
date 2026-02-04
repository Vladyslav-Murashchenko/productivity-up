import { TextField as TextFieldH } from "@heroui/react";

type TextFieldProps = {
  className?: string;
  children: React.ReactNode;
  isInvalid?: boolean;
};

export const TextField = (props: TextFieldProps) => {
  return <TextFieldH {...props} />;
};
