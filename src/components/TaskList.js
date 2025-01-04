import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import '../Styles/TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTaskObj = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const submitEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditingText('');
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitEdit();
    }
  };

  return (
    <div className="task-container">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks available. Add a task to get started!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              startEditing={startEditing}
              editingTask={editingTask}
              editingText={editingText}
              setEditingText={setEditingText}
              submitEdit={submitEdit}
              handleEditKeyPress={handleEditKeyPress}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
