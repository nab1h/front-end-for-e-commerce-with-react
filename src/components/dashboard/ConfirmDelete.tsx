import type { RootState } from "@/app/store";
import { closeDialogDelete } from "@/features/globalSlice";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const ConfirmDelete = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const nameProduct = useSelector(
    (state: RootState) => state.global.productNameDelete,
  );

  const isOpen = useSelector(
    (state: RootState) => state.global.isOpenDialogDelete,
  );

  const idProduct = useSelector((state: RootState) => state.global.idDialogDelete);


  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        `${API_URL}/api/products/${id}?_method=DELETE`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;

    },
    onMutate: () => {},
    onSuccess: () => {
      dispatch(closeDialogDelete());
    },
    onError: () => {},
  });
  const handleDelete = () => {
   


    if (!idProduct) return;
    mutation.mutate(idProduct);
  }

  return (
    <Dialog.Root
      role="alertdialog"
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) dispatch(closeDialogDelete());
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                {`are you sure to delete ${nameProduct}`}
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red"
              onClick={handleDelete}
              >Delete</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default ConfirmDelete;