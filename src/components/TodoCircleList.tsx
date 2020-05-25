import React from 'react';
import TodoCircle from "./TodoCircle";
import {useBranchState} from "../context/Todo.context";

function TodoCircleList() {
  const branches = useBranchState();
  return (
    <g className="todo-circle">
      {branches.map(branch => (
        branch.todo.map(todo => (
          <TodoCircle cx={todo.x} cy={branch.y}/>
        ))
      ))}
    </g>
  );
}

export default TodoCircleList;
