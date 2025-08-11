import api from "./axiosInstance";
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from "@/types/auth";

export const SignIn = async (credentials: SignInRequest): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>("/user/signin", credentials);
  return response.data;
};

export const SignUp = async (credentials: SignUpRequest): Promise<SignUpResponse> => {
  const response = await api.post<SignUpResponse>("/user/signup", credentials);
  return response.data;
};