import { Badge, IconButton, Table, Image, Alert } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductTableSkeleton from "./skelaton/ProductTableSkeleton";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type {
  InputValueEdit,
  IProductsResponse,
} from "@/interfaces/interfaces";
import { openEditProduct, setCurrentProduct } from "@/features/globalSlice";
import { useDispatch } from "react-redux";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const getProductsList = async () => {
    const { data } = await axios.get<IProductsResponse>(
      `${API_URL}/api/products`,
    );
    return data.products;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsList,
  });

  if (isLoading) return <ProductTableSkeleton />;
  if (error instanceof Error) {
    return (
      <Alert.Root variant="subtle" colorPalette="red" borderRadius="md">
        <Alert.Indicator />
        <Alert.Title>Server Error</Alert.Title>
        <Alert.Description>{error.message}</Alert.Description>
      </Alert.Root>
    );
  }

  const handleEdit = (item: InputValueEdit) => {
    dispatch(openEditProduct());
    dispatch(setCurrentProduct(item));
  };

  return (
    <Table.Root size="sm" variant="outline">
      <Table.ColumnGroup>
        <Table.Column />
        <Table.Column />
        <Table.Column />
      </Table.ColumnGroup>
      <Table.Header>
        <Table.Row>
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
        {data?.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>
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
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell>
              <Badge colorPalette={item.stock > 10 ? "green" : "red"}>
                {item.stock}
              </Badge>
            </Table.Cell>
            <Table.Cell>{item.category.name}</Table.Cell>
            <Table.Cell>${item.price}</Table.Cell>
            <Table.Cell>
              <IconButton
                aria-label="Edit"
                size="sm"
                variant="ghost"
                onClick={() => handleEdit(item)}
              >
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
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default ProductsTable;
