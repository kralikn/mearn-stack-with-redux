import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import TableRow from "./TableRow";


const CustomTable = ({
  task,
  index,
  handleChangeIdosorosText,
  handleChangeRow,
  handleAddRow,
  handleRemoveRow,
  handleRemoveTaskIdosoros
 }) => {

  return (
    <>
      <textarea
        className="custom-input"
        // as="textarea"
        rows={3}
        name="task"
        value={task.text}
        type="text"
        onChange={(e) => {
          handleChangeIdosorosText(e, index)
        }}
      />
      <div className="table-box">
        <div className="custom-table-header">
          <div className="header-row">
            <div>Ssz.</div>
            <div>Gazdasági esemény megnevezése</div>
            <div>Tartozik</div>
            <div>Követel</div>
            <div>Összeg</div>
          </div>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              handleRemoveTaskIdosoros(index)
            }}
          >
            <AiOutlineClose />
          </Button>
        </div>
        {task.rows.map((row, index) => {

          return (
            <TableRow
              row={row}
              task={task}
              index={index}
              handleChangeRow={handleChangeRow}
              handleAddRow={handleAddRow}
              handleRemoveRow={handleRemoveRow}
            />
          )})}

      </div> 
    </>
  )
}

export default CustomTable
