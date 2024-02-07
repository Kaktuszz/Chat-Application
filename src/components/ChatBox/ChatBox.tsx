import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessagesRequest";
import { time, clock } from "../../helpers/helpers";
import InputEmoji from "react-input-emoji";

export const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
  online,
}: any) => {
  interface UserData {
    username: string;
    email: string;
    isAdmin: boolean;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setMessage] = useState<string>("");
  const scroll = useRef<any>();

  /// fetching data for header

  useEffect(() => {
    const userId = chat?.members?.find((id: any) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  /// fetching message from db

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  /// recceived message from socket

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /// handlers

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("");
    }
    const time = clock();
    const receiverId = chat.members.find((id: any) => id !== currentUser);
    setMessage("");
    setSendMessage({ ...message, receiverId, createdAt: time });
  };

  const selfStyle = {
    backgroundColor: "#bec9fa",
    alignSelf: "flex-end",
    borderRadius: "20px 20px 0px 20px",
    width: "fit-content",
    maxWidth: "480px",
    padding: "5px",
    marginTop: "5px",
    fontSize: "20px",
  };

  const userStyle = {
    backgroundColor: "#ebeefc",
    borderRadius: "0px 20px 20px 20px",
    padding: "5px",
    marginTop: "5px",
    width: "fit-content",
    maxWidth: "480px",
    fontSize: "20px",
  };

  return (
    <>
      {chat ? (
        <>
          <Box userSelect="none" position="sticky" top="0" bg="gray.50" p="5px">
            <Flex>
              <Avatar name={userData?.username}>
                {online ? <AvatarBadge boxSize="1em" bg="green.500" /> : ""}
              </Avatar>
              <Box ml="2">
                <Box as="b">{userData?.username}</Box>
                <Box>{online ? "Online" : "Offline"}</Box>
              </Box>
              <Box ml="auto" mr="10px" mt="10px">
                <Button borderRadius="10px">
                  <BsThreeDotsVertical />
                </Button>
              </Box>
            </Flex>
            <Divider bottom="0" />
          </Box>

          <Flex flexDirection="column" w="100%">
            {messages.map((message: any, index) => (
              <Box
                key={index}
                style={message.senderId === currentUser ? selfStyle : userStyle}
                wordBreak="break-word"
                ref={scroll}
              >
                <Box>{message.text}</Box>
                <Box fontSize="12px">{time(message.createdAt)}</Box>
              </Box>
            ))}
          </Flex>

          <Box
            position="sticky"
            mb="3"
            bottom="0"
            p="10px"
            bg="gray.50"
            borderRadius="10px"
          >
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              placeholder="Message"
              onEnter={sendMessage}
            />
          </Box>
        </>
      ) : (
        <Center>
          <Heading size="lg">Select chat to start</Heading>
        </Center>
      )}
    </>
  );
};
