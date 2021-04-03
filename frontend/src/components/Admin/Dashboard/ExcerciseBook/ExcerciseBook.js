import './ExerciseBook.scss'
import { useDispatch, useSelector } from "react-redux"
import { Spinner,Button, Modal, Form, Row, Col } from 'react-bootstrap';
import AdminTopic from './Topics/AdminTopic'
import { useRef, useState } from 'react';
import classNames from 'classnames';
import { postTopic, postTask, deleteCurrentTopic, deleteErrors, editPostTopic } from '../../../../redux';
import classnames from 'classnames';

const ExcerciseBook = () => {

  const dispatch = useDispatch()
  const topics = useSelector(state => state.topics)
  const {loading, topicsArr, error, currentTopic} = topics

  const [show, setShow] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTopicUpdatekModal, setShowTopicUpdatekModal] = useState(false);
  const refModalInput = useRef(null);
  const refNewTaskModalInput = useRef(null);
  const refTopicUpdateModalInput = useRef(null);

  const handleShowNewTaskModal = () => setShowNewTaskModal(true);
  const handleCloseNewTaskModal = () => setShowNewTaskModal(false);
  const handleCloseTopicUpdate = () => setShowTopicUpdatekModal(false);
  const handleShowTopicUpdate = () => setShowTopicUpdatekModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateTopic = () => {
   
    dispatch(postTopic({
      // {title: ...}
      [refModalInput.current.name]: refModalInput.current.value
    }))
    refModalInput.current.value = null
    
  }

  const handleCreateTask = (e) => {
    // console.log(e.target.parentElement.parentElement.parentElement.getAttribute("data-topic"))
    dispatch(postTask({
      [refNewTaskModalInput.current.name]: refNewTaskModalInput.current.value,
      id: currentTopic._id
    }))
    refNewTaskModalInput.current.value = null

  }

  const handleUpdateTopicTitle = () => {

    dispatch(editPostTopic({
      [refTopicUpdateModalInput.current.name]: refTopicUpdateModalInput.current.value,
      id: currentTopic._id
    }))
    refTopicUpdateModalInput.current.value = null

  }


  return (
    <>
      <div className="admin-dashboard-container" >
        {loading ? (<Spinner className="spinner" animation="border" variant="info" />) : 
          (
            <>
              <div className="topics-container">
                <div className="topics-container-header">
                  <div className="topics-container-title">Témakörök</div>
                  <Button
                    variant="outline-success"            
                    size="sm"
                    onClick={handleShow}
                  >
                    Témakör hozzáadása
                    {/* <IoAdd /> */}
                  </Button>
                </div>
                {topicsArr.map(topic => {
                  return <AdminTopic
                            key={topic._id}
                            topic={topic}
                            handleShowNewTaskModal={handleShowNewTaskModal}
                            handleShowTopicUpdate={handleShowTopicUpdate}
                          />
                })}
              </div>
            </>
          )
        }
      </div>


      {/* új témakör létrehozása */}
      <Modal
        show={show}
        onHide={() => {
          handleClose()
          dispatch(deleteErrors())
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Új témakör létrehozása</Modal.Title>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Form.Control
              name="title"
              type="text"
              ref={refModalInput}
              placeholder={error ? error.placeholder : null}
              className={classNames(" form-control", {
                "is-invalid": error
              })}
            />
            {error && (<Form.Control.Feedback type="invalid">{error.msg}</Form.Control.Feedback>)}
          </Col>
        </Row>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleCreateTopic}
          >
            Küldés
          </Button>
        </Modal.Footer>
      </Modal>

      {/* új feladat létrehozása */}
      <Modal
        show={showNewTaskModal}
        onHide={() => {
          dispatch(deleteCurrentTopic())
          handleCloseNewTaskModal()
          dispatch(deleteErrors())
        }}
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
              ref={refNewTaskModalInput}
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
            onClick={handleCreateTask}
          >
            Küldés
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* témakör átnevezése */}
      <Modal
        show={showTopicUpdatekModal}
        onHide={() => {
          dispatch(deleteCurrentTopic())
          handleCloseTopicUpdate()
          dispatch(deleteErrors())
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Témakör átnevezése</Modal.Title>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Form.Control
              name="title"
              type="text"
              ref={refTopicUpdateModalInput}
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
            onClick={handleUpdateTopicTitle}           
          >
            Frissítés
          </Button>
        </Modal.Footer>
      </Modal>

      

    </>
  )
}

export default ExcerciseBook
