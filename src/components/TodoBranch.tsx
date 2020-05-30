import React from 'react';
import TodoCircleList from "./TodoCircleList";
import TodoLineList from "./TodoLineList";
import ToolTip from "./Tooltip";
import {useTodoBranchState} from "../context/Todo.context";
import "./TodoBranch.css"

function TodoBranch() {
  const todoBranch = useTodoBranchState();
  return (
    <div className="TodoBranch">
      <h2>Todo branch</h2>
      <div className="box">
        <svg style={{width: todoBranch.global_x * 50 + 200, height: todoBranch.branches.length * 50 + 30, margin: '2em 10%'}}>
          <TodoLineList/>
          <TodoCircleList/>
        </svg>
      </div>
      <ToolTip/>
    </div>
  );
}

export default TodoBranch;
