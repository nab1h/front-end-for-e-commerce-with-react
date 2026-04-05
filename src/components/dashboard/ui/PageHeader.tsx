// components/dashboard/PageHeader.tsx
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Heading } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  return (
    <Box mb={6} pb={4} borderBottom="1px solid" borderColor={borderColor}>
      <Heading size="lg" color={textColor} fontFamily="heading">
        {title}
      </Heading>
    </Box>
  );
};

export default PageHeader;
