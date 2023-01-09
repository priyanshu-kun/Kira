import { useEffect, useState } from 'react'
import { fetchTimelineActivites } from '../http'
import { setTimelineActivites } from '../store/timeline.slice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export const useFetchTimelineActivities = (pagination) => {
  const [loader, setLoader] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [documentCount, setDocumentCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        setLoader(true)
        const { data: { data: { count, activites, totalPages } } } = await fetchTimelineActivites(pagination.skip, pagination.limit)
        setTotalPages(totalPages)
        dispatch(setTimelineActivites(activites))
        setDocumentCount(count)
        setLoader(false)
      }
      catch (e) {
        setLoader(false)
        return toast.error("Cannot able to fetch activites.", {
          icon: "😓"
        })
      }
    })()
  }, [pagination])

  return {
    loader,
    totalPages,
    documentCount,
    setLoader,
    setTotalPages,
    setDocumentCount
  }
}
