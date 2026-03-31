import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import type { ElementType, FC } from "react";

interface IProps{
  id: number;
  img: string;
  name: string;
  desc: string;
  price: string;
  as?: ElementType;
  to?: string;
}
const ProductCard: FC<IProps> = ({ img, name, desc, price ,as = Box ,to }) => {
  const Component = as;
  return (
    <Card.Root overflow="hidden" w='full' as={Component} {...to? {to} : {}}>
      <Image
        src={img}
        alt={name}
      />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          {desc}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
