import { Spinner, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiOutlineMore } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import './AdminTopics.scss'

import { useSelector, useDispatch } from 'react-redux';
import { postTopic, deleteTopic, deleteErrors, editPostTopic } from '../../../../redux';
import { useState, useRef } from 'react';
import NewModal from '../Modals/NewModal';
import EditModal from '../Modals/EditModal';


const AdminTopics = () => {

  const refTopicInput = useRef(null);
  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const {loading, topicsArr, error} = topics

  //newModal
  const [showNewModal, setShowNewModal] = useState(false);
  const handleShowNewModal = () => setShowNewModal(true);
  
  //editModal
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const [editTopic, setEditTopic] = useState({
    title: null,
    id: null
  });

  const handleDeleteTopic = (e) => {

    let topicId = { id: e.target.parentElement.parentElement.parentElement.getAttribute("data-topic-id")}
    dispatch(deleteTopic(topicId))
    
  }

  const handleEditTopic = (e) => {

    let topicId = e.target.parentElement.parentElement.parentElement.getAttribute("data-topic-id")
    let topic = e.target.parentElement.parentElement.parentElement.textContent;
    setEditTopic({title: topic, id: topicId})

  }

  // console.log(editTopic)

  let topicsContent;

  // if(loading && topicsArr === null){
  if(loading){
    topicsContent = <Spinner animation="border" variant="info" />
  }else if (!loading && topicsArr === null && error !== "") {
    topicsContent = <h4>hozz létre egy témakört</h4>
  } else {
    topicsContent = (
      <ListGroup>
        <ListGroup.Item variant="light">
          <h5>Témakörök</h5>
          <Button variant="outline-success" onClick={handleShowNewModal} size="sm"><IoAdd /></Button>
        </ListGroup.Item>
        {topicsArr.map((topic) => {
          return (<ListGroup.Item key={topic._id} data-topic-id={topic._id} variant="light">
              {topic.title}
              <div className="btn-container">
                <Button variant="info" size="sm" className="first-btn"><AiOutlineMore /></Button>
                <ButtonGroup size="sm">
                  <Button onClick={(e) => {
                    handleEditTopic(e)
                    handleShowEditModal()
                  }} variant="success"><AiFillEdit /></Button>
                  <Button onClick={handleDeleteTopic}variant="danger"><AiFillDelete /></Button>
                </ButtonGroup>
              </div>
            </ListGroup.Item>)
        })}
      </ListGroup>
    )
  }

  return (
    <div className="admin-dashboard-container" >
      <div className="topics-container">
        <div className="topics">
          {topicsContent}
          <NewModal
            setShowNewModal={setShowNewModal}
            showNewModal={showNewModal}
            refTopicInput={refTopicInput}
            dispatch={dispatch}
            postTopic={postTopic}
            deleteErrors={deleteErrors}
            error={error}
            loading={loading}
            />
          <EditModal
            // handleEditTopic={handleEditTopic}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
            refTopicInput={refTopicInput}
            dispatch={dispatch}
            postTopic={postTopic} 
            editTopic={editTopic}         
            editPostTopic={editPostTopic}
          />
        </div>
        {/* <div className="tasks">
          <h3>tasks</h3>
        </div>
        <div className="task-form-container">
          <h3>tasks form</h3>
        </div> */}
      </div>
    </div>
  )
}

export default AdminTopics
