
import React, { useState } from 'react';
import './ToDoListComponent.css';

function ToDoListComponent() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, index) => 
      index === currentTaskIndex ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <div className='input-container'>
        <input
          type="text"
          placeholder="Enter a Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className='add' onClick={isEditing ? updateTask : addTask}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="list">
        {tasks.map((task, index) => (
          <li key={index} className='item'>
            <div
              className="text"
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(index)}
            >
              {task.text}
            </div>
            <div className="action">
              <button className="edit" onClick={() => editTask(index)}>Edit</button>
              <button className="remove" onClick={() => removeTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoListComponent;