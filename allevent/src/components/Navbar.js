import React from "react";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
  };
  return (
    <Box>
      <Flex
        padding={2}
        backgroundColor="lightgray"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Box>
          <Image
          onClick={() => navigate('/')}
            w="15%"
            src="https://allevents.s3.amazonaws.com/media-kit/ae-logo-white.png"
          />
        </Box>
        <Flex justifyContent="center" gap={5} alignItems="center">
          <button className="btn" onClick={() => navigate("/create")}>Create Event</button>
          {user ? <button onClick={logout} className="btn">Logout</button> : <button onClick={() => navigate('/login')} className="btn">login</button>}
          <Image
            w="15%"
            borderRadius={"50%"}
            src={
              user
                ? user.picture
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
          ></Image>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
