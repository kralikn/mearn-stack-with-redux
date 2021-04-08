import './AdminDashboard.scss';
import jwt_decode from 'jwt-decode';

const AdminDashboard = (props) => {

  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    if(!decoded.isAdmin) {
       props.history.push('/dashboard/user');
    }
  }

  return (
    <div className="admin-dashboard-container">
      <h3>kezdő admin dashboard</h3>
    </div>
  )
}

export default AdminDashboard
