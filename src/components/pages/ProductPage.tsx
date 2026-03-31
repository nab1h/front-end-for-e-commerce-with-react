
import { Container, Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
const ProductCard = () => {
    const API_URL = import.meta.env.VITE_SERVER_URL;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const productId = Number(id);
     const getProductById = async (productId: number) => {
       const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
       return data;
     };

     const { isLoading, data } = useQuery({
       queryKey: ["products", productId],
       queryFn: () => getProductById(productId),
     });
     console.log(data);
    const goBack = () => navigate(-1);
     if (isLoading)
       return (
         <div>
           <HStack gap="5">
             <SkeletonCircle size="12" />
             <Stack flex="1">
               <Skeleton height="5" />
               <Skeleton height="5" width="80%" />
             </Stack>
           </HStack>
         </div>
       );
    return (
      <>
        <Container centerContent={true} height={"full"}>
          <Flex gap="4" direction="column">
            <Button
              colorPalette="teal"
              variant="outline"
              maxW="80px"
              onClick={goBack}
            >
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
                alt={data.products.name}
              />
              <Box maxH="xxl">
                <Card.Body>
                  <Card.Title mb="2">{data.products.name}</Card.Title>
                  <Card.Description>{data.products.description}</Card.Description>
                  <HStack mt="4">
                    <Badge>Hot</Badge>
                    <Badge>Caffeine</Badge>
                  </HStack>
                </Card.Body>
                <Card.Footer>
                  <Button>Buy Now</Button>
                </Card.Footer>
              </Box>
            </Card.Root>
          </Flex>
        </Container>
      </>
    );
};
export default ProductCard;
