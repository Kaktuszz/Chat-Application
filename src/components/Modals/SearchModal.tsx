import {
  //   Avatar,
  Box,
  Center,
  //   Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { findUser } from "../../api/SearchRequest";
import { SearchBox } from "../SearchBox/SearchBox";
import { useSelector } from "react-redux";

export const SearchModal = (props: any) => {
  const { user } = useSelector((state: any) => state.authReducer.authData);

  interface UserData {
    username: string;
  }

  const isSearchOpen = props.isSearchOpen;
  const setSearchOpen = props.setSearchOpen;
  const setTrigger = props.setTrigger;
  const setCurrentChat = props.setCurrentChat;
  const setSelectedChat = props.setSelectedChat;

  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const usernameHandler = (e: any) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const findUsers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = await findUser(username);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setUsers([]);
        setLoading(false);
        // console.error(error);
      }
    };
    findUsers();
  }, [username]);

  useEffect(() => {
    setUsername("");
  }, [isSearchOpen]);

  return (
    <Modal isOpen={isSearchOpen} onClose={setSearchOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={usernameHandler}
            />
            {loading ? (
              <Center>
                <Box mt="5">
                  <Spinner size="lg" />
                </Box>
              </Center>
            ) : users.length > 0 ? (
              users.map((item, index) => (
                <Box key={index}>
                  <SearchBox
                    setCurrentChat={setCurrentChat}
                    setSelectedChat={setSelectedChat}
                    user={item}
                    currentUser={user._id}
                    setTrigger={setTrigger}
                    setSearchOpen={setSearchOpen}
                  />
                </Box>
              ))
            ) : (
              <Box mt="3">User not found</Box>
            )}
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
