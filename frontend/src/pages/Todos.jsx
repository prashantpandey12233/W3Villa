import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (!title) return;
    try {
      await axios.post("http://localhost:5000/todos", { title }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, { title: editText }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">📋 Your Todos</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="New Todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn btn-success" onClick={addTodo}>Add</button>
        </div>
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              {editingId === todo.id ? (
                <>
                  <input type="text" className="form-control" value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button className="btn btn-primary btn-sm ms-2" onClick={() => saveEdit(todo.id)}>💾</button>
                </>
              ) : (
                <>
                  <span>{todo.title}</span>
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => editTodo(todo.id, todo.title)}>✏</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>❌</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <button className="btn btn-danger w-100 mt-3" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
      </div>
    </div>
  );
};

export default Todos;
