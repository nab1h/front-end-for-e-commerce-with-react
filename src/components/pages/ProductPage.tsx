import { Container, Flex } from "@chakra-ui/react";
import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
const ProductCard = () => {
    return (
      <>
        <Container centerContent={true} height={"full"}>
          <Flex gap="4" direction="column">
            <Button colorPalette="teal" variant="outline" maxW="80px">
              <RiArrowLeftLine />
              Back
            </Button>

            <Card.Root
              flexDirection={{ base: "column", md: "row" }}
              overflow="hidden"
              minH="400px"
            >
              <Image
                objectFit="cover"
                w={{ base: "full", md: "50%" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Box maxH="xxl">
                <Card.Body>
                  <Card.Title mb="2">The perfect latte</Card.Title>
                  <Card.Description>
                    Caffè latte is a coffee beverage of Italian origin made with
                    espresso and steamed milk.
                  </Card.Description>
                  <HStack mt="4">
                    <Badge>Hot</Badge>
                    <Badge>Caffeine</Badge>
                  </HStack>
                </Card.Body>
                <Card.Footer>
                  <Button>Buy Latte</Button>
                </Card.Footer>
              </Box>
            </Card.Root>
          </Flex>
        </Container>
      </>
    );
};
export default ProductCard;
