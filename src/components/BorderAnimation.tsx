import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  width?: number;
  height?: number;
}

const BorderAnimation: React.FC<Props> = ({ children, width, height }) => {
  const colorStart = "#CBD5E0";
  const colorEnd = "#B794F4";

  return (
    <Box m={'auto'} w={'fit-content'}>
      {/* the overlay that creates a pseudo-border*/}
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
        {/* rotating gradient div for illusing of moving border */}
      <motion.div
        style={{
          position: "absolute",
          background: `conic-gradient(from 0deg, ${colorStart}, ${colorEnd}, ${colorStart})`,
          height: height ? 2 * height : '80vw',
          width: width ? 2 * width : '80vw',
          top: '40%',
          translateY: '-50%',
          left: '50%',
          translateX: '-50%',
          zIndex: "-1",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
        {children}
      </motion.div>
    </Box>
  );
};

export default BorderAnimation;
