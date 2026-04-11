"use client";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Image,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LuX, LuPlus } from "react-icons/lu";
import {
  addEditImage,
  removeEditImage,
} from "@/features/globalSlice";
import type { RootState } from "@/app/store";
import type { IEditImage } from "@/interfaces/interfaces";

const EditImagesList = () => {
  const dispatch = useDispatch();
  const editImages = useSelector((state: RootState) => state.global.editImages);

  if (editImages.length === 0) {
    return (
      <Text color="gray.500" fontSize="sm" mt={2}>
        Empty Images
      </Text>
    );
  }

  return (
    <Flex gap={4} mt={4} flexWrap="wrap">
      {editImages.map((img) => (
        <Flex
          key={img.id}
          direction="column"
          align="center"
          position="relative"
          borderWidth={1}
          borderRadius="md"
          overflow="hidden"
          w="120px"
        >
          <Image
            src={img.url}
            alt={img.image_path || "New Image"}
            w="120px"
            h="120px"
            objectFit="cover"
          />

          <Text
            fontSize="xs"
            bg={img.isNew ? "blue.100" : "green.100"}
            color={img.isNew ? "blue.700" : "green.700"}
            px={2}
            py={0.5}
            w="full"
            textAlign="center"
          >
            {img.isNew ? "New image" : "image"}
          </Text>
          <IconButton
            aria-label="Delete Image"
            size="xs"
            colorScheme="red"
            variant="solid"
            position="absolute"
            top={1}
            right={1}
            onClick={() => dispatch(removeEditImage(img.id))}
          >
            <LuX />
          </IconButton>
        </Flex>
      ))}
    </Flex>
  );
};

const UploadPhotoEdit = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    Array.from(selectedFiles).forEach((file) => {
      const newImage: IEditImage = {
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        image_path: "",
        isNew: true,
        file: file,
      };
      dispatch(addEditImage(newImage));
    });
    e.target.value = "";
  };

  return (
    <Flex direction="column" gap={4}>
      <Button
        variant="outline"
        size="sm"
        w="fit-content"
        onClick={() => inputRef.current?.click()}
      >
        <LuPlus />
        Add New Image
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <EditImagesList />
    </Flex>
  );
};

export default UploadPhotoEdit;
