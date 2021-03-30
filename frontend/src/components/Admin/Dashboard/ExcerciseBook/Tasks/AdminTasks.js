import './AdminTasks.scss';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import NewModal from '../Modals/NewModal';


const AdminTasks = ({showTasksList, modalData, setModalData}) => {

  // const refTopicInput = useRef(null);
  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const { loading, topicsArr, currentTopic, error} = topics

  //newModal
  const [showNewModal, setShowNewModal] = useState(false);
  const handleShowNewModal = () => setShowNewModal(true);
  

  let tasksContent;

  // if(loading){
  //   tasksContent = <Spinner className="spinner" animation="border" variant="info" />
  // } else if(!loading && topicsArr.length === 0 && error === null){
  //   tasksContent = (
  //     <ListGroup>
  //       <ListGroup.Item variant="light">
  //         <h5>Feladatok <span className="topics-tasks">{currentTopic && topicsArr.length > 0 ? `- ${currentTopic.title}` : null}</span></h5>
  //       </ListGroup.Item>
  //     </ListGroup>
  //   )
  // } else {
    tasksContent = (
      <ListGroup>
        <ListGroup.Item variant="light">
          <h5>Feladatok <span className="topics-tasks">{currentTopic && topicsArr.length > 0 ? `- ${currentTopic.title}` : null}</span></h5>
          {currentTopic && topicsArr.length > 0 ? (<Button
            variant="outline-success"
            // onClick={handleShowNewModal}
            onClick={() => {
                handleShowNewModal()
                setModalData({...modalData, title: "Add meg az új feladat címét", dispatch: "task"})
              }}
            size="sm"
          >
            <IoAdd />
          </Button>) : null}
        </ListGroup.Item>
      </ListGroup>
    )
  // }


  return (
    <div className="tasks">
      {tasksContent}
      <NewModal
        modalData={modalData}
        setShowNewModal={setShowNewModal}
        showNewModal={showNewModal}
        dispatch={dispatch}
        />
    </div>
  )
}

export default AdminTasks
