import React, {useEffect} from 'react';
import {Todo, TodoType, useBranchState, useTodoDispatch} from "../context/Todo.context";
import ReactTooltip from "react-tooltip";

function TodoCircleList() {
  const branches = useBranchState();
  const dispatch = useTodoDispatch();
  const cursor_css = {cursor: 'pointer'};
  const circle_location = (x: number) => x * 50 + 10;
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const circle_type = (todo: Todo) => {
    switch (todo.type) {
      case TodoType.Initial:
        return {fill: "white", stroke: "white"};
      case TodoType.Merge:
        return {fill: "green", stroke: "green"};
      case TodoType.MUST:
        return {fill: todo.success ? "red" : "#282c34", stroke: "red"};
      case TodoType.Important:
        return {fill: todo.success ? "orange" : "#282c34", stroke: "orange"};
      case TodoType.Warning:
        return {fill: todo.success ? "yellow" : "#282c34", stroke: "yellow"};
      case TodoType.Plan:
        return {fill: "#282c34", stroke: "white", strokeDasharray: "10px 10px"};
      case TodoType.Normal:
      default:
        return {fill: todo.success ? "white" : "#282c34", stroke: "white"};
    }
  };

  return (
    <g className="todo-circle">
      {branches.map((branch, index) => (
        branch.todo.map((todo, x) => (
          <circle data-tip={JSON.stringify({y: index, x: x})} data-for='todo_tooltip'
                  onDoubleClick={() => dispatch({type: "SUCCESS", id: [branch.y, x++]})} style={cursor_css}
                  cx={circle_location(todo.x)} cy={circle_location(branch.y)} r="7" strokeWidth="2.5"
                  {...circle_type(todo)}/>
        ))
      ))}
    </g>
  );
}

export default TodoCircleList;
