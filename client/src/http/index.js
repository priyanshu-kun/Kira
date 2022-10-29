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
export const createAccount =  async (data) =>  await axios.post('http://localhost:5500/api/create-account',data)
export const userLogin =  async (data) =>  await axios.post('http://localhost:5500/api/login-user',data)
// export const refresh =  async () =>  await axios.get('http://localhost:5500/api/refresh')


api.interceptors.response.use((config) => {return config;}, async (error) => {
    const originalReq = error.config;
    console.log(originalReq)
    if(error?.response?.status === 401 && originalReq && originalReq._isRetry) {
        originalReq.isRetry = true;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{withCredentials: true})
            return api.request(originalReq)
        }
        catch(e) {
            console.error(e)
        }
    }
    throw error;
})


export default api