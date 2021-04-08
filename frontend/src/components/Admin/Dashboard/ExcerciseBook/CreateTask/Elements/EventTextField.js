import { Button } from 'react-bootstrap';
import { IoAddOutline } from "react-icons/io5";
import { AiFillDelete } from 'react-icons/ai';

const EventTextField = ({ formData, event, index, handleChangeEvents, handleAddEvent, handleRemoveEvent }) => {
  return (
    <div className="event-box">
      <div className="custom-form-group ">
        <label className="form-label">{index + 1}. gazdasági esemény</label>
        <textarea
          className="custom-input"
          type="text"
          rows={3}
          value={event.text}
          name="event"
          onChange={(e) => {
            handleChangeEvents(e, index)
          }}
        />
      </div>
      <div className="button-group">
        {formData.events.length - 1 === index && <Button
          size="sm"
          variant="success"
          onClick={handleAddEvent}
        >
          <IoAddOutline />
        </Button>}
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleRemoveEvent(index)}
        >
          <AiFillDelete />
        </Button>
        {/* {formData.events.length !== 1 && <Button
          size="sm"
          variant="danger"
          onClick={() => handleRemoveEvent(index)}
        >
          <AiFillDelete />
        </Button>} */}
      </div>
    </div>
  )
}

export default EventTextField
