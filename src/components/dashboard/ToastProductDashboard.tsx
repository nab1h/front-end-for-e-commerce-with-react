// ToastDashboard.tsx
import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end",
  max: 5,
});

// Success Toast
export const successToast = () => {
  toaster.create({
    title: "Success",
    description: "Operation completed successfully!",
    type: "success",
    duration: 3000,
    meta: { closable: true },
  });
};

// Error Toast
export const errorToast = () => {
  toaster.create({
    title: "Error",
    description: "Something went wrong, please try again.",
    type: "error",
    duration: 5000,
    meta: { closable: true },
  });
};


export const loadingToast = (): string | number => {
  return toaster.create({
    title: "Processing...",
    type: "loading",
    duration: 3000,
    meta: { closable: false },
  });
};
