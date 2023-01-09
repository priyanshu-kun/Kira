import React from 'react'
import Pagination from './Pagination'
import { useState } from 'react'
import TimelineComp from './TimelineComp';
import {useSelector} from "react-redux"
import { useFetchTimelineActivities } from '../../hooks/useFetchTimelineActivities';

function MainTimeline() {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 6
  })
  const [page, setPage] = useState(1)
  const {activites: activitesFromStore} = useSelector(state => state.timeline)
  const {loader,totalPages,documentCount,setLoader,setTotalPages,setDocumentCount} = useFetchTimelineActivities(pagination);

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