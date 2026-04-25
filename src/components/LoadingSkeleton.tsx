import { Skeleton, Stack } from "@chakra-ui/react";

interface Props {
  maxLength: number;
  displayLength: number;
}

const LoadingSkeleton: React.FC<Props> = ({ maxLength, displayLength }) => {
  return (
    <Stack gap={2}>
      {Array.from({ length: maxLength }).map((_, i) =>
        i < displayLength ? <Skeleton key={i} h="1.2em" /> : null
      )}
    </Stack>
  );
};

export default LoadingSkeleton;
