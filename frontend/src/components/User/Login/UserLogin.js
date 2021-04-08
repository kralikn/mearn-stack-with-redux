import { Form, Button, Row, Container } from 'react-bootstrap';
import { useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../../redux';

import classnames from 'classnames';


const UserLogin = (props) => {

  const errors = useSelector(state => state.currentUser.error)
  const dispatch = useDispatch()

  const refNameInput = useRef(null);
  const refPasswordInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      [refNameInput.current.name]: refNameInput.current.value,
      [refPasswordInput.current.name]: refPasswordInput.current.value,
    }

    dispatch(setCurrentUser(user, props.history))

  }
    
  const {name, password} = errors;
  return (
    <Container>
      <Row className="row justify-content-center mt-5">
        <Form className="col-sm-8 col-md-6 col-lg-4">
          <Form.Group>
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control type="name" name="name" ref={refNameInput} className={classnames(" form-control", {
              "is-invalid": name
            })}/>
            {name && (<Form.Control.Feedback type="invalid">{name}</Form.Control.Feedback>)}
          </Form.Group>
          <Form.Group>
            <Form.Label>Jelszó</Form.Label>
            <Form.Control type="password" name="password" ref={refPasswordInput} className={classnames(" form-control", {
              "is-invalid": password
            })}/>
            {password && (<Form.Control.Feedback type="invalid">{password}</Form.Control.Feedback>)}
          </Form.Group>
          <Button variant="info" type="submit" onClick={handleSubmit}>
            Belépés
          </Button>
        </Form>
      </Row>
     </Container>
  )
}

export default UserLogin
