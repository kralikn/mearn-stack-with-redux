import { Form, Button, Row, Container } from 'react-bootstrap';
import { useRef } from 'react';
import classnames from 'classnames';

import { useSelector, useDispatch } from 'react-redux'
import { setRegisterAdmin } from '../../../redux';


const AdminRegister = (props) => {

  const currentUser = useSelector(state => state.currentUser)
  
  if(currentUser.isAuthenticated && currentUser.user.isAdmin){
    props.history.push('/dashboard/admin');
  }else if(currentUser.isAuthenticated && !currentUser.user.isAdmin){
    props.history.push('/dashboard/user');
  }
  
  const errors = useSelector(state => state.registerUser.error)
  const dispatch = useDispatch()

  const refNameInput = useRef(null);
  const refPasswordInput = useRef(null);
  const refPassword2Input = useRef(null);

  const handleSubmit = (e) => {

    e.preventDefault()

    const newAdmin = {
      [refNameInput.current.name]: refNameInput.current.value,
      [refPasswordInput.current.name]: refPasswordInput.current.value,
      [refPassword2Input.current.name]: refPassword2Input.current.value
    }

    dispatch(setRegisterAdmin(newAdmin, props.history))

    }
    
  const {name, password, password2} = errors;

  return (
     <Container>
      <Row className="row justify-content-center mt-5">
        <Form className="col-4">
          <Form.Group>
            <Form.Label>Admin</Form.Label>
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
          <Form.Group>
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control type="password" name="password2" ref={refPassword2Input} className={classnames(" form-control", {
              "is-invalid": password2
            })}/>
            {password2 && (<Form.Control.Feedback type="invalid">{password2}</Form.Control.Feedback>)}
          </Form.Group>
          <Button variant="info" type="submit" onClick={handleSubmit}>
            Regisztráció
          </Button>
        </Form>
      </Row>
     </Container>
  )
}

export default AdminRegister
