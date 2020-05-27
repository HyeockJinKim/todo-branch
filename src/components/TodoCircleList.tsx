import React from 'react';
import {useBranchState, useTodoDispatch} from "../context/Todo.context";

function TodoCircleList() {
  const branches = useBranchState();
  const dispatch = useTodoDispatch();
  const cursor_css = {cursor: 'pointer'};
  const circle_location = (x: number) => x * 50 + 10;
  return (
    <g className="todo-circle">
      {branches.map(branch => (
        branch.todo.map((todo, x) => (
          <circle data-tip='' data-for={'circle_' + branch.y + '_' + todo.x}
                  onDoubleClick={() => dispatch({type: "SUCCESS", id: [branch.y, x++]})} style={cursor_css}
                  cx={circle_location(todo.x)} cy={circle_location(branch.y)} r="7" stroke="white" strokeWidth="2.5"
                  fill={todo.success ? "white" : "#282c34"}>
          </circle>
        ))
      ))}
    </g>
  );
}

export default TodoCircleList;
