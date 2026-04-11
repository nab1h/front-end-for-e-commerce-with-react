import type { RootState } from "@/app/store";
import {
  clearEditImages,
  closeEditProduct,
  selectedEdit,
  setEditImages,
} from "@/features/globalSlice";
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
import { useEffect, useState } from "react";
import type {
  IEditImage,
  InputValueEdit,
  IProductImage,
} from "@/interfaces/interfaces";
import SelectedEdit from "./SelectedEdit";
import UploadPhotoEdit from "./UploadPhotoEdit";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { errorToast, loadingToast, successToast } from "./ToastProductDashboard";
const API_URL = import.meta.env.VITE_SERVER_URL;
const DialogEditProduct = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<InputValueEdit>({
    id: 0,
    name: "",
    description: "",
    price: "",
    stock: 1,
    category: {
      id: 0,
      name: "",
    },
    images: [],
  });
  const isOpen = useSelector(
    (state: RootState) => state.global.isEditProductOpen,
  );
  const product = useSelector(
    (state: RootState) => state.global.currentProduct,
  );
  console.log(product);
  useEffect(() => {
    if (isOpen && product && product.images) {
      const images: IEditImage[] = (product.images as IProductImage[]).map(
        (img) => ({
          id: img.id,
          url: `${API_URL}/storage/${img.image_path}`,
          image_path: img.image_path,
          isNew: false,
        }),
      );

      dispatch(setEditImages(images));
      dispatch(selectedEdit(String(product.category.id)));

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputValue({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: {
          id: product.category.id,
          name: product.category.name,
        },
        images: product.images,
      });
    }
  }, [dispatch, isOpen, product]);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const category = useSelector(
    (state: RootState) => state.global.whyIsSelectedEdit,
  );
  const editImages = useSelector((state: RootState) => state.global.editImages);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/products/${product?.id}?_method=PUT`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        },
      );

      return res.data;
    },
    onMutate: () => {
      loadingToast();
    },
    onSuccess: () => {
      console.log('doneeeeeeeeeeeeeeeeeeeeeee')
      successToast();
      dispatch(clearEditImages());
      dispatch(closeEditProduct());
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

    const existingImages = editImages
      .filter((img) => !img.isNew)
      .map((img) => img.id);

    formData.append("existing_images", JSON.stringify(existingImages));

    const newImages = editImages.filter((img) => img.isNew && img.file);

    newImages.forEach((img) => {
      if (img.file) {
        formData.append("new_images[]", img.file);
      }
    });
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    mutation.mutate(formData);
  };

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
                        <SelectedEdit />
                      </HStack>

                      <Field.Root>
                        <Field.Label>Product Images</Field.Label>
                      </Field.Root>

                      <UploadPhotoEdit />
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
