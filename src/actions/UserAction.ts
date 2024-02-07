import * as UserRequest from "../api/UserRequest";

interface UserData {
  username: string;
  about: string;
  profilePicture: string;
}

export const updateUser =
  (id: any, dataOfUser: UserData) => async (dispatch: any) => {
    dispatch({ type: "UPLOAD_START" });
    try {
      const { data } = await UserRequest.updateUser(id, dataOfUser);
      dispatch({ type: "UPDATE_SUCCESS", data: data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
