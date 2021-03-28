import { Spinner, ListGroup, ButtonGroup, Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiOutlineMore } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import './AdminTopics.scss'

import { useSelector, useDispatch } from 'react-redux';
import { postTopic, deleteTopic } from '../../../../redux';
import { useState, useRef } from 'react';


const AdminTopics = () => {

  const refTopicInput = useRef(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()

  const topics = useSelector(state => state.topics)
  const {loading, topicsArr, error} = topics

  const handleDeleteTopic = (e) => {

    let topicId = { id: e.target.parentElement.parentElement.parentElement.getAttribute("data-topic-id")}
    dispatch(deleteTopic(topicId))
    console.log(topicId);
  }

  let topicsContent;

  if(loading && topicsArr === null){
    topicsContent = <Spinner animation="border" variant="info" />
  }else if (!loading && topicsArr === null && error !== "") {
    topicsContent = <h4>hozz létre egy témakört</h4>
  } else {
    topicsContent = (
      <ListGroup>
        <ListGroup.Item variant="light">
          <h5>Témakörök</h5>
          <Button variant="outline-success" onClick={handleShow} size="sm"><IoAdd /></Button>
        </ListGroup.Item>
        {topicsArr.map((topic) => {
          return (<ListGroup.Item key={topic._id} data-topic-id={topic._id} variant="light">
              {topic.title}
              <div className="btn-container">
                <Button variant="info" size="sm" className="first-btn"><AiOutlineMore /></Button>
                <ButtonGroup size="sm">
                  <Button variant="success"><AiFillEdit /></Button>
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
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add meg az új témakört</Modal.Title>
            </Modal.Header>
            <Row className="justify-content-center">
              <Col className="col-10">
                <Form.Control name="title" type="text" ref={refTopicInput}/>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Mégsem
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  dispatch(postTopic({
                    [refTopicInput.current.name]: refTopicInput.current.value
                  }))
                  handleClose()
              }}
              >
                Létrehozás
              </Button>
            </Modal.Footer>
          </Modal>
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
