import {
  Stack,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useThemeColors } from "@/hooks/useThemeColors";
const SkeletonProducts = () => {
 
  const colors = useThemeColors();

     return(
     <Stack gap="6">
       <Skeleton
         height="200px"
         rounded="xl"
         css={{
           background: colors.primaryBg,
           backgroundSize: "200% 100%",
           animation: "shimmer 1.5s infinite",
         }}
       />

       <HStack>
         <SkeletonText
           noOfLines={2}
           css={{
             "& > div": {
               background: colors.primaryBg,
               backgroundSize: "200% 100%",
               animation: "shimmer 1.5s infinite",
             },
           }}
         />
       </HStack>
     </Stack>
      );
}
export default SkeletonProducts;