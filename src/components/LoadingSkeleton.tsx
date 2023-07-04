import { Stack, Skeleton } from "@chakra-ui/react";

interface Props {
  length: number
}

/**
 * 
 * @param length individual skeleton blocks to create
 * @see https://chakra-ui.com/docs/components/skeleton/props
 * @returns chakra UI Skeleton JSX
 */
const LoadingSkeleton: React.FC<Props> = ({length}) => {
  
  /* timing oscillates based on index */
  const interval = Array.from({ length: length }).map((_, i) => {
    return i % 4 ? (i % 2 ? 0.7 : 1.1) : 0.6;
  });
  
  const skeletonStyles = {
    height: "1.2em",
    startColor: "gray.200",
    endColor: "purple.200",
  };

  return (
    <Stack w={"65vw"} maxW={"600px"}>
      {Array.from({ length: length }).map((_, i) =>
        i < length ? (
          <Skeleton {...skeletonStyles} key={i} speed={interval[i]} />
        ) : null
      )}
    </Stack>
  );
};

export default LoadingSkeleton
