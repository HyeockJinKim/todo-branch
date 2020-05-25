import React from 'react';
import TodoLine from "./TodoLine";
import {useTodoState} from "../context/Todo.context";

function TodoLineList() {
  const branches = useTodoState();
  return (
    <g className="todo-line">
      {branches.map(branch => (
        branch.todo.map(todo => (
          <TodoLine x1={todo.parent[0]} y1={todo.parent[1]}
                    x2={todo.x} y2={branch.y} />
        ))
      ))}
    </g>
  );
}

export default TodoLineList;
