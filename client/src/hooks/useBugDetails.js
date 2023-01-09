import { useEffect, useState } from "react"
import { fetchBugFromProject } from "../http"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export const useBugDetails = (id) => {

    const navigate = useNavigate()
    const [bugDetails, setBugDetails] = useState({})
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const { data: { data: details } } = await fetchBugFromProject(id)
                if (!details) {
                    navigate("/")
                    return toast.error("Bug is already deleted by user", {
                        icon: "😓"
                    })
                }
                setBugDetails(details)
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
        bugDetails,
        setBugDetails,
        loader
    }
}