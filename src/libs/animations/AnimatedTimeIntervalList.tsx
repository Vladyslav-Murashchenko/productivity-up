import { AnimatePresence, motion } from "motion/react";

import { transition } from "./_internal/settings";

type AnimatedTimeIntervalListProps = {
  children: React.ReactNode;
  className?: string;
};

export const AnimatedTimeIntervalList = ({
  children,
  className,
}: AnimatedTimeIntervalListProps) => {
  return (
    <ul className={className}>
      <AnimatePresence>{children}</AnimatePresence>
    </ul>
  );
};

type AnimatedTimeIntervalListItemProps = {
  children: React.ReactNode;
  className?: string;
};

const Item = ({ children, className }: AnimatedTimeIntervalListItemProps) => {
  return (
    <motion.li
      exit={{ opacity: 0, scale: 0.9, height: 0 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.li>
  );
};

AnimatedTimeIntervalList.Item = Item;
