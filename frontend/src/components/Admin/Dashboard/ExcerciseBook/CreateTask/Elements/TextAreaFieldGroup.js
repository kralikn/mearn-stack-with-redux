import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEventValue } from '../../../../../../redux'

const TextAreaFieldGroup = ({ setTeszt, teszt, key, event, handleChange, events, setEvents, i }) => {

  // const handleChange = (e, index) => {
  //   const { name, value } = e.target
  //   console.log(name, value)
  //   const eventList = [...events]
  //   console.log(eventList[index][name])
  //   console.log(index)
  //   eventList[index][name] = value
  //   setEvents(...events, events[index][name] = value)

  //   setEvents(event)
  // }
  console.log(event.value)
  return (
    <>
      <Form.Group>
        <Form.Label>gazdasági esemény</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="event"
          type="text"
          value={event.value}
          onChange={(e) => handleChange(e, i)}
        />
      </Form.Group>
    </>
  )
}

export default TextAreaFieldGroup
