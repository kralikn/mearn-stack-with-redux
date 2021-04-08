import { AiFillDelete } from 'react-icons/ai';
import { IoAddOutline } from "react-icons/io5";
import { Button } from 'react-bootstrap';

const TableRow = ({ handleChangeRow, row, task, index, handleAddRow, handleRemoveRow }) => {
  return (
    <div className="table-row">
      <div className="custom-table-row">
        <div>
          <input
            className="table-input"
            type="text"
            name="ssz"
            value={row.ssz}
            onChange={(e) => {
              console.log(e, task, row, index)
              handleChangeRow(e, task, row, index)
            }}
          />
        </div>
        <div>
          <input
            className="table-input"
            type="text"
            name="megnevezes"
            value={row.megnevezes}
            onChange={(e) => {
              handleChangeRow(e, task, row, index)
            }}
          />
        </div>
        <div>
          <input
            className="table-input"
            type="text"
            name="tartozik"
            value={row.tartozik}
            onChange={(e) => {
              handleChangeRow(e, task, row, index)
            }}
          />
        </div>
        <div>
          <input
            className="table-input"
            type="text"
            name="kovetel"
            value={row.kovetel}
            onChange={(e) => {
              handleChangeRow(e, task, row, index)
            }}
          />
        </div>
        <div>
          <input
            className="table-input"
            type="text"
            name="amount"
            value={row.amount}
            onChange={(e) => {
              handleChangeRow(e, task, row, index)
            }}
          />
        </div>
      </div>
      <div className="button-group">
        {task.rows.length - 1 === index && <Button
          size="sm"
          variant="success"
          onClick={() => handleAddRow(task, index)}
        >
          <IoAddOutline />
        </Button>}
        {task.rows.length !== 1 && <Button
          size="sm"
          variant="danger"
          onClick={() => handleRemoveRow(task,index)}
        >
          <AiFillDelete />
        </Button>}
      </div>
    </div>
  )
}

export default TableRow
