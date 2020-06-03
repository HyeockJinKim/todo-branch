import React, {useEffect} from 'react';
import {BranchTooltip, Todo, TodoType, useBranchState, useTodoDispatch} from "../../context/Todo.context";
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
  const badge_location = (x: number) => x * 50 + 35;
  const branches = useBranchState();
  const cursor_css = {cursor: 'pointer'};
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  const onWIP = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({type: "WIP", y: props.y_index, x: props.x_index});
  }

  const badge_type = (todo: Todo) => {
    const x_loc = badge_location(props.x);
    const y_loc = badge_location(props.y);
    const circle_attr = {
      cx: x_loc,
      cy: y_loc,
      strokeWidth: "2.5",
      r: 7,
      style: cursor_css,
    };
    if (todo.end_date !== null && !todo.success) {
      let remain: number = new Date(todo.end_date).valueOf() - new Date().valueOf();
      const _day = 1000 * 60 * 60 * 24;
      const remainDay = remain / _day;
      if (remainDay < 1) {
        circle_attr.r = 15;
        circle_attr.strokeWidth = "4";
      } else if (remainDay < 2) {
        circle_attr.r = 11;
        circle_attr.strokeWidth = "3";
      } else if (remainDay < 3) {
        circle_attr.r = 9;
      }
    }
    const rect_attr = {
      x: x_loc - 6,
      y: y_loc - 6,
      strokeWidth: "2.5",
      width: "12",
      height: "12",
      style: cursor_css,
    };
    // const triangle_attr = {
    //   points: (x_loc)+","+(y_loc-6)+" "+(x_loc-7)+","+(y_loc+6)+" "+(x_loc+7)+","+(y_loc+6),
    //   strokeWidth: "2.5",
    //   style: cursor_css,
    // }
    const dataTip = {y: props.y_index, x: props.x_index, type: BranchTooltip.TodoInfo};
    switch (todo.type) {
      case TodoType.Initial: {
        const attr = {fill: branches[props.y_index].merge_node.length === 2 ? "white" : "#282c34", stroke: "white"};
        // return <polygon data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
        //                 {...attr} {...triangle_attr} />
        return <rect data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                     onContextMenu={e => e.preventDefault()}
                     {...attr} {...rect_attr}/>
      }
      case TodoType.Merge: {
        const attr = {fill: "white", stroke: "green"};
        // return <polygon data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
        //                 {...attr} {...triangle_attr} />
        return <rect data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                     onContextMenu={e => e.preventDefault()}
                     {...attr} {...rect_attr}/>
      }
      case TodoType.MUST: {
        const attr = {fill: todo.success ? "red" : "#282c34", stroke: "red"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       onContextMenu={(e) => onWIP(e)}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Important: {
        const attr = {fill: todo.success ? "orange" : "#282c34", stroke: "orange"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       onContextMenu={(e) => onWIP(e)}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Warning: {
        const attr = {fill: todo.success ? "yellow" : "#282c34", stroke: "yellow"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       onContextMenu={(e) => onWIP(e)}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Plan: {
        const attr = {fill: "#282c34", stroke: "white", strokeDasharray: "10px 10px"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
          // TODO: Plan double click
          // onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
          //              onContextMenu={(e) => onWIP(e)}
                       {...attr} {...circle_attr}/>
      }
      case TodoType.Normal:
      default: {
        const attr = {fill: todo.success ? "white" : "#282c34", stroke: "white"};
        return <circle data-tip={JSON.stringify(dataTip)} data-for='tooltip' data-event="click mouseenter"
                       onDoubleClick={() => dispatch({type: "SUCCESS", id: [props.y_index, props.x_index]})}
                       onContextMenu={(e) => onWIP(e)}
                       {...attr} {...circle_attr}/>
      }
    }
  };

  const invert_triangle = (color: string) => {
    const x_loc = badge_location(props.x);
    const y_loc = badge_location(props.y);
    const attr = {fill: color, stroke: "white"};
    const inverted_triangle_attr = {
      points: (x_loc) + "," + (y_loc - 12) + " " + (x_loc - 7) + "," + (y_loc - 24) + " " + (x_loc + 7) + "," + (y_loc - 24),
      strokeWidth: "2",
      style: cursor_css,
    }
    if (props.todo.end_date !== null) {
      let remain: number = new Date(props.todo.end_date).valueOf() - new Date().valueOf();
      const _day = 1000 * 60 * 60 * 24;
      const remainDay = remain / _day;
      if (remainDay < 1) {
        inverted_triangle_attr.points = (x_loc) + "," + (y_loc - 20) + " " + (x_loc - 7) + "," + (y_loc - 32) + " " + (x_loc + 7) + "," + (y_loc - 32);
      } else if (remainDay < 2) {
        inverted_triangle_attr.points = (x_loc) + "," + (y_loc - 16) + " " + (x_loc - 7) + "," + (y_loc - 28) + " " + (x_loc + 7) + "," + (y_loc - 28);
      } else if (remainDay < 3) {
        inverted_triangle_attr.points = (x_loc) + "," + (y_loc - 14) + " " + (x_loc - 7) + "," + (y_loc - 26) + " " + (x_loc + 7) + "," + (y_loc - 26);
      }

    }


    return (
      <g>
        <polygon {...attr} {...inverted_triangle_attr} />
        {badge_type(props.todo)}
      </g>
    )
  }

  if (props.todo.WIP && !props.todo.success)
    return invert_triangle("black");

  if (props.todo.end_date !== null && !props.todo.success) {
    let remain: number = new Date(props.todo.end_date).valueOf() - new Date().valueOf();
    const _day = 1000 * 60 * 60 * 24;
    if (remain / _day < 3) {
      return invert_triangle("red");
    }
  }

  return badge_type(props.todo);
}

export default TodoBadge;
