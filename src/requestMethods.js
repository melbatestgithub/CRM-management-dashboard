import axios from "axios";

const BASE_URL = "http:/localhost:5600/api";

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTUzNGM1ZjBhZjJjMzYyMjhiODc1YyIsImlhdCI6MTcxMjY2NjY5MX0.pvEPTTMf9iy5HxcogldUFBnryHVvLHUf0_U4ZcSCAJ8";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
