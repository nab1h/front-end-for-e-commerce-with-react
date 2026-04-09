import { Button, Flex } from "@chakra-ui/react";
import ProductsTable from "./ProductsTable";
import PageHeader from "./ui/PageHeader";
import { FiPlus } from "react-icons/fi";
import DialogAddProduct from "./DialogAddProduct";
import { useDispatch } from "react-redux";
import { openAddProduct } from "@/features/globalSlice";
import DialogEditProduct from "./DialogEditProduct";



// ------START STATES-------------------

// ------END STATES---------------------

const Products = () => {
    const dispatch = useDispatch();



  return (
    <>
      <PageHeader title={"MY PRODUCTS"} />
      <Flex justify="space-between" mb={4}>
        <Button
          colorPalette="teal.500"
          onClick={() => dispatch(openAddProduct())}
        >
          <FiPlus />
          Add Product
        </Button>
      </Flex>
      <ProductsTable />
      <DialogAddProduct />
      <DialogEditProduct />
    </>
  );
};
export default Products;


