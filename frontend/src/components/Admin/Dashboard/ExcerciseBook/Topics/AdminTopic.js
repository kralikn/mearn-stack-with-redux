import './AdminTopics.scss';
import { ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import AdminTask from '../Tasks/AdminTask';
import { useRef, useState } from 'react';
// import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { deleteTopic, setCurrentTopic } from '../../../../../redux';


const AdminTopic = ({topic, handleShowNewTaskModal, handleShowTopicUpdate, handleShowTaskUpdate}) => {

  const dispatch = useDispatch()
  // const topics = useSelector(state => state.topics)
  
  const handleDeleteTopic = (e) => {

    let topicId = { id: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")}
    dispatch(deleteTopic(topicId))

  }
      
  return (
    <>
      <ListGroup data-topic={topic._id}>
        <ListGroup.Item className="topic-header">
          <div className="topic-title">
            <div>{topic.title}</div>
          </div>
          <div className="topic button-group">
            <Button
              variant="outline-success"
              size="sm"
              className="first-btn"
              onClick={(e) =>{
                handleShowNewTaskModal()
                dispatch(setCurrentTopic({id: e.target.parentElement.parentElement.parentElement.getAttribute("data-topic")}))
              }}
            >
              Feladat hozzáadása
            </Button>

            <ButtonGroup size="sm">
              <Button
                variant="success"
                onClick={(e)=> {
                  handleShowTopicUpdate()
                  dispatch(setCurrentTopic({id: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")}))
                }}
              >
                <AiFillEdit />
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteTopic}
              >
                <AiFillDelete />
              </Button>
            </ButtonGroup>
          </div>
        </ListGroup.Item>
        {topic.tasks.map(task => {
          return <AdminTask 
                    key={task._id}
                    task={task}
                    handleShowTaskUpdate={handleShowTaskUpdate}
                  />
        })}
      </ListGroup>
    </>
  )
}

export default AdminTopic
