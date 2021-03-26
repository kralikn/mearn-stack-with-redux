import { Form, Button, Row, Container } from 'react-bootstrap';
import { useRef, useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import setAuthToken from '../../utils/setAuthToken';

const UserLogin = (props) => {

  const [errors, setErrors] = useState({})

  const refNameInput = useRef(null);
  const refPasswordInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      [refNameInput.current.name]: refNameInput.current.value,
      [refPasswordInput.current.name]: refPasswordInput.current.value,
    }

    axios.post('/login', user)
      .then(res => {
        console.log(res.data)
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        // setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log(token);
        console.log(decoded);

        // setLogin(true)
        // setDecoded(dec)
        
        //------------------------------------------------
        // if(!isEmpty(errors)){
          setErrors({})
          refNameInput.current.value = "";
          refPasswordInput.current.value = "";
        // }
        //------------------------------------------------
        
        props.history.push('/dashboard')

      })
      .catch(err => {
        setErrors(err.response.data)
        console.log(err.response.data)
      })
      
    }
    
  const {name, password} = errors;


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
          <Button variant="info" type="submit" onClick={handleSubmit}>
            Belépés
          </Button>
        </Form>
      </Row>
     </Container>
  )
}

export default UserLogin
