import { Avatar, Box, Button, Divider, Flex } from "@chakra-ui/react";
import { createChat } from "../../api/CreateChatRequest";

export const SearchBox = (props: any) => {
  const user = props.user;
  const currentUser = props.currentUser;
  const setTrigger = props.setTrigger;
  const setSearchOpen = props.setSearchOpen;
  const setCurrentChat = props.setCurrentChat;
  const setSelectedChat = props.setSelectedChat;

  const startChat = async () => {
    const chatData = {
      senderId: currentUser,
      receiverId: user._id,
    };
    try {
      const { data } = await createChat(chatData);
      setCurrentChat(data);
      setSelectedChat(data._id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setTrigger();
    setSearchOpen();
  };

  return (
    <>
      <Box
        borderRadius="10px"
        mt="1"
        p="1"
        _hover={{
          bg: "#ead4fc",
        }}
        transition="background 0.1s ease-in-out"
      >
        <Flex>
          <Box userSelect="none" w="fit-content">
            <Avatar name={user.username} />
          </Box>
          <Box>
            <Box ml="2" as="b">
              {user.username}
            </Box>
            <Box ml="2">About</Box>
          </Box>
          <Box position="absolute" right="0" mr="8" mt="1">
            <Button onClick={startChat}>Message</Button>
          </Box>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};
