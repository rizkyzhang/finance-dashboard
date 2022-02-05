import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser, useSupabase } from "use-supabase";
import validator from "validator";

export const Auth = ({ type }) => {
  const supabase = useSupabase();
  const user = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitAuth = async ({ email, password }) => {
    try {
      setIsLoading(true);

      const { user, error } =
        type === "signup"
          ? await supabase.auth.signUp({
              email: email.trim(),
              password: password.trim(),
            })
          : await supabase.auth.signIn({
              email: email.trim(),
              password: password.trim(),
            });

      if (user) {
        toast({
          title: `Sign ${type === "signup" ? "Up" : "In"} successful`,
          status: "success",
        });

        navigate("/");
      } else if (error) {
        toast({
          title: `Sign ${type === "signup" ? "Up" : "In"} failed`,
          description: error.message,
          status: "error",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg="blackAlpha.300"
      borderRadius="lg"
      p={5}
      color="white"
      alignSelf="center"
    >
      <Stack align="center" textAlign="center" mb={5}>
        <Heading as="h1" size="xl">
          {type === "signup" ? "Sign Up" : "Sign In"}
        </Heading>
        {type === "signup" ? (
          <Text>
            Already have an account?{" "}
            <Link color="blue.500" as={ReactRouterLink} to="/signin">
              Sign In
            </Link>
          </Text>
        ) : (
          <Text>
            Doesn't have an account?{" "}
            <Link color="blue.500" as={ReactRouterLink} to="/signup">
              Sign Up
            </Link>
          </Text>
        )}
      </Stack>

      <Stack as="form" onSubmit={handleSubmit(handleSubmitAuth)}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="mail@gmail.com"
            {...register("email", {
              required: true,
              validate: (value) => validator.isEmail(value),
            })}
          />
          <FormHelperText color="red.500">
            {errors?.email?.type === "required" && (
              <span>Email is required</span>
            )}
            {errors?.email?.type === "validate" && (
              <span>Email is not valid</span>
            )}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="6.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                validate: (value) => value.trim().length !== 0,
              })}
            />
            <InputRightElement>
              <IconButton
                onClick={handleShowPassword}
                size="sm"
                h="1.75rem"
                aria-label={showPassword ? "Hide" : "Show"}
                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                bg="transparent"
                _hover={{ bg: "transparent" }}
              />
            </InputRightElement>
          </InputGroup>
          <FormHelperText color="red.500">
            {(errors?.password?.type === "required" ||
              errors?.password?.type === "validate") && (
              <span>Password is required</span>
            )}
          </FormHelperText>
          <FormHelperText color="red.500">
            {errors?.password?.type === "minLength" && (
              <span>Password should be min 8 characters</span>
            )}
          </FormHelperText>
        </FormControl>

        <Button
          isLoading={isLoading}
          disabled={isLoading}
          loadingText="Processing..."
          colorScheme="blue"
          type="submit"
        >
          {type === "signup" ? "Sign Me Up" : "Sign Me In"}
        </Button>
      </Stack>
    </Box>
  );
};
