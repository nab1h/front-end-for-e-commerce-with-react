import { useState } from "react";
import {
  Box,
  CloseButton,
  createListCollection,
  Dialog,
  Field,
  HStack,
  Image,
  Input,
  InputGroup,
  Select,
  VStack,
} from "@chakra-ui/react";
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
import { RiAddLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import type { IProduct, IProductsResponse } from "@/interfaces/interfaces";
import axios from "axios";

const Dashboard: React.FC = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [selection, setSelection] = useState<number[]>([]);
  const hasSelection = selection.length > 0;
  const getProductsList = async (): Promise<IProduct[]> => {
    const { data } = await axios.get<IProductsResponse>(
      `${import.meta.env.VITE_SERVER_URL}/api/products`,
    );
    return data.products;
  };
  const { isLoading, data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsList,
  });
  const indeterminate = hasSelection && selection.length < (data?.length ?? 0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const handleSubmit = () => {};

  console.log(isLoading);
  const rows = data?.map((item) => (
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
                : prev.filter((id) => id !== item.id),
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell fontWeight="medium">
        <Image
          htmlWidth="70px"
          htmlHeight="70px"
          src={
            item.images?.[0]
              ? `${API_URL}/storage/${item.images[0].image_path}`
              : "https://via.placeholder.com/300"
          }
        />
      </Table.Cell>
      <Table.Cell fontWeight="medium">{item.name}</Table.Cell>
      <Table.Cell>{item.description}</Table.Cell>
      <Table.Cell>
        <Badge colorPalette={item.stock > 10 ? "green" : "red"}>
          {item.stock}
        </Badge>
      </Table.Cell>
      <Table.Cell>{item.category.name}</Table.Cell>
      <Table.Cell textAlign="end">${item.price}</Table.Cell>

      <Table.Cell>
        <Flex gap="2">
          {/* EDIT DIALOG */}
          <Dialog.Root
            lazyMount
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
          >
            <Dialog.Trigger asChild>
              <IconButton aria-label="Edit" size="sm" variant="ghost">
                <FiEdit2 />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Box maxW="500px" mx="auto" mt={5}>
                      <form onSubmit={handleSubmit}>
                        <VStack gap={4}>
                          <Field.Root required>
                            <Field.Label>Product Name</Field.Label>
                            <Input placeholder="Enter name the new product" />
                          </Field.Root>

                          <Field.Root required>
                            <Field.Label>Product Description</Field.Label>
                            <Input placeholder="Enter description the new product" />
                          </Field.Root>

                          <HStack w={"full"}>
                            <Flex
                              gap={8}
                              w={"full"}
                              justifyContent="space-between"
                            >
                              <Field.Root required>
                                <Field.Label>Price</Field.Label>
                                <InputGroup startElement="$" endElement="USD">
                                  <Input placeholder="0.00" />
                                </InputGroup>
                              </Field.Root>
                              <Field.Root required>
                                <Field.Label>Stock</Field.Label>
                                <InputGroup>
                                  <Input placeholder="1" />
                                </InputGroup>
                              </Field.Root>
                            </Flex>
                          </HStack>
                          <Select.Root
                            collection={categories}
                            w="full"
                            value={value}
                            onValueChange={(e) => setValue(e.value)}
                          >
                            <Select.HiddenSelect />
                            <Select.Label>Select category</Select.Label>
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Select category" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {categories.items.map((category) => (
                                    <Select.Item
                                      item={category}
                                      key={category.value}
                                    >
                                      {category.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>

                          <Dialog.Footer w="full">
                            <Flex
                              w="full"
                              justifyContent="space-between"
                              align="center"
                            >
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </Dialog.ActionTrigger>
                              <Button colorScheme="teal">Save Product</Button>
                            </Flex>
                          </Dialog.Footer>
                        </VStack>
                      </form>
                    </Box>
                  </Dialog.Body>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          {/* Delete dialog */}
          <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
              <IconButton
                aria-label="Delete"
                size="sm"
                variant="ghost"
                colorPalette="red"
              >
                <FiTrash2 />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Are you sure?</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our systems.
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button colorPalette="red">Delete</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
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

        <Dialog.Root
          lazyMount
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
        >
          <Dialog.Trigger asChild>
            <Button
              colorPalette="teal"
              variant="solid"
              _hover={{ bg: "teal.400" }}
            >
              <RiAddLine /> Add New Product
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Box maxW="500px" mx="auto" mt={5}>
                    <form onSubmit={handleSubmit}>
                      <VStack gap={4}>
                        <Field.Root required>
                          <Field.Label>Product Name</Field.Label>
                          <Input placeholder="Enter name the new product" />
                        </Field.Root>

                        <Field.Root required>
                          <Field.Label>Product Description</Field.Label>
                          <Input placeholder="Enter description the new product" />
                        </Field.Root>

                        <HStack w={"full"}>
                          <Flex
                            gap={8}
                            w={"full"}
                            justifyContent="space-between"
                          >
                            <Field.Root required>
                              <Field.Label>Price</Field.Label>
                              <InputGroup startElement="$" endElement="USD">
                                <Input placeholder="0.00" />
                              </InputGroup>
                            </Field.Root>
                            <Field.Root required>
                              <Field.Label>Stock</Field.Label>
                              <InputGroup>
                                <Input placeholder="1" />
                              </InputGroup>
                            </Field.Root>
                          </Flex>
                        </HStack>
                        <Select.Root
                          collection={categories}
                          w="full"
                          value={value}
                          onValueChange={(e) => setValue(e.value)}
                        >
                          <Select.HiddenSelect />
                          <Select.Label>Select category</Select.Label>
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select category" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {categories.items.map((category) => (
                                  <Select.Item
                                    item={category}
                                    key={category.value}
                                  >
                                    {category.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>

                        
                        <Dialog.Footer w="full">
                          <Flex
                            w="full"
                            justifyContent="space-between"
                            align="center"
                          >
                            <Dialog.ActionTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>

                            <Flex gap={2}>
                              <Button colorScheme="teal">Save Product</Button>
                              <Button variant="outline">
                                Save & Add New Product
                              </Button>
                            </Flex>
                          </Flex>
                        </Dialog.Footer>
                      </VStack>
                    </form>
                  </Box>
                </Dialog.Body>

                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
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
                      changes.checked ? data.map((item) => item.id) : [],
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
                <Button variant="outline" size="sm" color={"red.500"}>
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
const categories = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
