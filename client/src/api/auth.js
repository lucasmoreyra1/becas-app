import axios from "./axios";

// const API = "http://localhost:4000";

export const loginRequest = (user) => axios.post(`auth/login`, user);

export const getUserRequest = (token) =>
  axios.get(`auth/user`, {
    headers: {
      Token: `Bearer ${token}`,
    },
  });
