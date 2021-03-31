import { ListGroup, ButtonGroup, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiOutlineMore } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import classnames from 'classnames';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, postTask } from '../../../../../redux';


const AdminTask = ({task}) => {

  const [show, setShow] = useState(false);
  const refModalInput = useRef(null);

const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const {error} = topics

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteTask = (e) => {

    let topicAndTaskId = {
      taskid: e.target.parentElement.parentElement.parentElement.getAttribute("data-task"),
      topicid: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")
    }

    dispatch(deleteTask(topicAndTaskId))

  }

  const handleUpdateTask = (e) => {

    let topicAndTaskId = {
      taskid: e.target.parentElement.parentElement.parentElement.getAttribute("data-task"),
      topicid: e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-topic")
    }

    console.log(topicAndTaskId)

    dispatch(postTask(topicAndTaskId))

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
            >
              <AiOutlineMore />
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm"> 
          {/* itt szerkeszteni tudjuk  ---- link */}           
            <Button
              variant="success"
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
    </>
  )
}

export default AdminTask
