import { apiClient } from "../api/client";
import { endpoints } from "../api/endpoints";

type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const response = await apiClient.post(endpoints.auth.login, payload);
  return response.data;
}
