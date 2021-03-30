import { useState } from 'react';
import { Button, Modal, Form, Col, Row, Spinner } from 'react-bootstrap';
import classnames from 'classnames';


const NewModal = ({setShowNewModal, showNewModal, refTopicInput, dispatch, postTopic, error, loading, deleteErrors}) => {

  console.log(error)

  const handleClose = () => {
    dispatch(deleteErrors())
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
        <Modal.Title>Add meg az új témakört</Modal.Title>
      </Modal.Header>
      <Row className="justify-content-center">
        <Col className="col-10">
          {/* <Form.Control name="title" type="text" ref={refTopicInput}/> */}
          <Form.Control
            name="title"
            type="text"
            ref={refTopicInput}
            placeholder={error ? error.placeholder : null}
            className={classnames(" form-control", {
              "is-invalid": error
            })}
          />
          {error && (<Form.Control.Feedback type="invalid">{error.msg}</Form.Control.Feedback>)}
        </Col>
      </Row>
      <Modal.Footer>
        {/* <Button onClick={handleClose} variant="secondary">
          Mégsem
        </Button> */}
        <Button
          variant="success"
          onClick={() => {
            dispatch(postTopic({
              [refTopicInput.current.name]: refTopicInput.current.value
            }))
            refTopicInput.current.value = null
        }}
        >
          Küldés
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewModal
