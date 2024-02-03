import {
  Box,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import ledarLogo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

export const AuthPage = (props: any) => {
  /// interfaces
  interface UserData {
    username: string;
    email: string;
    password: string;
    confpassword: string;
  }

  /// states

  const [logInForm, setLogInForm] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    confpassword: "",
  });

  // validation states

  const [confPass, setConfPass] = useState<boolean>(false);
  const [passErr, setPassErr] = useState<boolean>(false);
  const [confEmail, setConfEmail] = useState<boolean>(false);
  const [confUser, setConfUser] = useState<boolean>(false);
  

  const loading = useSelector((state: any)=>state.authReducer.loading);

  // redux

  const dispatch = useDispatch();

  /// handlers

  const handleData = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!logInForm) {
      userData.username === "" ? setConfUser(true) : setConfUser(false);

      userData.email === "" || !isValidEmail.test(userData.email)
        ? setConfEmail(true)
        : setConfEmail(false);

      userData.password === "" ? setPassErr(true) : setPassErr(false);

      userData.password != userData.confpassword
        ? setConfPass(true)
        : dispatch(signUp(userData) as any);
    } else {
      dispatch(logIn(userData) as any);
    }
  };

  const resetForm = () => {
    setLogInForm(!logInForm);
    setConfPass(false);
    setPassErr(false);
    setConfEmail(false);
    setConfUser(false);
    setUserData({
      username: "",
      email: "",
      password: "",
      confpassword: "",
    });
  };

  return (
    <Box mt="10%">
      <Flex direction={props.windowWidth > 550 ? "row" : "column"}>
        <Spacer />
        <Box
          w={props.windowWidth > 550 ? "30%" : "40%"}
          h="100"
          mr="3%"
          ml="30px"
          mb="10px"
        >
          <Image src={ledarLogo} userSelect="none" draggable="false" />
        </Box>
        <Box
          w={props.windowWidth > 550 ? "400px" : "auto"}
          h="auto"
          bg="gray.50"
          p="30px"
          borderRadius="10px"
          m="30px"
        >
          <form>
            <FormControl isInvalid={confUser}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleData}
              />
              <FormErrorMessage>Please enter username</FormErrorMessage>
            </FormControl>
            {logInForm ? (
              ""
            ) : (
              <FormControl isInvalid={confEmail}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleData}
                />
                <FormErrorMessage>Please enter valid email</FormErrorMessage>
              </FormControl>
            )}

            <FormControl isInvalid={passErr}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleData}
              />
              <FormErrorMessage>Please enter password</FormErrorMessage>
            </FormControl>
            {logInForm ? (
              ""
            ) : (
              <FormControl isInvalid={confPass}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confpassword"
                  value={userData.confpassword}
                  onChange={handleData}
                />
                <FormErrorMessage>Password does not match</FormErrorMessage>
              </FormControl>
            )}
            <Text
              mt="5px"
              userSelect="none"
              cursor="pointer"
              onClick={resetForm}
            >
              {logInForm
                ? "Don't have a account? Sign up"
                : "Already have a account? Log In"}
            </Text>
            <Button mt="15px" onClick={handleSubmit} isDisabled={loading} >
              {loading ? <Spinner size="sm" /> : logInForm ? "Log in" : "Signup"}
            </Button>
          </form>
        </Box>
        <Spacer />
      </Flex>
    </Box>
  );
};
