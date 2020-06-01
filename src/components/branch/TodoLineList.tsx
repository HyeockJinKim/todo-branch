import React, {useEffect} from 'react';
import {BranchTooltip, useTodoBranchState} from "../../context/Todo.context";
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
      {todoBranch.branches.map((branch, index) => {
        let lines = branch.todo.map(todo => (
          <line style={cursor_css} x1={line_location(todoBranch.branches[todo.parent[0]].todo[todo.parent[1]].x)}
                y1={line_location(todoBranch.branches[todo.parent[0]].y)} x2={line_location(todo.x)}
                y2={line_location(branch.y)} stroke="white" strokeWidth="3"/>
        ));
        if (branch.merge_node.length === 0) {
          lines.push(
            <line style={cursor_css}
                  x1={line_location(branch.todo[branch.todo.length - 1].x)} y1={line_location(branch.y)}
                  x2={line_location(todoBranch.global_x)} y2={line_location(branch.y)}
                  stroke="white" strokeWidth="3"/>
          )
        } else {
          lines.push(
            <line style={cursor_css}
                  x1={line_location(branch.todo[branch.todo.length - 1].x)} y1={line_location(branch.y)}
                  x2={line_location(todoBranch.branches[branch.merge_node[0]].todo[branch.merge_node[1]].x)}
                  y2={line_location(todoBranch.branches[branch.merge_node[0]].y)}
                  stroke="white" strokeWidth="3"/>
          )
        }
        lines.push(
          <text x={line_location(todoBranch.global_x) + 30} y={line_location(branch.y) + 7} fill="white"
                data-tip={JSON.stringify({x: branch.todo.length, y: index, type: BranchTooltip.BranchTooltip})}
                data-for='tooltip' data-event="click"
                style={{cursor: "pointer", fontSize: "18px"}}>{branch.name}</text>
        )

        return lines;
      })}
    </g>
  );
}

export default TodoLineList;
