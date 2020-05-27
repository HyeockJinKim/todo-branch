import React, {useEffect} from 'react';
import {useTodoBranchState} from "../context/Todo.context";
import ReactTooltip from "react-tooltip";

function TodoLineList() {
  const line_location = (x: number) => x * 50 + 10;
  const cursor_css = {cursor: 'pointer'};
  const todoBranch = useTodoBranchState();
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <g className="todo-line">
      {todoBranch.branches.map((branch, y) => {
        let lines = branch.todo.map(todo => (
          <line style={cursor_css} x1={line_location(todoBranch.branches[todo.parent[0]].todo[todo.parent[1]].x)}
                y1={line_location(todo.parent[0])} x2={line_location(todo.x)}
                y2={line_location(y)} stroke="white" strokeWidth="3"/>
        ));
        if (!branch.is_merge) {
          lines.push(
            <line style={cursor_css} data-tip={y} data-for={'create_tooltip'} data-event="click"
                  x1={line_location(branch.todo[branch.todo.length - 1].x)} y1={line_location(y)}
                  x2={line_location(todoBranch.global_x)} y2={line_location(y)}
                  stroke="white" strokeWidth="3"/>
          )
        }
        lines.push(
          <text x={line_location(todoBranch.global_x) + 30} y={line_location(y) + 7} fill="white"
                style={{fontSize: '18px'}}>{branch.name}</text>
        )

        return lines;
      })}
    </g>
  );
}

export default TodoLineList;
