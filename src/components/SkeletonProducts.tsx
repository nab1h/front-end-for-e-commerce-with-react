import {
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const SkeletonProducts = () => {
  return (
    <Stack gap="6">
      <Skeleton height="200px" />
      <HStack>
        <SkeletonText noOfLines={2} />
      </HStack>
    </Stack>
  );
};

export default SkeletonProducts;
