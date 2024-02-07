import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

export const createChat = (data: any)=>API.post(`/chat/`,data)