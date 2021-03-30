import { useRef } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const EditModal = ({setShowEditModal, showEditModal, dispatch,  handleEditTopic, editTopicFunction, editPostTopic}) => {

  const handleClose = () => {
    dispatch(editTopicFunction())
    setShowEditModal(false)
  };

  const refModalInput = useRef(null);

  const topics = useSelector(state => state.topics)
  const { editTopic} = topics


  return (
    <Modal
      show={showEditModal}
      onHide={handleClose}
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
            ref={refModalInput}
            placeholder={editTopic ? editTopic.title : null}
          />
        </Col>
      </Row>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            dispatch(editPostTopic({
              title: refModalInput.current.value,
              id: editTopic._id
            }))
            refModalInput.current.value = null
        }}
        >
          Frissítés
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal