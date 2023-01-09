import { useState, useEffect } from "react"
import { getComments } from "../http"


export const useFetchComments = (id) => {
    const [commentList, setCommentList] = useState([])
    useEffect(() => {
        (async () => {
            const { data: { reqStatus, data } } = await getComments(id)
            if (reqStatus) {
                setCommentList(data)
            }
        })()
    }, [id])
    return {
        commentList,
        setCommentList
    }
}