import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});


export const sendOTP =  (data) => {
    console.log(data)
      axios.post('http://localhost:5500/api/send-otp',data)
}


export default api