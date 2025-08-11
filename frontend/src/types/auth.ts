export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  status: number;
  message: string;
  // You can add token, user info etc. here if your backend returns it
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  status: number;
  message: string;
  data: any
  // You can add token, user info etc. here if your backend returns it
}