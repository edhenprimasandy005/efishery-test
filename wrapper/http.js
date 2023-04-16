import { config } from 'dotenv';
config();
const APIURL = process.env.API_URL;
import axios from "axios";

const api = axios.create({
	baseURL: APIURL,
});

export default api;