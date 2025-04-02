import axios from "axios";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axios.post("/api/auth/login", data);
  return response.data;
};


export const sentOtp = async (data:{email:string})=>{
  const response = await axios.post ("/api/otp/sent-otp",data);
  return response.data;
}


export const verifyOtp = async (data:{email:string; otp:string})=>{
  const response = await axios.post("/api/otp/verify-otp",data);
  return response.data;
}

export const registerApi = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post("/api/auth/register", data);
  return response.data;
};
