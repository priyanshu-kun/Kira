import { useEffect, useState } from "react"
import { fetchUserProjects } from "../http"
import { useDispatch } from "react-redux"
import { setProjects } from "../store/project.slice"
import { toast } from "react-toastify"

export const useFetchProjects = (fetchingProjectFlag,id) => {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data: { data: projectsData } } = await fetchUserProjects(id)
                dispatch(setProjects(projectsData))
                setLoader(false)
            }
            catch (e) {
                setLoader(false)
                return toast.error("Cannot able to fetch projects.", {
                    icon: "😓"
                })
            }
        })()
    }, [fetchingProjectFlag])

    return {
        loader
    }
}