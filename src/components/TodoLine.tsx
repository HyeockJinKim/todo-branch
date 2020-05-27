import React, {useEffect} from 'react';
import ReactTooltip from "react-tooltip";

interface TodoLineInterface {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  is_last: boolean;
}

const cursor_css = {cursor: 'pointer'};

function TodoLine(props: TodoLineInterface) {
  useEffect(()=>{
    ReactTooltip.rebuild();
  }, [props]);
  if (props.is_last)
    return (
      <line style={cursor_css} data-tip={props.y1} data-for={'create_tooltip'} data-event="click"
            x1={props.x1 * 50 + 10} y1={props.y1 * 50 + 10} x2={props.x2 * 50 + 10} y2={props.y2 * 50 + 10}
            stroke="white" strokeWidth="3"/>
    )

  return (
    <line style={cursor_css} x1={props.x1 * 50 + 10} y1={props.y1 * 50 + 10} x2={props.x2 * 50 + 10}
          y2={props.y2 * 50 + 10} stroke="white" strokeWidth="3"/>
  );
}

export default TodoLine;
