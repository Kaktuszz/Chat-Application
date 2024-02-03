import { Dispatch } from "redux";
import * as AuthApi from "../api/AuthRequest";



interface UserData {
  username: string;
  email: string;
  password: string;
  confpassword: string;
}
interface AuthStartAction {
  type: "AUTH_START";
}
interface AuthSuccessAction {
  type: "AUTH_SUCCESS";
  data: any;
}
interface AuthFailAction {
  type: "AUTH_FAIL";
}

type AuthActionTypes = AuthStartAction | AuthSuccessAction | AuthFailAction;

export const logIn = (userData: UserData) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(userData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (userData: UserData) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(userData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};



