import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import { ThemeContext } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

const url="https://todo-back-backend-921136495216.southamerica-west1.run.app"

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(`${url}/api/todos`);
    setTodos(response.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text) return;
    
    const response = await axios.post(`${url}/api/todos`, { text });
    setTodos([response.data, ...todos]);
    setText('');
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    const response = await axios.put(`${url}/api/todos/${id}`, {
      completed: !todo.completed
    });
    
    setTodos(todos.map(t => t._id === id ? response.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${url}/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
    <div className="App">
      <ThemeToggle />
      <h1>📄 Reminder app</h1>
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
  </div>
  );
}

export default App;
