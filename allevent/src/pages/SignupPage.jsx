import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text, Box } from "@chakra-ui/react";

const SignupPage = () => {

  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self")
  }

  return (
    <Box className="loginDiv">
      <Box>
        <Center mt={5}>
          <img src="https://allevents.s3.amazonaws.com/media-kit/ae-logo-portrait.png" alt="logo" width={"40%"} />
        </Center>
        <Text fontWeight={600} p='30px'>Login using google account</Text>
        <Button
          className="googleBtn"
          w={"half"}
          maxW={"sm"}
          variant={"outline"}
          leftIcon={<FcGoogle />}
          onClick={google}
        >
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
      </Box>
    </Box>
  );
};

export default SignupPage;
