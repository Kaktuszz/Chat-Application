import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { updateUser } from "../../api/UserRequest";

interface UserData {
  username: string;
  about: string;
  profilePicture: string;
  email: string;
  password: string;
  confPass: string;
}

export const SettingsModal = (props: any) => {
  const isSettingOpen = props.isSettingOpen;
  const setSettingsOpen = props.setSettingsOpen;
  const windowWidth = props.windowWidth;
  const data = props.data;

  const { password, ...other } = data;

  const [userData, setUserData] = useState<UserData>(other);
  // const [profilePicture, setProfilePicture] = useState<any>(null);
  // const dispatch = useDispatch();
  // const param = useParams();
  // const { user } = useSelector((state: any) => state.authReducer.authData);

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // add event
  const userUpdate = () => {
    // e.preventDefault();
    // let dataOfUser = userData;
    // console.log(dataOfUser, user._id);
    // if (profilePicture) {
    //   const data = new FormData();
    //   const fileName = Date.now() + profilePicture.name;
    //   data.append("name", fileName);
    //   data.append("file", profilePicture);
    //   dataOfUser.profilePicture = fileName;
    // }
    // try {
    //   // dispatch(uploadImage(data) as any);
    //   console.log(data);
    // } catch (err) {
    //   console.error(err);
    // }

    // dispatch(updateUser(user._id, {dataOfUser}) as any);
    // setSettingsOpen(false);
    return true;
  };

  return (
    <Modal isOpen={isSettingOpen} onClose={setSettingsOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            Username:{" "}
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          </Box>
          <Box>
            About:{" "}
            <Input
              type="text"
              placeholder="About"
              name="About"
              value={userData.about}
              onChange={handleChange}
            />
          </Box>
          <Box m="10px" display={windowWidth < 300 ? "block" : "block"}>
            <Center justifyContent="space-evenly">
              <Avatar name="name" size="xl" />
              <Input border="none" type="file" name="profilePicture" />
            </Center>
          </Box>
          <Button onClick={userUpdate} type="submit">
            Save changes
          </Button>
        </ModalBody>
        <Divider />
        <ModalHeader>Security Settings</ModalHeader>
        <ModalBody>
          <Box>
            Email:{" "}
            <Input
              type="text"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Box>

          <Box>
            Password:{" "}
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </Box>
          <Box mb="10px">
            Confirm Password:{" "}
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confPass"
              value={userData.confPass}
              onChange={handleChange}
            />
          </Box>
          <Button>Save changes</Button>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
