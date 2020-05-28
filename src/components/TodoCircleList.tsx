import React, {useEffect} from 'react';
import {useBranchState, useTodoDispatch} from "../context/Todo.context";
import ReactTooltip from "react-tooltip";

function TodoCircleList() {
  const branches = useBranchState();
  const dispatch = useTodoDispatch();
  const cursor_css = {cursor: 'pointer'};
  const circle_location = (x: number) => x * 50 + 10;
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  return (
    <g className="todo-circle">
      {branches.map((branch, index) => (
        branch.todo.map((todo, x) => (
          <circle data-tip={JSON.stringify({y: index, x: x})} data-for='todo_tooltip'
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
