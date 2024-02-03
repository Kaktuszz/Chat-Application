import { Box, Button, Center, Flex, Image } from "@chakra-ui/react";
import Logo from "../../assets/logo.svg";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import { ConversationBox } from "../ConversationBox/ConversationBox";
import { ChatBox } from "../ChatBox/ChatBox";
import { io } from "socket.io-client";
import { FaSearch } from "react-icons/fa";
import { IoIosSettings, IoIosLogOut } from "react-icons/io";

export const Chats = (props: any) => {
  const windowWidth = props.windowWidth;

  const { user } = useSelector((state: any) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<[]>([]);
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [receiveMessage, setReceiveMessage] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState<boolean>();
  const socket = useRef<any>();

  /// sending message to socket

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
      console.log(sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("add-new-user", user._id);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

  /// receive message from socket

  useEffect(() => {
    socket.current.on("receive-message", (data: any) => {
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };

    getChats();
  }, [user]);

  const checkOnline = (chat: any) => {
    const chatMember = chat.members.find((member: any) => member !== user._id);
    const online = onlineUsers.find((user: any) => user.userId === chatMember);
    return online ? true : false;
  };

  const online = () => {
    if (currentChat !== null) {
      return checkOnline(currentChat);
    }
  };

  const logout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("store");
    location.reload();
  };

  return (
    <Flex h="100vh">
      <Box
        bg="gray.50"
        w="300px"
        h="auto"
        borderRadius="10px"
        m="10px"
        p="10px"
        border="1px solid #D096FF"
      >
        <Box>
          {windowWidth < 600 ? (
            <Center>
              <Image src={Logo} maxH="48px" />
            </Center>
          ) : (
            <Box>
              <Button m="3px">
                <FaSearch />
              </Button>
              <Button m="3px">
                <IoIosSettings />
              </Button>
              <Button m="3px" right="0" onClick={logout} title="logout">
                <IoIosLogOut />
              </Button>
            </Box>
          )}
        </Box>
        {chats.map((chat: any, index: number) => (
          <Box
            key={index}
            onClick={() => {
              setCurrentChat(chat);
              setSelectedChat(chat._id);
            }}
          >
            <ConversationBox
              data={chat}
              currentUser={user._id}
              checkOnline={checkOnline(chat)}
              windowWidth={windowWidth}
              selectedChat={selectedChat}
            />
          </Box>
        ))}
      </Box>
      <Box
        bg="gray.50"
        m={windowWidth < 600 ? "10px 10px 10px 0px" : "10px"}
        p="0px 10px 10px 10px"
        w="1300px"
        borderRadius="10px"
        border="1px solid #D096FF"
        overflowX="auto"
      >
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
          online={online()}
        />
      </Box>
    </Flex>
  );
};
