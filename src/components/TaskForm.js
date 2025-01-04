import React, { useState } from 'react';
import '../Styles/TaskForm.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="task-input-field"
      />
      <button onClick={handleAddTask} className="task-add-button">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default TaskForm;
