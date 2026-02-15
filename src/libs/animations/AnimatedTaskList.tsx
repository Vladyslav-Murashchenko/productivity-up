import { AnimatePresence, motion } from "motion/react";

import { transition } from "./_internal/settings";

type AnimatedTasksListProps = {
  children: React.ReactNode;
  className?: string;
};

export const AnimatedTaskList = ({
  children,
  className,
}: AnimatedTasksListProps) => {
  return (
    <ul className={className}>
      <AnimatePresence mode="popLayout">{children}</AnimatePresence>
    </ul>
  );
};

type AnimatedTaskListItemProps = {
  children: React.ReactNode;
};

const Item = ({ children }: AnimatedTaskListItemProps) => {
  return (
    <motion.li
      layout
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
    >
      {children}
    </motion.li>
  );
};

AnimatedTaskList.Item = Item;
