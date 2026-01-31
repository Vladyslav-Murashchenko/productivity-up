import { cn as cnH } from "@heroui/styles";

type CnOption = string | boolean | null | undefined | number;

export const cn = (...classNames: CnOption[]): string | undefined => {
  return cnH(...classNames);
};
