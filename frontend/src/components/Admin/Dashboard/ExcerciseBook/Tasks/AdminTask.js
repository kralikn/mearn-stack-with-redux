import { ListGroup, ButtonGroup, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiFillEdit, AiFillDelete, AiOutlineMore } from 'react-icons/ai';
import classnames from 'classnames';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, setCurrentTopic, setCurrentTask, deleteErrors, editPostTask, deleteCurrentTask, deleteCurrentTopic } from '../../../../../redux';

const AdminTask = ({task}) => {

  const history = useHistory()

  const [show, setShow] = useState(false);
  const [showTaskUpdatekModal, setShowTaskUpdatekModal] = useState(false);

  const refModalInput = useRef(null);
  const refTaskUpdateModalInput = useRef(null);

  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const {error, currentTopic, currentTask} = topics

  const handleClose = () => setShow(false);
  const handleShowTaskUpdate = (e) => {
    setShowTaskUpdatekModal(true);

    let topicAndTaskId = {
      taskid: e.target.parentElement.parentElement.parentElement.getAttribute("data-task"),
      topicid: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")
    }

    dispatch(setCurrentTopic({id: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")}))
    dispatch(setCurrentTask(topicAndTaskId))

  }
  const handleCloseTaskUpdate = () => setShowTaskUpdatekModal(false);

  const handleDeleteTask = (e) => {

    let topicAndTaskId = {
      taskid: e.target.parentElement.parentElement.parentElement.getAttribute("data-task"),
      topicid: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")
    }

    dispatch(deleteTask(topicAndTaskId))

  }

  const handleEditTask = (e) => {

    let topicAndTaskId = {
      taskid: e.target.parentElement.parentElement.parentElement.getAttribute("data-task"),
      topicid: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")
    }

    // console.log(topicAndTaskId)

    dispatch(setCurrentTopic({id: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")}))
    dispatch(setCurrentTask(topicAndTaskId))

    history.push(`/dashboard/admin/task`)

  }

  const handleUpdateTask = (e) => {

    let taskData = {
      topicid: currentTopic._id,
      taskid: currentTask._id,
      [refTaskUpdateModalInput.current.name]: refTaskUpdateModalInput.current.value
    }

    dispatch(editPostTask(taskData))

    refTaskUpdateModalInput.current.value = null

  }

  return (
    <>
      <ListGroup.Item data-task={task._id} className="topic-tasks">
        <div className="topic-task-title">
          {task.title}
        </div>
        <div className="task-button-group">
          <ButtonGroup size="sm">
            {/* itt link lesz, ahol meg tudjuk nézni, mint felhasználó ---- link */}
            <Button
              variant="info"
              size="sm"
              className="first-btn"
              onClick={handleEditTask}
            >
              <AiOutlineMore />
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm"> 
          {/* itt szerkeszteni tudjuk  ---- link */}
            <Button
              variant="success"
              onClick={handleShowTaskUpdate}
            >
                <AiFillEdit />
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteTask}
            >
              <AiFillDelete />
            </Button>
          </ButtonGroup>
        </div>
      </ListGroup.Item>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Új feladat létrehozása</Modal.Title>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Form.Control
              name="title"
              type="text"
              ref={refModalInput}
              placeholder={error ? error.placeholder : null}
              className={classnames(" form-control", {
                "is-invalid": error
              })}
            />
            {error && (<Form.Control.Feedback type="invalid">{error.msg}</Form.Control.Feedback>)}
          </Col>
        </Row>
        <Modal.Footer>
          <Button
            variant="success"
          >
            Küldés
          </Button>
        </Modal.Footer>
      </Modal>

      {/* feladat átnevezése */}
      <Modal
        show={showTaskUpdatekModal}
        onHide={() => {
          dispatch(deleteCurrentTopic())
          dispatch(deleteCurrentTask())
          handleCloseTaskUpdate()
          dispatch(deleteErrors())
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Feladat átnevezése</Modal.Title>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Form.Control
              name="title"
              type="text"
              ref={refTaskUpdateModalInput}
              placeholder={error ? error.placeholder : null}
              className={classnames(" form-control", {
                "is-invalid": error
              })}
            />
            {error && (<Form.Control.Feedback type="invalid">{error.msg}</Form.Control.Feedback>)}
          </Col>
        </Row>
        <Modal.Footer>
          <Button
            variant="success" 
            onClick={handleUpdateTask}           
          >
            Frissítés
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminTask
