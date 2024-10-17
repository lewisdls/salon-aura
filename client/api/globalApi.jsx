import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getHeader = () => axiosClient.get("header?populate=*");

const getMembers = () => axiosClient.get("/members?populate=*");

const getServices = () => axiosClient.get("/services?populate=*");

const getAppointments = () => axiosClient.get("/appointments?populate=*");

const bookAppointment = (data) => axiosClient.post("/appointments", data);

export default {
  getHeader,
  getMembers,
  getServices,
  getAppointments,
  bookAppointment,
};
