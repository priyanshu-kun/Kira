import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});


export const sendOTP =  async (data) =>  await axios.post('http://localhost:5500/api/send-otp',data)
export const verifyOTP =  async (data) =>  await axios.post('http://localhost:5500/api/verify-otp',data)


export default api