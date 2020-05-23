import React from 'react';
import TodoCircle from "./TodoCircle";

interface TodoCircleInterface {
  cx: string,
  cy: string,
}

interface TodoCircleListInterface {
  branch: Array<Array<TodoCircleInterface>>
}

function TodoCircleList(props: TodoCircleListInterface) {
  return (
    <g className="todo-circle">
      {props.branch.map(branch => (
        branch.map(todo => (
          <TodoCircle cx={todo.cx} cy={todo.cy}/>
        ))
      ))}
    </g>
  );
}

export default TodoCircleList;
