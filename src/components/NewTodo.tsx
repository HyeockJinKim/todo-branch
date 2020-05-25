import React from 'react';
import './Tooltip.css'

function NewTodo() {
  return (
    <div id="new-todo">
      <span className="btn">new todo</span>
      <span className="btn">edit todo</span>
      <span className="btn">continue</span>
    </div>
  );
}

export default NewTodo;
