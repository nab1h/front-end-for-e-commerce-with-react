import { Badge, HStack, Skeleton } from "@chakra-ui/react";

const SkeltonSelected = () => {
  return (
    <HStack gap="4">
      <Skeleton asChild loading={true}>
        <Badge>Select</Badge>
      </Skeleton>

      <Skeleton loading={false}>
        <Badge>Select</Badge>
      </Skeleton>
    </HStack>
  );
};
export default SkeltonSelected;