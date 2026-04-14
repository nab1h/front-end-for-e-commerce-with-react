/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import type { ElementType, FC } from "react";
// import { useColorModeValue } from "./ui/color-mode";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useColorModeValue } from "./ui/color-mode";


const c = (light: string, dark: string) => 
  useColorModeValue(light , dark) as string;

interface IProps {
  id: number;
  img: string;
  name: string;
  desc: string;
  price: string;
  as?: ElementType;
  to?: string;
  onClick?: () => void;
}

const ProductCard: FC<IProps> = ({id,img, name, desc, price, as = Box, to, onClick }) => {
  const Component = as;
const colors = useThemeColors();
  const cardShadow = c('md', 'xl');
  

  // -----handler add to cart-----------
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const item = {
      id: id,
      name: name,
      price: Number(price),
      image: img,
      quantity: 1,
    };
    dispatch(addToCart(item));
  };

  return (
    <Card.Root
      overflow="hidden"
      w="full"
      h="100%"
      display="flex"
      flexDirection="column"
      bg={colors.drawerBg}
      border="1px solid"
      borderColor={colors.border}
      shadow={cardShadow}
      _hover={{
        shadow: "2xl",
        transform: "translateY(-4px)",
        transition: "all 0.3s ease",
      }}
      transition="all 0.3s ease"
      rounded="2xl"
      as={Component}
      {...(to ? { to } : {})}
    >
      <Box
        position="relative"
        overflow="hidden"
        bg={colors.drawerBg}
      >
        <Image src={img} alt={name} h="200px" objectFit="cover" w="full"/>

        <Card.Body gap="3" flex="1" p={5}>
          <Text
            fontWeight="bold"
            fontSize="md"
            color={colors.textPrimary}
            css={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Text>

          <Card.Description>
            <Text
              color={colors.textSecondary}
              fontSize="sm"
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {desc}
            </Text>
          </Card.Description>

          <Text
            textStyle="2xl"
            fontWeight="bold"
            letterSpacing="tight"
            mt="3"
            color={colors.textPrimary}
          >
            ${price}
          </Text>
        </Card.Body>

        <Card.Footer gap="3" p={5} pt={0}>
          <Button
            variant="solid"
            bg={colors.primaryBg}
            color={colors.textPrimary}
            _hover={{ opacity: 0.4 }}
            _active={{ transform: "scale(0.98)" }}
            fontWeight="bold"
            rounded="xl"
            size="md"
            onClick={onClick}
          >
            Product Details
          </Button>

          <Button
            variant="outline"
            borderColor={colors.accent}
            color={colors.accent}
            _hover={{
              bg: colors.hoverBg,
              borderColor: colors.accent,
            }}
            fontWeight="semibold"
            rounded="xl"
            size="md"
            onClick={addToCartHandler}
          >
            Add to cart
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default ProductCard;