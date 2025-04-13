import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text) return;
    
    const response = await axios.post('http://localhost:5000/api/todos', { text });
    setTodos([response.data, ...todos]);
    setText('');
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
      completed: !todo.completed
    });
    
    setTodos(todos.map(t => t._id === id ? response.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>
      
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
