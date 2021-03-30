import { useState } from "react"
import AdminTasks from "./Tasks/AdminTasks"
import AdminTopics from "./Topics/AdminTopics"


const ExcerciseBook = () => {

  const [modalData, setModalData] = useState({
    title: null,
    dispatch: null
  })


  return (
    <>
      <div className="admin-dashboard-container" >
        <div className="topics-container">
          <AdminTopics
            setModalData={setModalData}
            modalData={modalData}
          />   
          <AdminTasks
            setModalData={setModalData}
            modalData={modalData}
          />
          <div className="task-form-container">
            <h3>tasks form</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExcerciseBook
