import { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Divider,
  Flex,
} from "@chakra-ui/react";

export const ConversationBox = (props: any) => {
  interface UserData {
    username: string;
    email: string;
    isAdmin: boolean;
  }
  const data = props.data;
  const currentUser = props.currentUser;
  const checkOnline = props.checkOnline;
  const windowWidth = props.windowWidth;
  const selectedChat = props.selectedChat

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userId = data.members.find((id: any) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <Box
        borderRadius="10px"
        mt="1"
        p="1"
        bg={selectedChat === data._id ? "#ead4fc" : ""}
        _hover={{
          bg: "#ead4fc",
        }}
        transition="background 0.1s ease-in-out"
      >
        <Center
          style={
            windowWidth > 600
              ? { alignItems: "start", justifyContent: "start" }
              : {}
          }
        >
          <Box userSelect="none" w="fit-content">
            <Flex>
              <Avatar
                name={userData?.username}
                m="1"
                size={windowWidth < 600 ? "sm" : "md"}
              >
                {checkOnline && <AvatarBadge boxSize="1em" bg="green.500" />}
              </Avatar>

              {windowWidth < 600 ? (
                ""
              ) : (
                <Box>
                  <Box h="20px" as="b">
                    {userData?.username}
                  </Box>
                  <Box>Last message</Box>
                </Box>
              )}
            </Flex>
          </Box>
        </Center>
      </Box>
      <Divider />
    </>
  );
};
