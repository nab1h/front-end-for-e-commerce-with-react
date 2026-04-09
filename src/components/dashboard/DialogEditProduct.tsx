import type { RootState } from "@/app/store";
import { closeEditProduct } from "@/features/globalSlice";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  HStack,
  Input,
  InputGroup,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import SelectedAdd from "./SelectedAdd";
import UploadPhotoAdd from "./UploadPhotoAdd";
import { useEffect, useState } from "react";
import type { InputValue } from "./DialogAddProduct";

const DialogEditProduct = () => {
    const dispatch = useDispatch();
      const [inputValue, setInputValue] = useState<InputValue>({
        name: "",
        description: "",
        price: "",
        stock: 0,
      });
  const isOpen = useSelector(
    (state: RootState) => state.global.isEditProductOpen,
  );
  const product = useSelector(
    (state: RootState) => state.global.currentProduct,
    );
 useEffect(() => {
   if (isOpen && product) {
     // eslint-disable-next-line react-hooks/set-state-in-effect
     setInputValue({
       name: product.name,
       description: product.description,
       price: product.price,
       stock: product.stock,
     });
   }
 }, [isOpen, product]);




  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
    };
    

  const handleSubmit = () => {};



  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(details) => {
          if (!details.open) dispatch(closeEditProduct());
        }}
        lazyMount
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Box maxW="500px" mx="auto" mt={5}>
                  <form onSubmit={handleSubmit}>
                    <VStack gap={4}>
                      <Field.Root required>
                        <Field.Label>Product Name</Field.Label>
                        <Input
                          placeholder="Enter name"
                          name="name"
                          value={inputValue.name}
                          onChange={handelChange}
                        />
                      </Field.Root>
                      <Field.Root required>
                        <Field.Label>Description</Field.Label>
                        <Input
                          placeholder="Enter description"
                          name="description"
                          value={inputValue.description}
                          onChange={handelChange}
                        />
                      </Field.Root>
                      <HStack w={"full"}>
                        <Flex gap={8} w={"full"} justifyContent="space-between">
                          <Field.Root required>
                            <Field.Label>Price</Field.Label>
                            <InputGroup startElement="$">
                              <Input
                                type="number"
                                placeholder="0.00"
                                name="price"
                                value={inputValue.price}
                                onChange={handelChange}
                              />
                            </InputGroup>
                          </Field.Root>
                          <Field.Root required>
                            <Field.Label>Stock</Field.Label>
                            <InputGroup>
                              <Input
                                type="number"
                                placeholder="1"
                                name="stock"
                                value={inputValue.stock}
                                onChange={handelChange}
                              />
                            </InputGroup>
                          </Field.Root>
                        </Flex>
                        <SelectedAdd />
                      </HStack>

                      <Field.Root>
                        <Field.Label>Product Images</Field.Label>
                      </Field.Root>

                      <UploadPhotoAdd />
                      <Dialog.Footer w="full">
                        <Flex
                          w="full"
                          justifyContent="space-between"
                          align="center"
                        >
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.ActionTrigger>
                          <Button type="submit" colorScheme="teal">
                            Save
                          </Button>
                        </Flex>
                      </Dialog.Footer>
                    </VStack>
                  </form>
                </Box>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  onClick={() => dispatch(closeEditProduct())}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
export default DialogEditProduct;
