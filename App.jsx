import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  

  const addTask = (text) => {
    setTasks(prev => [
      ...prev, 
      { id: Date.now(), text, completed: false }
    ]);
  };

  const deleteTask = (id) => {
    console.log("Deleting task with id:", id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
   if (filter === 'completed') return task.completed;
   if (filter === 'pending') return !task.completed;
  return true;
  });

  //Filter Handlers
  const showAll = () => setFilter('all');
  const showCompleted = () => setFilter('completed');
  const showPending = () => setFilter('pending');

  const bindFilterEvents = (attach = true) => {
  const allBtn = document.getElementById('filter-all');
  const completedBtn = document.getElementById('filter-completed');
  const pendingBtn = document.getElementById('filter-pending');

  if (!allBtn || !completedBtn || !pendingBtn) return;

  allBtn.onclick = attach ? showAll : null;
  completedBtn.onclick = attach ? showCompleted : null;
  pendingBtn.onclick = attach ? showPending : null;
};

useEffect(() => {
  bindFilterEvents(true);

  return () => {
    bindFilterEvents(false);
  };
}, []);

  

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TodoForm addTask={addTask} />
      <br />
      <div className="filters">
        <button id="filter-all">All</button>
        <button id="filter-completed">Completed</button>
        <button id="filter-pending">Pending</button>

      </div>
      <TodoList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;
