import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

axios.defaults.withCredentials = true;


export const sendOTP =  async (data) =>  await axios.post('http://localhost:5500/api/send-otp',data)
export const verifyOTP =  async (data) =>  await axios.post('http://localhost:5500/api/verify-otp',data)
export const createAccount =  async (data) =>  await axios.post('http://localhost:5500/api/create-account',data)
export const userLogin =  async (data) =>  await axios.post('http://localhost:5500/api/login-user',data)
export const userLogout =  async (data) =>  await axios.post('http://localhost:5500/api/logout-user',data)
export const createNewProject =  async (data) =>  await axios.post('http://localhost:5500/api/create-project',data)
export const fetchUserProjects =  async (userId) =>  await axios.get('http://localhost:5500/api/fetch/user/projects',{
    params: {
        id: userId
    }
})
export const fetchProjectDetails =  async (userId) =>  await axios.get('http://localhost:5500/api/fetch/user/project/details',{
    params: {
        id: userId
    }
})


// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log("inside interse: ",err.message);
            }
        }
        throw error;
    }
);


export default api