import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BorderAnimation: React.FC<Props> = ({ children }) => {
  const colorStart = "#CBD5E0";
  const colorEnd = "#B794F4";

  return (
    <Box m={'auto'} w={'fit-content'}>
      <motion.div
        style={{
          position: "relative",
          zIndex: "2",
          padding: "0.3em",
          borderRadius: '10px',
          overflow: "hidden",
          textAlign: 'center',
          width: '100%'
        }}
      >
      <motion.div
        style={{
          position: "absolute",
          background: `conic-gradient(from 0deg, ${colorStart}, ${colorEnd}, ${colorStart})`,
          height: '500px',
          width: '500px',
          top: '50%',
          translateY: '-50%',
          left: '50%',
          translateX: '-50%',
          zIndex: "-1",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
        {children}
      </motion.div>
    </Box>
  );
};

export default BorderAnimation;
