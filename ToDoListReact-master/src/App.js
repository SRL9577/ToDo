import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState(""); // לשמור את המשימה החדשה
  const [todos, setTodos] = useState([]); // לשמור את כל המשימות

  async function getTodos() {
    const todos = await service.getTasks(); // קריאה למשימות
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault(); // מונע רענון דף
    const newTask = await service.addTask(newTodo); // הוספת משימה
    setNewTodo(""); // ריקון השדה לאחר הוספה
    if (newTask) {
      setTodos(prevTodos => [...prevTodos, newTask]); // עדכון המשימות
    }
  }

  // עדכון מצב הושלמה של המשימה
  async function toggleCompleted(todo) {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete }; // הפיכת המצב
    await service.setCompleted(todo.id, updatedTodo.isComplete); // עדכון בשרת
    setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t))); // עדכון ברשימה המקומית
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    setTodos(todos.filter(todo => todo.id !== id)); // עדכון הרשימה לאחר מחיקה
  }

  useEffect(() => {
    getTodos(); // טוען את המשימות כשמתחילים
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Well, let's take on the day"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => toggleCompleted(todo)} // טיפול בשינוי
                  />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default App;
