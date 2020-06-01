import React, {useEffect} from 'react';
import {BranchTooltip, Todo, TodoType, useTodoDispatch} from "../../context/Todo.context";
import ReactTooltip from "react-tooltip";

type TodoBadgeType = {
  x: number;
  y: number;
  x_index: number;
  y_index: number;
  todo: Todo;
}

function TodoBadge(props: TodoBadgeType) {
  const dispatch = useTodoDispatch();
  const circle_location = (x: number) => x * 50 + 10;
  const cursor_css = {cursor: 'pointer'};
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const badge_type = (todo: Todo) => {
    const circle_attr = {
      cx: circle_location(props.x),
      cy: circle_location(props.y),
      strokeWidth: "2.5",
      r: "7",
      style: cursor_css,
    };
    const rect_attr = {
      x: circle_location(props.x)-6,
      y: circle_location(props.y)-6,
      strokeWidth: "2.5",
      width: "12",
      height: "12",
      style: cursor_css,
    };
    const dataTip = {y: props.y_index, x: props.x_index, type: BranchTooltip.TodoInfo};
    switch (todo.type) {
      case TodoType.Initial: {
        const attr = {fill: "#282c34", stroke: "white"};
        return <rect data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                     {...attr} {...rect_attr}/>
      }
      case TodoType.Merge: {
        const attr = {fill: "#282c34", stroke: "green"};
        return <rect data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                     {...attr} {...rect_attr}/>
      }
      case TodoType.MUST: {
        const attr = {fill: todo.success ? "red" : "#282c34", stroke: "red"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Important: {
        const attr = {fill: todo.success ? "orange" : "#282c34", stroke: "orange"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Warning: {
        const attr = {fill: todo.success ? "yellow" : "#282c34", stroke: "yellow"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Plan: {
        const attr = {fill: "#282c34", stroke: "white", strokeDasharray: "10px 10px"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       // TODO: Plan double click
                       // onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Normal:
      default: {
        const attr = {fill: todo.success ? "white" : "#282c34", stroke: "white"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       {...attr} {...circle_attr}/>
      }
    }
  };

  return badge_type(props.todo);
}

export default TodoBadge;
