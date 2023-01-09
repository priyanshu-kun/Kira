import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { fetchProjectDetails, findAllUsers } from '../http'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setProjectDetails } from '../store/project.slice'


export const useFetchProjectDetails = (id) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [details, setDetails] = useState({})
    const [loader, setLoader] = useState(true)
    const [invitedUser, setInvitedUser] = useState([])


    useEffect(() => {
        (async () => {
            try {
                const { data: { data: Details } } = await fetchProjectDetails(id)
                if (Details === null) {
                    toast.error("Project is already deleted.", {
                        icon: "😓"
                    })
                    return navigate("/")
                }
                const { data: { data: { userDto } } } = await findAllUsers()
                const Users = userDto.filter(u => {
                    return Details.users.find(e => e === u.email)
                })
                setDetails(Details)
                dispatch(setProjectDetails(Details))
                setInvitedUser(Users)
                setLoader(false)
            }
            catch (e) {
                setLoader(false)
                return toast.error("Cannot able to fetch details.", {
                    icon: "😓"
                })
            }
        })()
    }, [id])

    return {
        details,
        loader,
        invitedUser
    }


}