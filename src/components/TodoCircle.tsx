import React, {useEffect} from 'react';
import ReactTooltip from "react-tooltip";

interface TodoCircleInterface {
  cx: number,
  cy: number,
}

const cursor_css = {cursor: 'pointer'};

function right_click(e: React.MouseEvent) {
  e.preventDefault();
  let new_todo = document.getElementById('new-todo');
  if (new_todo !== null) {
    new_todo.style.visibility = 'visible';
    new_todo.style.left = e.clientX + 48 + 'px';
    new_todo.style.top = e.clientY + 14 + 'px';
  }
}

function TodoCircle(props: TodoCircleInterface) {
  useEffect(()=>{
    ReactTooltip.rebuild();
  }, [props]);
  return (
    <circle data-tip='' data-for={'circle_' + props.cy + '_' + props.cx}
            onContextMenu={e => right_click(e)} style={cursor_css}
            cx={props.cx * 50 + 10} cy={props.cy * 50 + 10} r="7" stroke="white" strokeWidth="2.5" fill="#282c34">
    </circle>
  );
}

export default TodoCircle;
