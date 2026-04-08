"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FileUpload, Flex, Float, useFileUploadContext } from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";
import { addFiles, clearFiles } from "@/features/globalSlice";
import type { RootState } from "@/app/store";

export interface IUploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const dispatch = useDispatch();
  const files = fileUpload.acceptedFiles;

  useEffect(() => {
    if (files.length === 0) return;

    const sanitizedFiles: IUploadedFile[] = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    dispatch(addFiles(sanitizedFiles));
  }, [files, dispatch]);

  if (files.length === 0) return null;

  return (
    <FileUpload.ItemGroup>
      <Flex gap={5}>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="20"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger
                boxSize="4"
                layerStyle="fill.solid"
                onClick={() => dispatch(clearFiles())}
              >
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </Flex>
    </FileUpload.ItemGroup>
  );
};


const UploadPhotoAdd = () => {
    const files = useSelector(
        (state: RootState) => state.global.files,
    );
    console.log(files);
  return (
    <FileUpload.Root accept="image/*" maxFiles={10}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <LuFileImage /> Upload Images
        </Button>
      </FileUpload.Trigger>

      <FileUploadList />
    </FileUpload.Root>
  );
};

export default UploadPhotoAdd;
