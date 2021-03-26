import { Form, Button, Row, Container } from 'react-bootstrap';
import { useRef, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';

const UserRegister = (props) => {

  const [errors, setErrors] = useState({})

  const refNameInput = useRef(null);
  const refPasswordInput = useRef(null);
  const refPassword2Input = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      [refNameInput.current.name]: refNameInput.current.value,
      [refPasswordInput.current.name]: refPasswordInput.current.value,
      [refPassword2Input.current.name]: refPassword2Input.current.value
    }
    
    axios.post('/register', newUser)
    .then(res => {
      console.log(res.data)
      
      //------------------------------------------------
      setErrors({})
      refNameInput.current.value = "";
      refPasswordInput.current.value = "";
      refPassword2Input.current.value = ""
      //------------------------------------------------

      props.history.push('/login')

      })
      .catch(err => {
        setErrors(err.response.data)
      })
      
    }
    
  const {name, password, password2} = errors;

  return (
     <Container>
      <Row className="row justify-content-center mt-5">
        <Form className="col-4">
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

export default UserRegister
