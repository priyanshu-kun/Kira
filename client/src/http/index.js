import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5500/api",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});



export const sendOTP = async (data) => await api.post('http://localhost:5500/api/send-otp', data)
export const verifyOTP = async (data) => await api.post('http://localhost:5500/api/verify-otp', data)
export const createAccount = async ({user,query}) => await api.post(`http://localhost:5500/api/create-account${query !== null ? `?data=${query}`: ""}`, user)
export const userLogin = async (inputs) =>  {
    return await api.post(`http://localhost:5500/api/login-user`, inputs)
}
export const updateUser = async (id,data) => await api.patch('http://localhost:5500/api/update-user/'+id,data)
export const deleteAccount = async (id) => await api.delete('http://localhost:5500/api/delete-account/'+id)
export const userLogout = async (data) => await api.post('http://localhost:5500/api/logout-user', data)
export const troubleShootAccount = async (data) => await api.post('http://localhost:5500/api/troubleShoot-account', data)
export const forgotPassword = async (data,id) => await api.post('http://localhost:5500/api/forgot-password/'+id, data)
export const createNewProject = async (data) => await api.post('http://localhost:5500/api/create-project', data)
export const showPass = async (id,data) => await api.post("http://localhost:5500/api/show-password/"+id,data)
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
export const findAllUsers = async () => await api.get('http://localhost:5500/api/fetch-all-users')
export const createNewBug = async (data) => await api.post('http://localhost:5500/api/create-bug',data)
export const fetchAllBugsRelatedToProject = async (id,skip,limit,filter) => await api.get('http://localhost:5500/api/fetch-all-bugs/'+id+"?skip="+skip+"&limit="+limit)
export const fetchBugsFromProject = async (id) => await api.get('http://localhost:5500/api/fetch-details/'+id)
export const removeBugFromProject = async (id) => await api.delete('http://localhost:5500/api/remove-bug/'+id)
export const updateBug = async (id,data) => await api.patch('http://localhost:5500/api/update-bug/'+id,data)
export const resolveBug = async (id) => await api.get('http://localhost:5500/api/resolve-bug/'+id)
export const unResolveBug = async (id,activityId) => await api.get('http://localhost:5500/api/unresolve-bug/'+id+"/"+activityId)
export const fetchTimelineActivites = async (skip,limit) => await api.get(`http://localhost:5500/api/fetch-timeline-activites?skip=${skip}&limit=${limit}`)
export const saveComment = async (data) => await api.post("http://localhost:5500/api/save-comment",data)
export const getComments = async (id) => await api.get("http://localhost:5500/api/get-comments/"+id)

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