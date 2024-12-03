import axios from "axios";
import { AuthResponse, Flight } from "../types";

interface Response {
  total: number;
  count: number;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface ILoginPayload {
  email: string;
  password: String;
}

export interface IFlight {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: string;
  img: string;
}

export type IFlightData = Omit<IFlight, "id" | "status" | "img">;

const baseURL = "https://flight-api-rdtr.onrender.com";

const axiosInstance = axios.create({ baseURL });

export const signUp = (data: ISignupPayload) =>
  axiosInstance.post<IAuthResponse>(`/auth/register`, data);

export const login = (data: ILoginPayload) =>
  axiosInstance.post<IAuthResponse>(`/auth/login`, data);

export const fetchFlights = async (code = "", size = 10, page = 1) => {
  return axiosInstance.get<Response & { resources: Flight[] }>(`/flights`, {
    params: {
      ...(code && { code }),
      ...(size && { size }),
      ...(page && { page }),
    },
  });
};

export const createFlight = (flight: IFlightData) => {
  return axiosInstance.post<IFlight>("/flights", flight);
};

export const updateFlight = (payload: { id: string; flight: IFlightData }) => {
  const { id, flight } = payload;

  return axiosInstance.put<IFlight>(`/flights/${id}`, flight);
};

export const deleteFlight = async (id: string) => {
  return axiosInstance.delete<Response & { resources: Flight[] }>(
    `/flights/${id}`
  );
};

export const fetchUser = () => {
  const getToken = () => localStorage.getItem("token");

  return axiosInstance.get("/auth/me", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
