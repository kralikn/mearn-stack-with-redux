import './ExerciseBook.scss'
import { useState } from "react"
import { useSelector } from "react-redux"
import AdminTasks from "./Tasks/AdminTasks"
import AdminTopics from "./Topics/AdminTopics"
import { Spinner, ListGroup, ButtonGroup, Button } from 'react-bootstrap';


const ExcerciseBook = () => {

  const topics = useSelector(state => state.topics)
  const {loading, topicsArr, error} = topics

  const [modalData, setModalData] = useState({
    title: null,
    dispatch: null
  })


  return (
    <>
      <div className="admin-dashboard-container" >
        <div className="topics-container">
          {loading ? (<Spinner className="spinner" animation="border" variant="info" />) : 
            (
              <>
                <AdminTopics
                  setModalData={setModalData}
                  modalData={modalData}
                />   
                <AdminTasks
                  setModalData={setModalData}
                  modalData={modalData}
                />
              </>
            )
          }
        </div>
        <div className="task-form-container">
          <h3>tasks form</h3>
        </div>
      </div>
    </>
  )
}

export default ExcerciseBook
