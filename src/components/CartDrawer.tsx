import {
  Button,
  ButtonGroup,
  CloseButton,
  Drawer,
  Flex,
  IconButton,
  Portal,
  Table,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "@/features/globalSlice";
import type { RootState } from "@/app/store";
import { clearAllProducts, decreaseQuantity, increaseQuantity, removeFromCart, selectCart } from "@/features/cartSlice";
import { Image } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import EmptyCart from "./EmptyCart";



const CartDrawer = () => {
  const isCartOpen = useSelector((state: RootState) => state.global.isCartOpen);
  const { cartProducts } = useSelector(selectCart);
  const items = cartProducts;
  
  const dispatch = useDispatch();
  return (
    <Drawer.Root
      size="md"
      open={isCartOpen}
      onOpenChange={(e) => {
        if (!e.open) dispatch(closeCart());
      }}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.CloseTrigger asChild pos="initial">
                <CloseButton />
              </Drawer.CloseTrigger>
              <Drawer.Title flex="1">My Orders</Drawer.Title>
              <ButtonGroup>
                <Button
                  color={"red.500"}
                  onClick={() => {
                    dispatch(clearAllProducts());
                  }}
                  variant="outline"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => {
                    dispatch(closeCart());
                  }}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Drawer.Header>
            {items.length < 1 ? (
              <EmptyCart />
            ) : (
              <Drawer.Body>
                <Table.Root size="sm" striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader textAlign="start">
                        Product
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Image
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Quantity
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Price
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Delete
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {items.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          <Image
                            htmlWidth="80px"
                            htmlHeight="80px"
                            src={item.image}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Table.Cell>
                            <Flex
                              gap={"10px"}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Button
                                size={"sm"}
                                onClick={() =>
                                  dispatch(increaseQuantity(item.id))
                                }
                              >
                                +
                              </Button>
                              {item.quantity}
                              <Button
                                size={"sm"}
                                onClick={() =>
                                  dispatch(decreaseQuantity(item.id))
                                }
                              >
                                -
                              </Button>
                            </Flex>
                          </Table.Cell>
                        </Table.Cell>
                        <Table.Cell textAlign="end">{item.price}</Table.Cell>
                        <Table.Cell textAlign="center">
                          <IconButton
                            aria-label="Delete item"
                            color="red.500"
                            _hover={{ bg: "red.100" }}
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <FaTrash />
                          </IconButton>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Drawer.Body>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
export default CartDrawer;
