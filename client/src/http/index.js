import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});




export const sendOTP = async (data) => await api.post('/send-otp', data)
export const verifyOTP = async (data) => await api.post('/verify-otp', data)
export const createAccount = async ({user,query}) => await api.post(`/create-account${query !== null ? `?data=${query}`: ""}`, user)
export const userLogin = async (inputs) =>  {
    return await api.post(`/login-user`, inputs)
}
export const updateUser = async (id,data) => await api.patch('/update-user/'+id,data)
export const deleteAccount = async (id) => await api.delete('/delete-account/'+id)
export const userLogout = async (data) => await api.post('/logout-user', data)
export const troubleShootAccount = async (data) => await api.post('/troubleShoot-account', data)
export const forgotPassword = async (data,id) => await api.post('/forgot-password/'+id, data)
export const createNewProject = async (data) => await api.post('/create-project', data)
export const showPass = async (id,data) => await api.post("/show-password/"+id,data)
export const removeProject = async (projectId) => await api.delete('/user/remove-project', {
    data: {
        projectId
    }
})
export const fetchUserProjects = async (userId) => await api.get('/fetch/user/projects', {
    params: {
        id: userId
    }
})
export const fetchProjectDetails = async (userId) => await api.get('/fetch/user/project/details', {
    params: {
        id: userId
    }
})
export const invitePerson = async (data) => await api.post('/fetch/user/project/send-invite',data)
export const findAllUsers = async () => await api.get('/fetch-all-users')
export const createNewBug = async (data) => await api.post('/create-bug',data)
export const fetchAllBugsRelatedToProject = async (id,skip,limit,filter) => await api.get('/fetch-all-bugs/'+id+"?skip="+skip+"&limit="+limit)
export const fetchBugFromProject = async (id) => await api.get('/fetch-details/'+id)
export const removeBugFromProject = async (id) => await api.delete('/remove-bug/'+id)
export const updateBug = async (id,data) => await api.patch('/update-bug/'+id,data)
export const resolveBug = async (id) => await api.get('/resolve-bug/'+id)
export const unResolveBug = async (id,activityId) => await api.get('/unresolve-bug/'+id+"/"+activityId)
export const fetchTimelineActivites = async (skip,limit) => await api.get(`/fetch-timeline-activites?skip=${skip}&limit=${limit}`)
export const saveComment = async (data) => await api.post("/save-comment",data)
export const getComments = async (id) => await api.get("/get-comments/"+id)

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
            try {
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/refresh`,
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