import { useState } from "react";
import { Image, VStack } from "@chakra-ui/react";
import PageHeader from "./ui/PageHeader";
import {
  ActionBar,
  Button,
  Checkbox,
  Kbd,
  Portal,
  Table,
  Flex,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
  title: string;
  category: string;
  stock: number;
    price: number;
    image: string;
}
const items: Product[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    name: "Laptop",
    title: 'MacBook Pro 14"',
    category: "Electronics",
    stock: 12,
    price: 1999.99,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    name: "Coffee Maker",
    title: "Nespresso Essenza",
    category: "Home Appliances",
    stock: 5,
    price: 149.99,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    name: "Desk Chair",
    title: "Ergonomic Mesh Chair",
    category: "Furniture",
    stock: 20,
    price: 250.0,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    name: "Smartphone",
    title: "iPhone 15 Pro",
    category: "Electronics",
    stock: 50,
    price: 1199.99,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    name: "Headphones",
    title: "Sony WH-1000XM5",
    category: "Accessories",
    stock: 8,
    price: 349.99,
  },
];

const Dashboard: React.FC = () => {
  const [selection, setSelection] = useState<number[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = items.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : selection.filter((id) => id !== item.id),
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell fontWeight="medium">
        <Image htmlWidth="70px" htmlHeight="70px" src={item.image} />
      </Table.Cell>
      <Table.Cell fontWeight="medium">{item.name}</Table.Cell>
      <Table.Cell>{item.title}</Table.Cell>
      <Table.Cell>
        <Badge colorPalette={item.stock > 10 ? "green" : "red"}>
          {item.stock}
        </Badge>
      </Table.Cell>
      <Table.Cell>{item.category}</Table.Cell>
      <Table.Cell textAlign="end">${item.price.toFixed(2)}</Table.Cell>

      <Table.Cell>
        <Flex gap="2">
          <IconButton aria-label="Edit" size="sm" variant="ghost">
            <FiEdit2 />
          </IconButton>
          <IconButton
            aria-label="Delete"
            size="sm"
            variant="ghost"
            colorPalette="red"
          >
            <FiTrash2 />
          </IconButton>
        </Flex>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <VStack
        align="stretch"
        gap={4}
        w="full"
        overflowX="scroll"
        textOverflow="ellipsis"
              
      >
        <PageHeader title={"MY PRODUCTS"} />

        <Table.Root
          colorPalette={"gray"}
          size={{ base: "sm", md: "md" }}
          borderRadius="xl"
          whiteSpace="nowrap"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="6">
                <Checkbox.Root
                  size="sm"
                  top="0.5"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? items.map((item) => item.id) : [],
                    );
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Image</Table.ColumnHeader>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Stock</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Controller</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table.Root>

        <ActionBar.Root open={hasSelection}>
          <Portal>
            <ActionBar.Positioner>
              <ActionBar.Content>
                <ActionBar.SelectionTrigger>
                  {selection.length} selected
                </ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                <Button variant="outline" size="sm">
                  Delete <Kbd>⌫</Kbd>
                </Button>
                <Button variant="outline" size="sm">
                  Share <Kbd>T</Kbd>
                </Button>
              </ActionBar.Content>
            </ActionBar.Positioner>
          </Portal>
        </ActionBar.Root>
      </VStack>
    </>
  );
};

export default Dashboard;
