import React, {useEffect} from 'react';
import {useBranchState} from "../../context/Todo.context";
import ReactTooltip from "react-tooltip";
import TodoBadge from "./TodoBadge";

function TodoBadgeList() {
  const branches = useBranchState();
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <g className="todo-circle">
      {branches.map((branch, y_index) => (
        branch.todo.map((todo, x_index) => (
          <TodoBadge x={todo.x} y={branch.y} x_index={x_index} y_index={y_index} todo={todo}/>
        ))
      ))}
    </g>
  );
}

export default TodoBadgeList;
