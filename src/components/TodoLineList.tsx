import React from 'react';
import TodoLine from "./TodoLine";
import {useBranchState, useTodoBranchState} from "../context/Todo.context";

function TodoLineList() {
  const todoBranch = useTodoBranchState();

  return (
    <g className="todo-line">
      {todoBranch.branches.map(branch => {
        let lines = branch.todo.map(todo => (
          <TodoLine x1={todo.parent[0]} y1={todo.parent[1]} is_last={false}
                    x2={todo.x} y2={branch.y}/>
        ));
        if (!branch.is_merge) {
          lines.push(<TodoLine is_last={true}
                               x1={branch.todo[branch.todo.length - 1].x} y1={branch.y} x2={todoBranch.global_x}
                               y2={branch.y}/>)
        }

        return lines;
      })}
    </g>
  );
}

export default TodoLineList;
