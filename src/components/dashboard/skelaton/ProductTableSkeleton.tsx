import { Table, Skeleton,HStack } from "@chakra-ui/react";

const ProductTableSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="6" />
          <Table.ColumnHeader>Image</Table.ColumnHeader>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Stock</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
          <Table.ColumnHeader>Controller</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((_, i) => (
          <Table.Row key={i}>
            {/* Checkbox */}
            <Table.Cell>
              <Skeleton boxSize="16px" />
            </Table.Cell>

            {/* Image */}
            <Table.Cell>
              <Skeleton w="70px" h="70px" borderRadius="md" />
            </Table.Cell>

            {/* Product */}
            <Table.Cell>
              <Skeleton h="12px" w="120px" />
            </Table.Cell>

            {/* Title */}
            <Table.Cell>
              <Skeleton h="12px" w="200px" />
            </Table.Cell>

            {/* Stock */}
            <Table.Cell>
              <Skeleton h="20px" w="40px" borderRadius="md" />
            </Table.Cell>

            {/* Category */}
            <Table.Cell>
              <Skeleton h="12px" w="80px" />
            </Table.Cell>

            {/* Price */}
            <Table.Cell>
              <Skeleton h="12px" w="60px" />
            </Table.Cell>

            {/* Actions */}
            <Table.Cell>
              <HStack>
                <Skeleton boxSize="24px" borderRadius="md" />
                <Skeleton boxSize="24px" borderRadius="md" />
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ProductTableSkeleton;
