import React from 'react';
import TodoCircleList from "./TodoCircleList";
import TodoLineList from "./TodoLineList";
// import NewTodo from "./NewTodo";
import ToolTip from "./Tooltip";
import {TodoContextProvider} from "../context/Todo.context";

function TodoBranch() {
  return (
    <TodoContextProvider>
      <div className="TodoBranch">
        <h2>Todo branch</h2>
        <svg>
          <TodoLineList/>
          <TodoCircleList/>
        </svg>
        <ToolTip/>
        {/*<NewTodo/>*/}
      </div>
    </TodoContextProvider>
  );
}

export default TodoBranch;
