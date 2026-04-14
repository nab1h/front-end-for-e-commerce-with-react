import {
  Button,
  ButtonGroup,
  CloseButton,
  Drawer,
  Flex,
  IconButton,
  Portal,
  Table,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "@/features/globalSlice";
import type { RootState } from "@/app/store";
import {
  clearAllProducts,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCart,
} from "@/features/cartSlice";
import { Image } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import EmptyCart from "./EmptyCart";
import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

const CartDrawer = () => {
  const [imgError, setImgError] = useState(false);
  const isCartOpen = useSelector((state: RootState) => state.global.isCartOpen);
  const { cartProducts } = useSelector(selectCart);
  const items = cartProducts;
  const colors = useThemeColors();
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
          <Drawer.Content
            bg={colors.drawerBg}
            borderLeft={{ base: "none", md: "2px solid" }}
            borderColor={colors.border}
          >
            {/* ====== Header ====== */}
            <Drawer.Header
              borderBottom="1px solid"
              borderColor={colors.border}
              py={5}
            >
              <Drawer.CloseTrigger asChild pos="initial">
                <CloseButton
                  color={colors.textPrimary}
                  _hover={{ color: colors.accent }}
                  rounded="full"
                />
              </Drawer.CloseTrigger>

              <Drawer.Title
                flex="1"
                fontSize="xl"
                fontWeight="bold"
                color={colors.textPrimary}
              >
                My Orders
              </Drawer.Title>

              <ButtonGroup gap={3}>
                <Button
                  color={colors.danger}
                  borderColor={colors.danger}
                  onClick={() => dispatch(clearAllProducts())}
                  variant="outline"
                  size="sm"
                  rounded="lg"
                  _hover={{ bg: colors.dangerHoverBg }}
                >
                  Clear All
                </Button>

                <Button
                  bg={colors.primaryBg}
                  color={colors.primaryText}
                  _hover={{ opacity: 0.9 }}
                  onClick={() => dispatch(closeCart())}
                  size="sm"
                  rounded="lg"
                  fontWeight="bold"
                >
                  Save
                </Button>
              </ButtonGroup>
            </Drawer.Header>

            {items.length < 1 ? (
              <EmptyCart />
            ) : (
              <Drawer.Body p={4}>
                <Table.Root
                  size="sm"
                  striped
                  css={{
                    "& th": {
                      bg: colors.tableHeaderBg,
                      color: colors.textPrimary,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "xs",
                    },
                    "& tr:hover td": {
                      bg: colors.tableRowHover,
                    },
                  }}
                >
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

                  <Table.Body bg={colors.pageBg}>
                    {items.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>
                          <Box
                            as="p"
                            fontWeight="medium"
                            color={colors.textPrimary}
                            maxW="150px"
                            css={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.name}
                          </Box>
                        </Table.Cell>

                        <Table.Cell>
                          <Box
                            w="60px"
                            h="60px"
                            rounded="lg"
                            overflow="hidden"
                            border="1px solid"
                            borderColor={colors.border}
                            bg={colors.pageBg}
                          >
                            {imgError ? (
                              <Box
                                w="60px"
                                h="60px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Box
                                  as="span"
                                  fontSize="xs"
                                  color={colors.textMuted}
                                >
                                  IMG
                                </Box>
                              </Box>
                            ) : (
                              <Image
                                htmlWidth="60px"
                                htmlHeight="60px"
                                src={item.image}
                                onError={() => setImgError(true)}
                              />
                            )}
                          </Box>
                        </Table.Cell>

                        <Table.Cell textAlign="center">
                          <Flex
                            gap="8px"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Button
                              size="sm"
                              minW="28px"
                              h="28px"
                              p={0}
                              rounded="md"
                              bg={colors.accent}
                              color={colors.primaryText}
                              _hover={{ opacity: 0.9 }}
                              onClick={() =>
                                dispatch(increaseQuantity(item.id))
                              }
                              fontWeight="bold"
                            >
                              +
                            </Button>

                            <Box
                              as="span"
                              fontWeight="bold"
                              color={colors.textPrimary}
                            >
                              {item.quantity}
                            </Box>

                            <Button
                              size="sm"
                              minW="28px"
                              h="28px"
                              p={0}
                              rounded="md"
                              variant="outline"
                              borderColor={colors.accent}
                              color={colors.accent}
                              _hover={{ bg: colors.hoverBg }}
                              onClick={() =>
                                dispatch(decreaseQuantity(item.id))
                              }
                              fontWeight="bold"
                            >
                              −
                            </Button>
                          </Flex>
                        </Table.Cell>

                        <Table.Cell textAlign="end">
                          <Box
                            as="span"
                            fontWeight="bold"
                            color={colors.accent}
                            fontSize="md"
                          >
                            ${item.price}
                          </Box>
                        </Table.Cell>

                        <Table.Cell textAlign="center">
                          <IconButton
                            aria-label="Delete item"
                            variant="ghost"
                            size="sm"
                            rounded="full"
                            color={colors.danger}
                            _hover={{ bg: colors.dangerHoverBg }}
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <FaTrash />
                          </IconButton>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>

                {/* ====== Total Section ====== */}
                <Box
                  mt={6}
                  pt={4}
                  borderTop="2px solid"
                  borderColor={colors.border}
                >
                  <Flex justify="space-between" align="center">
                    <VStack align="start" gap={1}>
                      <Box as="p" color={colors.textSecondary} fontSize="sm">
                        Total Items (
                        {items.reduce(
                          (total, item) => total + item.quantity,
                          0,
                        )}
                        )
                      </Box>

                      <Box
                        as="p"
                        fontSize="2xl"
                        fontWeight="black"
                        color={colors.textPrimary}
                      >
                        $
                        {(() => {
                          const total = items.reduce((acc: number, item) => {
                            const price =
                              typeof item.price === "string"
                                ? parseFloat(item.price)
                                : item.price;
                            return acc + price * item.quantity;
                          }, 0);
                          return total.toFixed(2);
                        })()}
                      </Box>
                    </VStack>

                    <Button
                      bg={colors.primaryBg}
                      color={colors.primaryText}
                      _hover={{ opacity: 0.9 }}
                      size="lg"
                      fontWeight="bold"
                      px={10}
                      rounded="xl"
                    >
                      Checkout
                    </Button>
                  </Flex>
                </Box>
              </Drawer.Body>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;
