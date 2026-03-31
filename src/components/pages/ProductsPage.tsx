import { Grid } from "@chakra-ui/react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonProducts from "../SkeletonProducts";
import type { IProduct, IProductsResponse } from "@/interfaces/interfaces";
const ProductsPage = () => {
    
  const API_URL = import.meta.env.VITE_SERVER_URL;
  

    const getProductsList = async () : Promise<IProduct[]>=> {
        const { data } = await axios.get<IProductsResponse>(
          `${import.meta.env.VITE_SERVER_URL}/api/products`,
        );
        return data.products;
  }
  


    const { isLoading, data } = useQuery({
      queryKey: ["products"],
      queryFn: getProductsList,
    });

    console.log(data);
    if (isLoading)
      return (
        <div>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
            {Array.from({ length: 8 }, (_, idx) => (
              <SkeletonProducts key={idx} />
            ))}
          </Grid>
        </div>
      );
    return (
      <>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6" mx={"auto"} >
          {data?.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                img={
                  product.images?.[0]
                    ? `${API_URL}/storage/${product.images[0].image_path}`
                    : "https://via.placeholder.com/300"
                }
                desc={product.description}
                price={product.price}
              />
          ))}
        </Grid>
      </>
    );}
export default ProductsPage; 