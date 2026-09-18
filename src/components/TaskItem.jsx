import { useState } from "react";

function TaskItem({ task, deleteTask, toggleTask, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleSave = () => {
        if (editText.trim() === "") {
            return;
        }

        editTask(task.id, editText);
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            <div className="task-content">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                />

                {/* Task Text */}
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                ) : (
                    <span className={task.completed ? "completed" : ""}>{task.text}</span>
                )}
            </div>

            <div className="task-buttons">
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}

                <button className="delete" onClick={() => deleteTask(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
