import React from 'react';
import './App.css';
import TodoBranch from "./components/TodoBranch";

function clear_all_tooltip(e: React.MouseEvent) {
  e.preventDefault();
  let new_todo = document.getElementById('new-todo');
  if (new_todo !== null) {
    new_todo.style.visibility = 'hidden';
  }
}

function App() {
  return (
    <div className="App" onClick={clear_all_tooltip}>
      <header className="App-header">
        <TodoBranch/>
      </header>
    </div>
  );
}

export default App;
