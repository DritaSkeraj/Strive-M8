import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import Users from "./UsersComponent"

class MainComponent extends React.Component {
  render() {
    return (
      <Router>
        <h1> Welcome to our app!</h1>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to="/login">Login</Link>
          <Link to="/users">Users</Link>
        </div>
        <Switch>
          <Route path="/login">
            <LoginComponent />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default MainComponent
