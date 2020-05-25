import React from 'react';
import TodoCircle from "./TodoCircle";
import {useTodoState} from "../context/Todo.context";

function TodoCircleList() {
  const branches = useTodoState();
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
