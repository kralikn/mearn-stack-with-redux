import { Button, Modal, Form, Col, Row } from 'react-bootstrap';


const EditModal = ({setShowEditModal, showEditModal, refTopicInput, dispatch, postTopic, handleEditTopic, editTopic, editPostTopic}) => {

  const handleClose = () => setShowEditModal(false);

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
            ref={refTopicInput}
            placeholder={editTopic.title}
          />
        </Col>
      </Row>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Mégsem
        </Button> */}
        <Button
          variant="success"
          onClick={() => {
            dispatch(editPostTopic({
              title: refTopicInput.current.value,
              id: editTopic.id
            }))
            refTopicInput.current.value = null
            editTopic.title = null
        }}
        >
          Frissítés
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal