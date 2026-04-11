import type { RootState } from "@/app/store";
import { closeAddProduct } from "@/features/globalSlice";
import { useMutation } from "@tanstack/react-query";
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
import UploadPhotoAdd, { type IUploadedFile } from "./UploadPhotoAdd";
import { useState } from "react";
import axios from "axios";
import { errorToast, loadingToast, successToast } from "./ToastProductDashboard";
// import { showToast, updateToastError, updateToastSuccess } from "./ToastProductDashboard";

export interface InputValue {
  name: string;
  description: string;
  price: string;
  stock: number;
}
const DialogAddProduct = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.global.isAddProductOpen,
  );

  const [inputValue, setInputValue] = useState<InputValue>({
    name: "",
    description: "",
    price: "",
    stock: 1,
  });
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const category = useSelector(
    (state: RootState) => state.global.whyIsSelected
  );

  const images = useSelector((state: RootState) => state.global.files);


  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_URL}/api/products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      return res.data;
    },
    onMutate: () => {
      loadingToast();
    },

    onSuccess: () => {
      console.log("done ✅");
      successToast();
      // dispatch(closeAddProduct());
      setInputValue({
        name: "",
        description: "",
        price: "",
        stock: 1,
      });
    },

    onError: () => {
      errorToast();
    },
  });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    const formData = new FormData(); 
    formData.append("name", inputValue.name);
    formData.append("description", inputValue.description);
    formData.append("price", inputValue.price);
    formData.append("stock", String(inputValue.stock));
    formData.append("category", category);
    images.forEach((img: IUploadedFile) => {
      formData.append("images[]", img.file);
    });
      mutation.mutate(formData);
      dispatch(closeAddProduct());
  };
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
