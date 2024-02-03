import axios from "axios";

const API = axios.create({baseURL:  "http://localhost:5000"});

export const getMessages=(chatId: string)=>API.get(`/message/${chatId}`);

export const addMessage=(message: any)=>API.post(`/message/`, message);