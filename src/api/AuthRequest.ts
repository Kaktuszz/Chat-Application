import axios from "axios";


interface UserData {
    username: string;
    email: string;
    password: string;
    confpassword: string;
  }
const API = axios.create({baseURL: "http://localhost:5000"});

export const logIn = (userData: UserData) => API.post('/auth/login', userData)
export const signUp = (userData: UserData) => API.post('/auth/register', userData)


