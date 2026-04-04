import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Link,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaApple,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// Typed hooks
const useAppDispatch = () => useDispatch<AppDispatch>();
import type { RootState, AppDispatch } from "@/app/store";
import {
  setField,
  loginUser,
  clearError,
  registerUser,
  type IFormRegister,
} from "@/features/auth/authSlice";

interface IFormLogin {
  email: string;
  password: string;
}

// Interface for validation errors
interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const [userRegister, setUserRegister] = useState<IFormRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setField({
        name,
        value,
      }),
    );
    if (error) {
      dispatch(clearError());
    }
    setSuccess("");
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
    // Clear validation error when user types
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors({ ...validationErrors, [name]: undefined });
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    // Clear confirm password error
    if (validationErrors.confirmPassword) {
      setValidationErrors({ ...validationErrors, confirmPassword: undefined });
    }
  };

  // -------- Validation Logic -------
  const validateRegisterForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!userRegister.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!userRegister.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!userRegister.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userRegister.email)) {
      errors.email = "Email address is invalid";
    }

    if (!userRegister.password) {
      errors.password = "Password is required";
    } else if (userRegister.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (userRegister.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      errors.terms = "You must agree to the terms";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --------sing in handler------
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      return;
    }

    dispatch(loginUser({ email: user.email, password: user.password }))
      .unwrap()
      .then(() => {
        setSuccess("Login successful!");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  // --------register handler -------
  const submitRegisterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    dispatch(
      registerUser({ ...userRegister, password_confirmation: confirmPassword }),
    )
      .unwrap()
      .then(() => {
        setSuccess("Registration successful!");
        setIsLogin(true);
        // Clear form on success? Optional.
        setUserRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        setAgreeTerms(false);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        
      });
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const grayText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("white", "gray.750");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const iconColor = useColorModeValue("gray.800", "gray.200");
  const errorColor = "red.500";

  const getFocusStyles = (isError: boolean) => ({
    borderColor: isError ? errorColor : "blue.500",
    boxShadow: isError ? `0 0 0 1px ${errorColor}` : "0 0 0 1px blue.500",
  });

  const getHoverStyles = (isError: boolean) => ({
    borderColor: isError ? errorColor : "blue.500",
  });

  return (
    <Box minH="100vh" py={12} px={4}>
      <Flex justify="center" align="center">
        <Box
          w="full"
          maxW="450px"
          bg={bgColor}
          borderRadius="2xl"
          boxShadow="xl"
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
        >
          {/* Header */}
          <Text
            fontSize="3xl"
            fontWeight="700"
            color={textColor}
            textAlign="center"
            mb={2}
            fontFamily="'Poppins', sans-serif"
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </Text>
          <Text
            color={grayText}
            textAlign="center"
            mb={8}
            fontFamily="'Poppins', sans-serif"
          >
            {isLogin ? "Sign in to your account" : "Join us and start shopping"}
          </Text>

          {/* Success/Error Messages */}
          {error && (
            <Box
              bg="red.100"
              color="red.600"
              p={3}
              borderRadius="md"
              mb={6}
              textAlign="center"
              fontFamily="'Poppins', sans-serif"
            >
              {error}
            </Box>
          )}
          {success && (
            <Box
              bg="green.100"
              color="green.600"
              p={3}
              borderRadius="md"
              mb={6}
              textAlign="center"
              fontFamily="'Poppins', sans-serif"
            >
              {success}
            </Box>
          )}

          {/* Toggle Tabs */}
          <HStack
            mb={8}
            bg={useColorModeValue("gray.100", "gray.750")}
            p={1}
            borderRadius="lg"
          >
            <Button
              flex={1}
              bg={isLogin ? "blue.500" : "transparent"}
              color={isLogin ? "white" : textColor}
              borderRadius="md"
              onClick={() => {
                setIsLogin(true);
                dispatch(clearError());
                setSuccess("");
                setValidationErrors({});
              }}
              fontWeight="600"
              _hover={{ bg: isLogin ? "blue.600" : hoverBg }}
              fontFamily="'Poppins', sans-serif"
            >
              Login
            </Button>
            <Button
              flex={1}
              bg={!isLogin ? "blue.500" : "transparent"}
              color={!isLogin ? "white" : textColor}
              borderRadius="md"
              onClick={() => {
                setIsLogin(false);
                dispatch(clearError());
                setSuccess("");
                setValidationErrors({});
              }}
              fontWeight="600"
              _hover={{ bg: !isLogin ? "blue.600" : hoverBg }}
              fontFamily="'Poppins', sans-serif"
            >
              Register
            </Button>
          </HStack>

          {/* Forms */}
          {isLogin ? (
            <LoginForm
              textColor={textColor}
              grayText={grayText}
              borderColor={borderColor}
              inputBg={inputBg}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              user={user}
              handleChange={handleChange}
              submitHandler={submitHandler}
              isLoading={isLoading}
              error={error}
              getFocusStyles={getFocusStyles}
              getHoverStyles={getHoverStyles}
            />
          ) : (
            <RegisterForm
              textColor={textColor}
              grayText={grayText}
              borderColor={borderColor}
              inputBg={inputBg}
              agreeTerms={agreeTerms}
              userRegister={userRegister}
              confirmPassword={confirmPassword}
              setAgreeTerms={setAgreeTerms}
              submitRegisterHandler={submitRegisterHandler}
              handleRegisterChange={handleRegisterChange}
              handleConfirmPasswordChange={handleConfirmPasswordChange}
              isLoading={isLoading}
              validationErrors={validationErrors}
              getFocusStyles={getFocusStyles}
              getHoverStyles={getHoverStyles}
            />
          )}

          {/* Divider */}
          <Flex align="center" my={6}>
            <Box flex={1} borderBottom="1px solid" borderColor={borderColor} />
            <Text
              px={4}
              color={grayText}
              fontSize="sm"
              fontFamily="'Poppins', sans-serif"
            >
              Or continue with
            </Text>
            <Box flex={1} borderBottom="1px solid" borderColor={borderColor} />
          </Flex>

          {/* Social Login */}
          <HStack gap={4} justify="center">
            <IconButton
              aria-label="Google"
              size="lg"
              borderRadius="full"
              borderWidth="1px"
              borderColor={borderColor}
              bg={inputBg}
              color={iconColor}
              _hover={{ bg: hoverBg }}
            >
              <FaGoogle />
            </IconButton>
            <IconButton
              aria-label="Facebook"
              size="lg"
              borderRadius="full"
              borderWidth="1px"
              borderColor={borderColor}
              bg={inputBg}
              color={iconColor}
              _hover={{ bg: hoverBg }}
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              aria-label="Apple"
              size="lg"
              borderRadius="full"
              borderWidth="1px"
              borderColor={borderColor}
              bg={inputBg}
              color={iconColor}
              _hover={{ bg: hoverBg }}
            >
              <FaApple />
            </IconButton>
          </HStack>

          {/* Footer */}
          <Text
            color={grayText}
            textAlign="center"
            mt={6}
            fontSize="sm"
            fontFamily="'Poppins', sans-serif"
          >
            By continuing, you agree to our{" "}
            <Link color="blue.500" href="/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link color="blue.500" href="/privacy">
              Privacy Policy
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const LoginForm = ({
  textColor,
  grayText,
  borderColor,
  inputBg,
  rememberMe,
  setRememberMe,
  user,
  handleChange,
  submitHandler,
  isLoading,
  error,
  getFocusStyles,
  getHoverStyles,
}: {
  textColor: string;
  grayText: string;
  borderColor: string;
  inputBg: string;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  user: IFormLogin;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  error: string | null;
  getFocusStyles: (isError: boolean) => {
    borderColor: string;
    boxShadow: string;
  };
  getHoverStyles: (isError: boolean) => { borderColor: string };
}) => (
  <Box w="full">
    <form onSubmit={submitHandler}>
      <VStack gap={4}>
        <Box w="full">
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="600"
            fontFamily="'Poppins', sans-serif"
            mb={2}
          >
            Email Address
          </Text>
          <Input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            bg={inputBg}
            borderColor={borderColor}
            color={textColor}
            _placeholder={{ color: grayText }}
            _hover={getHoverStyles(!!error)}
            _focus={getFocusStyles(!!error)}
            borderRadius="lg"
          />
        </Box>

        <PasswordInput
          name="password"
          value={user.password}
          onChange={handleChange}
          label="Password"
          placeholder="Enter your password"
          textColor={textColor}
          grayText={grayText}
          borderColor={borderColor}
          inputBg={inputBg}
          // Login form usually shows generic error at top, but we pass it down if needed
          errorMessage={error ? " " : undefined}
        />

        <Flex justify="space-between" align="center" w="full">
          <HStack
            gap={2}
            cursor="pointer"
            onClick={() => setRememberMe(!rememberMe)}
          >
            <Box
              w="5"
              h="5"
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
              bg={rememberMe ? "blue.500" : inputBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.2s"
            >
              {rememberMe && (
                <Box color="white" fontSize="xs">
                  <FaCheck />
                </Box>
              )}
            </Box>
            <Text
              fontSize="sm"
              color={grayText}
              fontFamily="'Poppins', sans-serif"
            >
              Remember me
            </Text>
          </HStack>
          <Link
            color="blue.500"
            fontSize="sm"
            fontWeight="500"
            href="/forgot-password"
            fontFamily="'Poppins', sans-serif"
          >
            Forgot Password?
          </Link>
        </Flex>

        <Button
          w="full"
          colorScheme={error ? "red" : "blue"}
          size="lg"
          borderRadius="lg"
          fontWeight="600"
          fontFamily="'Poppins', sans-serif"
          _hover={{ transform: "translateY(-1px)" }}
          transition="all 0.2s"
          type="submit"
          loading={isLoading}
        >
          Sign In
        </Button>
      </VStack>
    </form>
  </Box>
);
// ------------------------------------------------------------------------------------------------------
const RegisterForm = ({
  textColor,
  grayText,
  borderColor,
  inputBg,
  agreeTerms,
  setAgreeTerms,
  submitRegisterHandler,
  handleRegisterChange,
  userRegister,
  confirmPassword,
  handleConfirmPasswordChange,
  isLoading,
  validationErrors,
  getFocusStyles,
  getHoverStyles,
}: {
  textColor: string;
  grayText: string;
  borderColor: string;
  inputBg: string;
  agreeTerms: boolean;
  userRegister: IFormRegister;
  confirmPassword: string;
  setAgreeTerms: (value: boolean) => void;
  submitRegisterHandler: React.FormEventHandler<HTMLFormElement>;
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  validationErrors: ValidationErrors;
  getFocusStyles: (isError: boolean) => {
    borderColor: string;
    boxShadow: string;
  };
  getHoverStyles: (isError: boolean) => { borderColor: string };
}) => (
  <form onSubmit={submitRegisterHandler}>
    <VStack gap={4}>
      <HStack gap={4} w="full">
        <Box w="full">
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="600"
            fontFamily="'Poppins', sans-serif"
            mb={2}
          >
            First Name
          </Text>
          <Input
            name="firstName"
            value={userRegister.firstName}
            onChange={handleRegisterChange}
            type="text"
            placeholder="John"
            bg={inputBg}
            borderColor={validationErrors.firstName ? "red.500" : borderColor}
            color={textColor}
            _placeholder={{ color: grayText }}
            _hover={getHoverStyles(!!validationErrors.firstName)}
            _focus={getFocusStyles(!!validationErrors.firstName)}
            borderRadius="lg"
          />
          {validationErrors.firstName && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {validationErrors.firstName}
            </Text>
          )}
        </Box>

        <Box w="full">
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="600"
            fontFamily="'Poppins', sans-serif"
            mb={2}
          >
            Last Name
          </Text>
          <Input
            name="lastName"
            value={userRegister.lastName}
            onChange={handleRegisterChange}
            type="text"
            placeholder="Doe"
            bg={inputBg}
            borderColor={validationErrors.lastName ? "red.500" : borderColor}
            color={textColor}
            _placeholder={{ color: grayText }}
            _hover={getHoverStyles(!!validationErrors.lastName)}
            _focus={getFocusStyles(!!validationErrors.lastName)}
            borderRadius="lg"
          />
          {validationErrors.lastName && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {validationErrors.lastName}
            </Text>
          )}
        </Box>
      </HStack>

      <Box w="full">
        <Text
          color={textColor}
          fontSize="sm"
          fontWeight="600"
          fontFamily="'Poppins', sans-serif"
          mb={2}
        >
          Email Address
        </Text>
        <Input
          name="email"
          value={userRegister.email}
          onChange={handleRegisterChange}
          type="email"
          placeholder="john@example.com"
          bg={inputBg}
          borderColor={validationErrors.email ? "red.500" : borderColor}
          color={textColor}
          _placeholder={{ color: grayText }}
          _hover={getHoverStyles(!!validationErrors.email)}
          _focus={getFocusStyles(!!validationErrors.email)}
          borderRadius="lg"
        />
        {validationErrors.email && (
          <Text color="red.500" fontSize="xs" mt={1}>
            {validationErrors.email}
          </Text>
        )}
      </Box>

      <PasswordInput
        name="password"
        value={userRegister.password}
        onChange={handleRegisterChange}
        label="Password"
        placeholder="Create a password"
        textColor={textColor}
        grayText={grayText}
        borderColor={borderColor}
        inputBg={inputBg}
        errorMessage={validationErrors.password}
      />

      <PasswordInput
        label="Confirm Password"
        name="password_confirmation"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm your password"
        textColor={textColor}
        grayText={grayText}
        borderColor={borderColor}
        inputBg={inputBg}
        errorMessage={validationErrors.confirmPassword}
      />

      <HStack
        gap={2}
        cursor="pointer"
        onClick={() => {
          setAgreeTerms(!agreeTerms);
          if (!agreeTerms && validationErrors.terms) {
            // Parent component handles clearing via state update if we had a handler,
            // but here we rely on submit to clear or just visual feedback.
            // Ideally, we'd clear the error here too.
          }
        }}
        align="flex-start"
        w="full"
      >
        <Box
          w="5"
          h="5"
          borderRadius="md"
          borderWidth="1px"
          borderColor={validationErrors.terms ? "red.500" : borderColor}
          bg={agreeTerms ? "blue.500" : inputBg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.2s"
          mt="2px"
        >
          {agreeTerms && (
            <Box color="white" fontSize="xs">
              <FaCheck />
            </Box>
          )}
        </Box>
        <VStack align="start" gap={0}>
          <Text
            fontSize="sm"
            color={grayText}
            fontFamily="'Poppins', sans-serif"
          >
            I agree to{" "}
            <Link color="blue.500" href="/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link color="blue.500" href="/privacy">
              Privacy Policy
            </Link>
          </Text>
          {validationErrors.terms && (
            <Text color="red.500" fontSize="xs">
              {validationErrors.terms}
            </Text>
          )}
        </VStack>
      </HStack>

      <Button
        w="full"
        colorScheme="blue"
        size="lg"
        borderRadius="lg"
        fontWeight="600"
        fontFamily="'Poppins', sans-serif"
        _hover={{ transform: "translateY(-1px)" }}
        transition="all 0.2s"
        type="submit"
        loading={isLoading}
      >
        Create Account
      </Button>
    </VStack>
  </form>
);

// Password Input Component with Show/Hide Toggle
const PasswordInput = ({
  label,
  placeholder,
  textColor,
  grayText,
  borderColor,
  inputBg,
  name,
  value,
  onChange,
  errorMessage,
}: {
  label: string;
  placeholder: string;
  textColor: string;
  grayText: string;
  borderColor: string;
  inputBg: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string; // Changed from error (boolean/string mix) to specific errorMessage
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isError = !!errorMessage;

  const focusStyles = isError
    ? {
        borderColor: "red.500",
        boxShadow: "0 0 0 1px red.500",
      }
    : {
        borderColor: "blue.500",
        boxShadow: "0 0 0 1px blue.500",
      };

  return (
    <Box w="full" position="relative">
      <Text
        color={textColor}
        fontSize="sm"
        fontWeight="600"
        fontFamily="'Poppins', sans-serif"
        mb={2}
      >
        {label}
      </Text>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        bg={inputBg}
        borderColor={isError ? "red.500" : borderColor}
        color={textColor}
        _placeholder={{ color: grayText }}
        _hover={{ borderColor: isError ? "red.500" : "blue.500" }}
        _focus={focusStyles}
        borderRadius="lg"
        pr={12}
        name={name}
        value={value}
        onChange={onChange}
      />
      <IconButton
        position="absolute"
        right="2"
        top="8"
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword(!showPassword)}
        variant="ghost"
        color={isError ? "red.400" : grayText}
        _hover={{ color: isError ? "red.600" : textColor }}
        size="sm"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </IconButton>
      {isError && (
        <Text color="red.500" fontSize="xs" mt={1}>
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

export default AuthForms;
