import React from 'react';
import '../Styles/TaskItem.css';
import { faCheckCircle, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TaskItem({
  task,
  toggleTaskCompletion,
  deleteTask,
  startEditing,
  editingTask,
  editingText,
  setEditingText,
  submitEdit,
  handleEditKeyPress,
}) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {editingTask === task.id ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onBlur={submitEdit}
          onKeyPress={handleEditKeyPress}
          autoFocus
          className="task-edit-input"
        />
      ) : (
        <span>{task.text}</span>
      )}
      <div className="task-actions">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`check-icon ${task.completed ? 'done' : ''}`}
          onClick={() => toggleTaskCompletion(task.id)}
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="edit-icon"
          onClick={() => startEditing(task)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="trash-icon"
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
}

export default TaskItem;
