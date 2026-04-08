import type { RootState } from "@/app/store";
import { closeAddProduct } from "@/features/globalSlice";
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

const DialogAddProduct = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.global.isAddProductOpen,
  );
  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(details) => {
          if (!details.open) dispatch(closeAddProduct());
        }}
        lazyMount
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Box maxW="500px" mx="auto" mt={5}>
                  <form>
                    <VStack gap={4}>
                      <Field.Root required>
                        <Field.Label>Product Name</Field.Label>
                        <Input placeholder="Enter name" />
                      </Field.Root>
                      <Field.Root required>
                        <Field.Label>Description</Field.Label>
                        <Input placeholder="Enter description" />
                      </Field.Root>
                      <HStack w={"full"}>
                        <Flex gap={8} w={"full"} justifyContent="space-between">
                          <Field.Root required>
                            <Field.Label>Price</Field.Label>
                            <InputGroup startElement="$">
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
                      <SelectedAdd />

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
                          <Button colorScheme="teal">Save</Button>
                        </Flex>
                      </Dialog.Footer>
                    </VStack>
                  </form>
                </Box>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  onClick={() => dispatch(closeAddProduct())}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
export default DialogAddProduct;
