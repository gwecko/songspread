import { Stack, Skeleton } from "@chakra-ui/react";

interface Props {
  maxLength: number
  displayLength: number
}

/**
 * Parameters are distinct in order to prevent re-render of array on each change:
 * 
 * @param maxLength number of skeleton blocks to generate
 * @param displayLength individual skeleton blocks to render
 * @see https://chakra-ui.com/docs/components/skeleton/props
 * @returns chakra UI Skeleton JSX
 */
const LoadingSkeleton: React.FC<Props> = ({displayLength, maxLength}) => {
  
  /* timing oscillates based on index */
  const interval = Array.from({ length: maxLength }).map((_, i) => {
    return i % 4 ? (i % 2 ? 0.7 : 1.1) : 0.6;
  });
  
  const skeletonStyles = {
    height: "1.2em",
    startColor: "gray.200",
    endColor: "purple.200",
  };

  return (
    <Stack w={"65vw"} maxW={"600px"}>
      {Array.from({ length: maxLength }).map((_, i) =>
        i < displayLength ? (
          <Skeleton {...skeletonStyles} key={i} speed={interval[i]} />
        ) : null
      )}
    </Stack>
  );
};

export default LoadingSkeleton
