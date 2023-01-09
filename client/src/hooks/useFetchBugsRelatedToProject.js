import { useEffect, useState } from "react"
import { fetchAllBugsRelatedToProject } from "../http"

export const useFetchBugsRelatedToProject = (details,pagination,bugRemoved) => {
  const [totalPages, setTotalPages] = useState(0)
  const [documentCount, setDocumentCount] = useState(0)
  const [projectBugs, setProjectBugs] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const { data: { data: { bugs, count, totalPages } } } = await fetchAllBugsRelatedToProject(details._id, pagination.skip, pagination.limit)
        setTotalPages(totalPages)
        setDocumentCount(count)
        setProjectBugs(bugs)
      }
      catch (e) {
        return toast.error("Cannot able to fetch projects.", {
          icon: "😓"
        })
      }
    })()
  }, [details._id, pagination,bugRemoved])


  return {
    totalPages,
    documentCount,
    projectBugs
  }

}