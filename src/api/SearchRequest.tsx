import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

export const findUser =(username: string)=>API.get(`/find/${username}`);