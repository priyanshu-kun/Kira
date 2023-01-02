import React, { useEffect } from 'react'
import Pagination from './Pagination'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { fetchTimelineActivites } from '../../http';
import TimelineComp from './TimelineComp';
import {setTimelineActivites} from "../../store/timeline.slice"
import {useDispatch,useSelector} from "react-redux"

function MainTimeline() {

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 6
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [documentCount, setDocumentCount] = useState(0)
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()
  const {activites: activitesFromStore} = useSelector(state => state.timeline)


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


  function handleSetPagination(prev) {
    if (prev) {
      setPage(prev => prev - 1)
      if (page < 1) {
        return;
      }
      setPagination(prev => {
        return {
          ...prev,
          skip: prev.skip - 6
        }
      })
    }
    else {
      setPage(prev => prev + 1)
      if (page > totalPages) {
        return;
      }
      setPagination(prev => {
        return {
          ...prev,
          skip: prev.skip + 6
        }
      })
    }
  }


  return (
    <div className='pb-20 pt-32'>
      <TimelineComp Activites={activitesFromStore} loader={loader} setLoader={setLoader} setTotalPages={setTotalPages}  setDocumentCount={setDocumentCount} />
      {
        loader === false && (
          <Pagination handleSetPagination={handleSetPagination} documentCount={documentCount} pagination={pagination} page={page} totalPages={totalPages} />
        )
      }
    </div>
  )
}

export default MainTimeline