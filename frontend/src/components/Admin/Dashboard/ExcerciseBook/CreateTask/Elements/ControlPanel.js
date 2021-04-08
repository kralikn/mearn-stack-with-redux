import { Button } from 'react-bootstrap';

const ControlPanel = ({handleAddTaskIdosoros, handleAddEvent}) => {
  return (
    <div className="control-panel">
      <div className="control-panel-header">
        <p>elemek hozzáadása</p>
      </div>
      <div className="control-panel-button-group">
        <Button
          size="sm"
          variant="success"
          onClick={handleAddTaskIdosoros}
        >
          idősoros könyvelés
        </Button>
        <Button
          size="sm"
          variant="success"
          onClick={handleAddEvent}
        >
          gazdasági esemény
        </Button>
      </div>
    </div>
  )
}

export default ControlPanel
