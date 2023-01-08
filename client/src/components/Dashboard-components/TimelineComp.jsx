import React, { useEffect } from 'react'
import NewUserCreated from './Activites/NewUserCreated';
import UserUpdated from './Activites/UserUpdated';
import DeleteAccount from './Activites/DeleteAccount'
import NewProjectCreated from './Activites/NewProjectCreated'
import DeleteProject from './Activites/DeleteProject'
import NewBugCreated from './Activites/NewBugCreated'
import BugUpdated from './Activites/BugUpdated'
import DeleteBug from './Activites/DeleteBug'
import ResolveBug from './Activites/ResolveBug'
import Preloader from './Preloader';
import ReOpenBug from './Activites/ReOpenBug';
import CreateComment from './Activites/CreateComment';


function TimelineComp({ Activites, loader,setLoader,setDocumentCount,setTotalPages }) {

    return (
        <>
            {
                loader ? (
                    <Preloader />
                ) : (
                    <ol className="relative border-l-2px border-white w-[80%] mx-auto">
                        {
                            Activites.map((activity, index) => {
                                switch (activity.activityType) {
                                    case "newUserCreated":
                                        return <NewUserCreated activity={activity} />
                                    case "userUpdated":
                                        return <UserUpdated activity={activity} />
                                    case "deleteAccount":
                                        return <DeleteAccount activity={activity} />
                                    case "newProjectCreated":
                                        return <NewProjectCreated activity={activity} />
                                    case "deleteProject":
                                        return <DeleteProject activity={activity} />
                                    case "newBugCreated":
                                        return <NewBugCreated activity={activity} />
                                    case "bugUpdated":
                                        return <BugUpdated activity={activity} />
                                    case "deleteBug":
                                        return <DeleteBug activity={activity} />
                                    case "resolveBug":
                                        return <ResolveBug setLoader={setLoader} setTotalPages={setTotalPages}  setDocumentCount={setDocumentCount} activity={activity} />
                                    case "reOpenBug":
                                        return <ReOpenBug activity={activity} />
                                    case "comment":
                                        return <CreateComment activity={activity} />
                                    case "reply":
                                        return <CreateComment activity={activity} />
                                }
                            })
                        }
                    </ol>
                )
            }
        </>

    )
}

export default TimelineComp