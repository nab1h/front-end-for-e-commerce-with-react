"use client";
import {
    createListCollection,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeltonSelected from "./SkeltonSelected";
import type { ICategoriesResponse } from "@/interfaces/interfaces";
import {selectedEdit } from "@/features/globalSlice";
import type { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";


const SelectedEdit = () => {
  // ==================================
  const selected = useSelector(
    (state: RootState) => state.global.whyIsSelectedEdit,
  );
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const getCategoryList = async () => {
    const { data } = await axios.get<ICategoriesResponse>(
      `${API_URL}/api/categories`,
    );
    return data.categories;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryList,
  });
  // ==================================
  console.log(data);

  const categoriesCollection = createListCollection({
    items:
      data?.map((category) => ({
        label: category.name,
        value: String(category.id),
      })) || [],
  });
  // ==================================

  if (isLoading) return <SkeltonSelected />;
  if (error) return <SkeltonSelected />;
  return (
    <Stack gap="5" width="320px">
      <Select.Root
        collection={categoriesCollection}
        value={[selected]}
        onValueChange={(details) => {
          const value = details.value[0];
          dispatch(selectedEdit(value));
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>Select Category</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select Category" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoriesCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Stack>
  );
};
export default SelectedEdit;

