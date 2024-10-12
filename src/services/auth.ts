import axios, { AxiosResponse } from 'axios';

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  accessToken: string;
}

// Define the login API function
export const login = (formData: FormData): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post('https://dummyjson.com/auth/login', formData);
};
