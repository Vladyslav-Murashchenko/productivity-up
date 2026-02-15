import { Input as InputH } from "@heroui/react";
import { ChangeEventHandler } from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  id?: string;
  autoFocus?: boolean;
  type?: "text";
  variant?: "primary" | "secondary";
  className?: string;
  ref: React.Ref<HTMLInputElement>;
};

export const Input = (props: InputProps) => {
  return <InputH {...props} />;
};
