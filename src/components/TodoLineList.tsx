import React from 'react';
import TodoLine from "./TodoLine";

interface TodoLineInterface {
  cx: string,
  cy: string,
  root: number[],
}

interface TodoLineListInterface {
  branch: Array<Array<TodoLineInterface>>
}

function TodoLineList(props: TodoLineListInterface) {
  return (
    <g className="todo-line">
      {props.branch.map(branch => (
        branch.map(todo => (
          <TodoLine x1={props.branch[todo.root[0]][todo.root[1]].cx} y1={props.branch[todo.root[0]][todo.root[1]].cy}
                    x2={todo.cx} y2={todo.cy} />
        ))
      ))}
    </g>
  );
}

export default TodoLineList;
