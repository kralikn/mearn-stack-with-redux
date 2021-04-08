import './CreateTask.scss';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import TextAreaFieldGroup from './Elements/TextAreaFieldGroup';
// import { addEvent } from '../../../../../redux'
// import { v4 as uuidv4 } from 'uuid';
// import { nanoid } from 'nanoid'
import { postTask } from '../../../../../redux';
import ControlPanel from './Elements/ControlPanel';
import EventTextField from './Elements/EventTextField';
import CustomTable from './Elements/CustomTable';


const CreateTask = () => {

  const dispatch = useDispatch()

  const currentTopic = useSelector(state => state.topics.currentTopic)
  const currentTask = useSelector(state => state.topics.currentTask)
  const [formData, setFormData] = useState({
    topicid: currentTopic._id,
    taskid: currentTask._id,
    title: currentTask.title,
    text: '',
    events: [],
    tasks: []
  })

  // if(currentTask.text !== ''){
  //   const newFormData = {...formData}
  //   formData.text = currentTask.text
  //   setFormData(newFormData)
  // }
  // if(currentTask.events.length > 0) {
  //   const newFormData = {...formData}
  //   // const eventList = [...formData.events]
  //   newFormData.events = currentTask.events
  //   setFormData({...formData})

  // }

  useEffect(() => {
    if(localStorage.currentTaskFormData){
      setFormData(JSON.parse(localStorage.currentTaskFormData))
    }

    if(currentTask.events.length > 0) {
      const newFormData = {...formData}
      currentTask.events.map(event => {
        newFormData.events.push(event)
      })
      setFormData({...formData})
    }

    if(currentTask.tasks.length > 0) {
      const newFormData = {...formData}
      currentTask.tasks.map(task => {
        newFormData.tasks.push(task)
      })
      setFormData({...formData})
    }

    if(currentTask.text !== ''){
      const newFormData = {...formData}
      newFormData.text = currentTask.text
      setFormData(newFormData)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('currentTaskFormData', JSON.stringify(formData));
  }, [formData])

  const handleChangeEvents = (e, index) => {
    const eventList = [...formData.events]
    eventList[index].text = e.target.value
    setFormData({...formData})
  }

  const handleChangeRow = (e, task, row, index) => {
    const newTask = {...task}
    newTask.rows[index][e.target.name] = e.target.value
    setFormData({...formData})
  }

  const handleChangeIdosorosText = (e, index) => {
    const taskList = [...formData.tasks]
    taskList[index].text = e.target.value
    setFormData({...formData})
  }

  const handleAddEvent = () => {
    const newFormData = {...formData}
    // formData.events.push({value: ''})
    formData.events.push({text: ''})
    setFormData(newFormData)
  }

  const handleAddTaskIdosoros = () => {
    const newFormData = {...formData}
    newFormData.tasks.push({type: 'idosoros', text: '', rows: [
      {ssz:'', megnevezes: '', tartozik: '', kovetel: '', amount: ''}
    ]})
    setFormData(newFormData)
  }

  const handleAddRow = (task) => {
    const newTask = task
    newTask.rows.push({ssz:'', megnevezes: '', tartozik: '', kovetel: '', amount: ''})
    const newFormData = {...formData}
    setFormData(newFormData)
  }

  const handleRemoveTaskIdosoros = (index) => {
    let newFormData = {...formData}
    newFormData.tasks.splice(index, 1)
    setFormData(newFormData)
  }

  const handleRemoveEvent = (index) => {
    const newFormData = {...formData}
    newFormData.events.splice(index, 1)
    setFormData(newFormData)
  }

  const handleRemoveRow = (task, index) => {
    const newTask = task
    const newFormData = {...formData}
    newTask.rows.splice(index, 1)
    setFormData(newFormData)
  }

  const handleLocalStorage = () => {
    localStorage.removeItem('currentTaskFormData');
  }

  const handleSubmitTask = () => {
    dispatch(postTask(formData))
  }

  return (
    <div className="task-editor-container">
      <Link 
        onClick={handleLocalStorage}
        to='/dashboard/admin/excercises'
        variant="info"
        className="custom-link"
      >
        Vissza
      </Link>
      <div className="editor">
        <div className="editor-form">
          <div className="custom-form-group">
            <label className="form-label">feladat címe</label>
            <input
              className="custom-input"
              name="title"
              type="text"
              value={currentTask.title}
              disabled 
            />
          </div>
          <div className="custom-form-group">
            <label className="form-label">feladat szövege</label>
            <textarea
              className="custom-input"
              rows={3}
              name="text"
              value={formData.text}
              type="text"
              onChange={(e) => {
                setFormData({...formData, [e.target.name]: e.target.value})
              }}
            />
          </div>
           
          {formData.events.map((event, index) => {

            return (
              <EventTextField
                event={event}
                index={index}
                formData={formData}
                handleChangeEvents={handleChangeEvents}
                handleAddEvent={handleAddEvent}
                handleRemoveEvent={handleRemoveEvent}
              />
            )
          })}

          <div className="custom-form-group">
            {formData.tasks.map((task, index) => {
              if(task.type === "idosoros"){
                return (
                  <CustomTable 
                    task={task}
                    index={index}
                    handleChangeIdosorosText={handleChangeIdosorosText}
                    handleChangeRow={handleChangeRow}
                    handleAddRow={handleAddRow}
                    handleRemoveRow={handleRemoveRow}
                    handleRemoveTaskIdosoros={handleRemoveTaskIdosoros}
                  />
                )
              }
            })}
          </div>

          <ControlPanel
            handleAddTaskIdosoros={handleAddTaskIdosoros}
            handleAddEvent={handleAddEvent}
          />

          <Button
            variant="danger"
            onClick={handleSubmitTask}
          >
            Küldés
          </Button>
          </div>
        </div>
      <div className="showcase editor-dashboard">
        <div className="showcase-header">
          <h4 className="showcase-header-title">{currentTask.title}</h4>
        </div>
        <div className="showcase-content">
          <div className="showcase-content-title">
            <p>{formData.text}</p>
          </div>
          <div className="showcase-content-events">
            <ol>
              {formData.events.map(event => {
                return <li>{event.text}</li>
              })}
            </ol>
          </div>
          {formData.tasks.length > 0 && <p>Feladatok:</p>}
          <div className="showcase-content-tasks">
            <ol className="showcase-task-list">
              {formData.tasks.map(task => {
                return (
                  <li>
                    <p>{task.text}</p>
                    {task.type === 'idosoros' && task.value !== '' &&
                      <div className="showcase-idosoros-table">
                        <div className="custom-table-header">
                          <div>Ssz.</div>
                          <div>Gazdasági esemény megnevezése</div>
                          <div>Tartozik</div>
                          <div>Követel</div>
                          <div>Összeg</div>
                        </div>
                        {task.rows.map(row => {
                          return (
                            <div className="custom-table-row">
                              <div>
                                {row.ssz}
                              </div>
                              <div>
                                {row.megnevezes}
                              </div>
                              <div>
                                {row.tartozik}
                              </div>
                              <div>
                                {row.kovetel}
                              </div>
                              <div>
                                {row.amount}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    }
                  </li>
                )
              })}
            </ol>
          </div>
      </div>
{/*     
      <pre>
          {JSON.stringify(formData, null, 2)}
      </pre> */}


    </div>
    </div>
  )
}

export default CreateTask
