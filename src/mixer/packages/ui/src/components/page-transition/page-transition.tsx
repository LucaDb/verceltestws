import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { easeOutExpo } from '../../utils';

type Props = {
  children: ReactNode;
};

export const PageTransition = ({ children }: Props) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.6, ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
