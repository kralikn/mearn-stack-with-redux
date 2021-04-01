import './EditTask.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const EditTask = () => {

  const dispatch = useDispatch()
  const currentTopic = useSelector(state => state.topics.currentTopic)
  const currentTask = useSelector(state => state.topics.currentTask)
  console.log(currentTopic)
  console.log(currentTask)

  if(!currentTopic){
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Link 
        to='/dashboard/admin/excercises'
      >
        Vissza
      </Link>
      <h1>{currentTopic.title}</h1>
      <h1>{currentTask.title}</h1>
    </div>
  )
}

export default EditTask
