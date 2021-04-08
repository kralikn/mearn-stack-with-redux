import jwt_decode from 'jwt-decode';

const UserDashboard = (props) => {

  console.log(props.history)
  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    if(decoded.isAdmin) {
       props.history.push('/dashboard/admin');
    }
  }

  return(
    <div>
      <h1>user dashboard</h1>
    </div>
  )
}

export default UserDashboard
