import './CreateTask.scss';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import TextAreaFieldGroup from './Elements/TextAreaFieldGroup';
// import { addEvent } from '../../../../../redux'
import { IoAddOutline } from "react-icons/io5";
import { AiFillDelete } from 'react-icons/ai';
// import { v4 as uuidv4 } from 'uuid';
// import { nanoid } from 'nanoid'
import { postTask } from '../../../../../redux';


const CreateTask = () => {

  const dispatch = useDispatch()

  const currentTopic = useSelector(state => state.topics.currentTopic)
  const currentTask = useSelector(state => state.topics.currentTask)
  // console.log(currentTask._id)
  const [formData, setFormData] = useState({
    topicid: currentTopic._id,
    taskid: currentTask._id,
    title: currentTask.title,
    text: '',
    events: [
      {text: ''}
    ],
    tasks: []
  })
  // console.log(formData)

  useEffect(() => {
    if(localStorage.currentTaskFormData){
      setFormData(JSON.parse(localStorage.currentTaskFormData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('currentTaskFormData', JSON.stringify(formData));
  }, [formData])

  // console.log(formData)
  // console.log(localStorage.currentTaskFormData)

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
    // newFormData.tasks[newFormData.tasks.findIndex(task => task.type === 'idosoros')].rows.push({ssz:'', megnevezes: '', tartozik: '', kovetel: '', amount: ''})
    setFormData(newFormData)
  }

  // const handleAddTaskMerlegertek = () => {
  //   const newFormData = {...formData}
  //   formData.tasks.push({type: "merlegertek", value: ''})
  //   setFormData(newFormData)
  // }

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
    // console.log(formData)
    dispatch(postTask(formData))
  }

  // if(!currentTopic){
  //   return <h1>Loading...</h1>
  // }

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
        {/* <div className="editor-header">
          <h4 className="editor-header-title">{currentTopic.title}<span> - {currentTask.title}</span></h4>
        </div> */}
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
              <>
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
                    {formData.events.length !== 1 && <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveEvent(index)}
                    >
                      <AiFillDelete />
                    </Button>}
                  </div>
                </div>
              </>
            )
          })}
          <div className="custom-form-group">
          {/* <label className="form-label">feladat: </label> */}
          {formData.tasks.map((task, index) => {
            if(task.type === "idosoros"){
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
                      <div>Ssz.</div>
                      <div>Gazdasági esemény megnevezése</div>
                      <div>Tartozik</div>
                      <div>Követel</div>
                      <div>Összeg</div>
                    </div>
                    {task.rows.map((row, index) => {
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
                      )})}
                  </div>
                </>
              )
            }
          })}
          </div>
          <div className="custom-form-group">
            <p>feladatok hozzáadása</p>
            <div className="added-button-group">
              <Button
                size="sm"
                variant="success"
                onClick={handleAddTaskIdosoros}
              >
                idősoros könyvelés
              </Button>
              {/* <Button
                size="sm"
                variant="success"
                onClick={handleAddTaskMerlegertek}
              >
                Mérlegérték meghatározása
              </Button> */}
            </div>
              
            {/* </Form> */}
          </div>
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
                      <p>{task.value}</p>
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
      
        {/* <pre>
            {JSON.stringify(formData, null, 2)}
        </pre> */}


      </div>
    </div>
  )
}

export default CreateTask
