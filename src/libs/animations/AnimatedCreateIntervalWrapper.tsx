import { motion } from "motion/react";

import { transition } from "./_internal/settings";

type AnimatedCreateIntervalWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const AnimatedCreateIntervalWrapper = ({
  children,
  className,
}: AnimatedCreateIntervalWrapperProps) => {
  return (
    <motion.div
      className={className}
      exit={{ opacity: 0, scale: 0.9, height: 0 }}
      initial={{ opacity: 1, scale: 1, height: 0 }}
      animate={{ opacity: 1, scale: 1, height: "auto" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};
