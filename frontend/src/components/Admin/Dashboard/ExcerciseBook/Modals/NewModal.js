import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import { useRef } from 'react';


const NewModal = ({
  setShowNewModal,
  showNewModal,
  dispatch,
  postTopic,
  postTask,
  error,
  loading,
  deleteErrors,
  modalData
}) => {

  const refModalInput = useRef(null);

  const handleClose = () => {
    // dispatch(deleteErrors())
    setShowNewModal(false)
  };

  return (
    <Modal
      show={showNewModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {modalData.title ? modalData.title : null}
        </Modal.Title>
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
          onClick={() => {
            if(modalData.dispatch === "topic"){
              dispatch(postTopic({
                [refModalInput.current.name]: refModalInput.current.value
              }))
              refModalInput.current.value = null
            }else if (modalData.dispatch === "task"){
              dispatch(postTask({
                [refModalInput.current.name]: refModalInput.current.value
              }))
              refModalInput.current.value = null
            }
        }}
        >
          Küldés
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewModal
