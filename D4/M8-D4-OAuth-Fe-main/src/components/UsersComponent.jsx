import React from "react"
import {useState} from 'react'

const UsersList = (props) => {
  const [users, setUsers] = useState([])
 
  const getUsers = async () => {

  }

  return (
    <div>
      <input type="button" onClick={getUsers} value="get users"></input>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList

