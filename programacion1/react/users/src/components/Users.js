import React, { useState, useRef } from "react";

const usuarios = [
  {
    id: 1,
    name: 'John',
    email: 'john@john.com',
    password: '1234',
  },
  {
    id: 2,
    name: 'Jane',
    email: 'jane@jane.com',
    password: '2345',
  },
];

export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const [lastId, setLastId] = useState(0);

  const nameInput = useRef(null);

  let [users, setUsers] = useState(usuarios);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editing) {
      const nuevo = {
        id: lastId + 1,
        name,
        email,
        password,
      };
      users.push(nuevo);
      setUsers(users);
    } else {
      const nuevo = {
        id,
        name,
        email,
        password,
      };
      users = users.map((usuario) => {
        if (usuario.id === id) {
          return nuevo;
        } else {
          return usuario;
        }
      })
      setUsers(users);
      setEditing(false);
      setId("");
    }
    getUsers();

    setName("");
    setEmail("");
    setPassword("");
    nameInput.current.focus();
  };

  const getUsers = () => {
    let lastId = 0;
    users.map((usuario) => {
      if (usuario.id > lastId) {
        lastId = usuario.id;
      }
      return usuario;
    })
    setUsers(users);
    setLastId(lastId);
  };

  const deleteUser = (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      users = users.filter((usuario) => usuario.id !== id);
      setUsers(users);
      getUsers();
    }
  };

  const editUser = (id) => {
    const data = users.find((usuario) => usuario.id === id);

    setEditing(true);
    setId(id);

    // Reset
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    nameInput.current.focus();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="User's Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="User's Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};