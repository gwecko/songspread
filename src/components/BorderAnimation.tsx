import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  dimensions: [
    height: number,
    width: number,
  ]
}

const BorderAnimation: React.FC<Props> = ({ children, dimensions: [height, width] }) => {
  const colorStart = "#CBD5E0";
  const colorEnd = "#B794F4";

  return (
    <Box m={"auto"} w={"fit-content"}>
      {/* the overlay that creates a pseudo-border*/}
      <motion.div
        style={{
          position: "relative",
          zIndex: "2",
          padding: "0.3em",
          borderRadius: "10px",
          overflow: "hidden",
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* rotating gradient div for illusing of moving border */}
        <motion.div
          style={{
            position: "absolute",
            background: `conic-gradient(from 0deg, ${colorStart}, ${colorEnd}, ${colorStart})`,
            height: height ? 3 * height : "100vh",
            width: width ? 3 * width : "100vw",
            top: "40%",
            translateY: "-50%",
            left: "50%",
            translateX: "-50%",
            zIndex: "-1",
            pointerEvents: 'none',
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
