import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend API URL
});

export const registerUser = (email, password, firstName, lastName) => {
  return api.post("/user/create", { email, password, firstName, lastName });
};

export const loginUser = (email, password) => {
  return api.post("/user/login", { email, password });
};

export const editUser = (token, firstName, lastName) => {
  return api.post("/user/edit", { token, firstName, lastName });
};
