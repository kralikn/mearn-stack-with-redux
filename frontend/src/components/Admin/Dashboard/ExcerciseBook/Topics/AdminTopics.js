import { Spinner, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiOutlineMore } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import './AdminTopics.scss';

import { useSelector, useDispatch } from 'react-redux';
import { postTopic, deleteTopic, deleteErrors, editPostTopic, setCurrentTopic, editTopic } from '../../../../../redux';
import { useState } from 'react';
import NewModal from '../Modals/NewModal';
import EditModal from '../Modals/EditModal';


const AdminTopics = ({setShowTasksList, modalData, setModalData}) => {

  // const refTopicInput = useRef(null);
  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const {loading, topicsArr, error} = topics

  //newModal
  const [showNewModal, setShowNewModal] = useState(false);
  const handleShowNewModal = () => setShowNewModal(true);
  
  //editModal
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => setShowEditModal(true);


  const handleDeleteTopic = (e) => {

    let topicId = { id: e.target.parentElement.parentElement.parentElement.getAttribute("data-topic-id")}
    console.log(topicId)
    dispatch(deleteTopic(topicId))

  }
  
  const setEditTopic = (e) => {
    dispatch(editTopic(e.target.parentElement.parentElement.parentElement.getAttribute("data-topic-id")))
  }

  const currentTopic = (e) => {
    dispatch(setCurrentTopic(e.target.parentElement.parentElement.getAttribute("data-topic-id")))
  }

  let topicsContent;

  if(loading){
    topicsContent = <Spinner animation="border" variant="info" />
  }else if (!loading && topicsArr === null && error !== "") {
    topicsContent = <h4>hozz létre egy témakört</h4>
  } else {
    topicsContent = (
      <ListGroup>
        <ListGroup.Item variant="light">
          <h5>Témakörök</h5>
          <Button
            variant="outline-success"
            onClick={() => {
              handleShowNewModal()
              setModalData({...modalData, title: "Add meg az új témakör címét", dispatch: "topic"})
            }}
            size="sm"
          >
            <IoAdd />
          </Button>
        </ListGroup.Item>
        {topicsArr.map((topic) => {
          return (<ListGroup.Item key={topic._id} data-topic-id={topic._id} variant="light">
            {topic.title}
            <div className="btn-container">
              <Button
                variant="info"
                size="sm"
                className="first-btn"
                onClick={(e) => {
                  currentTopic(e)
                }}
              >
                <AiOutlineMore />
              </Button>
              <ButtonGroup size="sm">
                <Button onClick={(e) => {
                  setEditTopic(e)
                  handleShowEditModal()
                }} variant="success"><AiFillEdit /></Button>
                <Button onClick={handleDeleteTopic} variant="danger"><AiFillDelete /></Button>
              </ButtonGroup>
            </div>
          </ListGroup.Item>)
        })}
      </ListGroup>
    )
  }

  return (
    <div className="topics">
      {topicsContent}
      <NewModal
        modalData={modalData}
        setShowNewModal={setShowNewModal}
        showNewModal={showNewModal}
        dispatch={dispatch}
        postTopic={postTopic}
        deleteErrors={deleteErrors}
        error={error}
        loading={loading}
        />
      <EditModal
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        dispatch={dispatch}
        postTopic={postTopic} 
        editTopicFunction={editTopic}         
        editPostTopic={editPostTopic}
      />
    </div>
  )
}

export default AdminTopics
