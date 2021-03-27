import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.currentUser.isAuthenticated)

  return(
    <Route
      {...rest}
      render={props =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin" />
        )
      }
    />
  )
}

export default PrivateRouteAdmin
