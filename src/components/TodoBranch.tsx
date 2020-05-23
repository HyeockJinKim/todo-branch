import React, { useState } from 'react';
import TodoCircleList from "./TodoCircleList";
import TodoLineList from "./TodoLineList";

function TodoBranch() {
  const [todo, setTodo] = useState([])
  const [branches, setBranches] = useState([[{cx: "10", cy:"10", root: [0, 0], children: [0, 1, 2]}, {cx: "50", cy:"10", root: [0, 0], children: [1]}], [{cx: "50", cy:"50", root: [0, 0], children: [2]}]]);
  return (
    <div className="TodoBranch">
      <h2>to-do branch</h2>
      <svg>
        <TodoLineList branch={branches}/>
        <TodoCircleList branch={branches}/>
      </svg>
    </div>
  );
}

export default TodoBranch;
