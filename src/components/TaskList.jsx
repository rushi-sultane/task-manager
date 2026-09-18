import TaskItem from "./TaskItem"

function TaskList({
    tasks,
    deleteTask,
    toggleTask,
    editTask
}) {

    return (
        <div className="task-list">

            {tasks.length === 0 ? (
                <p>
                    No tasks found.
                </p>
            ) : (

                tasks.map((task) => (

                    <TaskItem 
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleTask={toggleTask}
                        editTask={editTask}
                    />
                ))
            )}

        </div>
    ) 
}

export default TaskList