//  // Backgrounds
//     drawerBg: c("white", "purple.800"),
//     drawerBorder: c("gray.200", "purple.700"),
//     pageBg: c("gray.50", "purple.900"),
//     // Text
//     textPrimary: c("gray.800", "white"),
//     textSecondary: c("gray.500", "gray.400"),
//     textMuted: c("gray.400", "gray.500"),
//     priceColor: c("gray.900", "white"),

//     // Brand / Actions
//     accent: c("purple.600", "yellow.400"),
//     primaryBg: c("purple.600", "yellow.400"),
//     primaryText: c("white", "gray.900"),

//     // Danger
//     danger: c("red.500", "red.400"),
//     dangerHoverBg: c("red.50", "red.900"),

//     // Table
//     tableHeaderBg: c("purple.50", "purple.900"),
//     tableRowHover: c("gray.50", "purple.700"),

//     // border
//     border: c("gray.200", "purple.700"),

/* eslint-disable react-hooks/rules-of-hooks */
import { useColorModeValue } from "@/components/ui/color-mode";

export const useThemeColors = () => {
  const c = (light: string, dark: string) => useColorModeValue(light, dark);

  return {
    primaryColor: c("#8E473B", "#D2691E"),

    drawerBg: c("#FFF8F0", "#291C0E"),
    drawerBorder: c("#DEB887", "#8E473B"),
    pageBg: c("#F5F0EB", "#1a1205"),
    hoverBg: c("#E1D4C2", "#3D2817"),

    textPrimary: c("#4A2C2A", "#F5DEB3"),
    textSecondary: c("#6B4423", "#D4A574"),
    textMuted: c("#8B7355", "#A78D78"),
    priceColor: c("#291C0E", "#FFD700"),

    accent: c("#8E473B", "#CD853F"),
    primaryBg: c("#8E473B", "#D2691E"),
    primaryText: c("white", "#1a1205"),

    danger: c("#C62828", "#EF5350"),
    dangerHoverBg: c("#FFEBEE", "#B71C1C"),

    tableHeaderBg: c("#F5E6D3", "#3D2817"),
    tableRowHover: c("#E1D4C2", "#4A2C2A"),

    border: c("#DEB887", "#8E473B"),

    // image
    pageBgImage: c("/images/light-bg.jpg", "/images/dark-bg.jpg"),
  };
};
