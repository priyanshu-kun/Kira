import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5500/api",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// const dispatch = useDispatch()


export const sendOTP = async (data) => await api.post('http://localhost:5500/api/send-otp', data)
export const verifyOTP = async (data) => await api.post('http://localhost:5500/api/verify-otp', data)
export const createAccount = async (data) => await api.post('http://localhost:5500/api/create-account', data)
export const userLogin = async ({inputs,params}) =>  {
    return await api.post(`http://localhost:5500/api/login-user${params !== null ? `?data=${params}`: ""}`, inputs)
}
export const userLogout = async (data) => await api.post('http://localhost:5500/api/logout-user', data)
export const createNewProject = async (data) => await api.post('http://localhost:5500/api/create-project', data)
export const removeProject = async (projectId) => await api.delete('http://localhost:5500/api/user/remove-project', {
    data: {
        projectId
    }
})
export const fetchUserProjects = async (userId) => await api.get('http://localhost:5500/api/fetch/user/projects', {
    params: {
        id: userId
    }
})
export const fetchProjectDetails = async (userId) => await api.get('http://localhost:5500/api/fetch/user/project/details', {
    params: {
        id: userId
    }
})
export const invitePerson = async (data) => await api.post('http://localhost:5500/api/fetch/user/project/send-invite',data)



api.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
     const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            console.log(originalRequest.isRetry)
            try {
                await axios.get(
                    `http://localhost:5500/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }


        throw error;
  });


export default api