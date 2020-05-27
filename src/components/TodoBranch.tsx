import React from 'react';
import TodoCircleList from "./TodoCircleList";
import TodoLineList from "./TodoLineList";
import ToolTip from "./Tooltip";
import {useTodoBranchState} from "../context/Todo.context";

function TodoBranch() {
  const todoBranch = useTodoBranchState();
  return (
    <div className="TodoBranch">
      <h2>Todo branch</h2>
      <div style={{overflowX: 'scroll'}}>
        <svg style={{width: todoBranch.global_x * 50 + 2900, height: todoBranch.global_y * 50 + 50, margin: '2em 10%'}}>
          <TodoLineList/>
          <TodoCircleList/>
        </svg>
      </div>
      <ToolTip/>
    </div>
  );
}

export default TodoBranch;
