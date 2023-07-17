import axios from "axios";

export const HTTPEmployees = axios.create({
  baseURL: "https://cukcuk.manhnv.net/api/v1/Employees",
});

export const HTTPDepartments = axios.create({
  baseURL: "https://cukcuk.manhnv.net/api/v1/Departments",
});
