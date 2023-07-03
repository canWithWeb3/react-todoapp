import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [todos, setTodos] = useState([])
  const [name, setName] = useState("")
  const [editInputId, setEditInputId] = useState("")
  const [updateName, setUpdateName] = useState("")

  useEffect(() => {
    getTodosLS()
  }, [])

  const getTodosLS = () => {
    const todosLS = JSON.parse(localStorage.getItem("todos"));
    if(todosLS){
      setTodos(todosLS)
    }
  }

  const addTodo = (e) => {
    e.preventDefault()

    if(name){
      const newTodo = { id: uuid(), name: name, completed: false, created_at: new Date() }
  
      setTodos([...todos, newTodo])
      localStorage.setItem("todos", JSON.stringify(todos))
      setName("")
    }
  }

  const toggleComplete = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const updateTodo = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, name: updateName} : todo)
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setEditInputId("")
    setUpdateName("")
  }

  const deleteTodo = (id) => {
    console.log(id)
    const newTodos = todos.filter(todo => todo.id !== id)

    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="col-md-5 mx-auto">
          <div className="card mb-3">
            <div className="card-header">Todos</div>
            <div className="card-body">
              <form onSubmit={addTodo}>
                {/* name */}
                <div className="input-group mb-3">
                  <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" placeholder="Add a todo" />
                  <button className="btn btn-outline-primary" type="submit" id="button-addon2">Button</button>
                </div>
              </form>

              { todos.length > 0 && (
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th style={{ width:"127px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    { todos.map(t => (
                      <tr className={t.completed ? "table-success" : ""} key={t.id}>
                        <td>
                          { editInputId === t.id ? (
                            <input onChange={e => setUpdateName(e.target.value.trim())} value={updateName} className="form-control" type='text' />
                          ) : (
                            t.name
                          ) }  
                        </td>
                        <td>
                          { editInputId !== t.id
                           ? (
                            <>
                             <button 
                               onClick={() => toggleComplete(t.id)} 
                               className="btn btn-success btn-sm me-2"><FontAwesomeIcon icon={faCheck} /></button>
                             <button onClick={() => {setEditInputId(t.id); setUpdateName(t.name)}} className="btn btn-warning btn-sm me-2"><FontAwesomeIcon icon={faEdit} /></button>
                             <button onClick={() => deleteTodo(t.id)} className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                            </>
                           )
                           : (
                            <>
                              <button onClick={e => updateTodo(t.id)} className="btn btn-success btn-sm me-2"><FontAwesomeIcon icon={faEdit} /></button>
                              <button onClick={e => setEditInputId("")} className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTimes} /></button>
                            </>
                           )
                          }
                        </td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              ) }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
