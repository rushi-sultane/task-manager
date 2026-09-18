import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {

  // Get tasks from LocalStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  // Store current filter
  const [filter, setFilter] = useState("all");

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);


  // ADD TASK
  const addTask = (text) => {

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };

    setTasks([...tasks, newTask]);
  };


  // DELETE TASK
  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };


  // COMPLETE TASK
  const toggleTask = (id) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };


  // EDIT TASK
  const editTask = (id, newText) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText
            }
          : task
      )
    );
  };


  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {

    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });


  return (
    <div className="app">

      <div className="container">

        <h1>Task Manager</h1>

        {/* Add Task */}
        <TaskForm addTask={addTask} />


        {/* Filters */}
        <div className="filters">

          <button
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

        </div>


        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />

      </div>

    </div>
  );
}

export default App;