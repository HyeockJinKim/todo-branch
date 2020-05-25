import React from 'react';

interface TodoCircleInterface {
  cx: number,
  cy: number,
}

const cursor_css = {cursor: 'pointer'};
let is_tooltip_visible = false;

function show_tooltip(e: React.MouseEvent, todo: TodoCircleInterface) {
  let tooltip = document.getElementById('tooltip');
  if (tooltip !== null) {
    is_tooltip_visible = true;
    tooltip.style.visibility = 'visible';
    tooltip.style.left = e.clientX+'px';
    tooltip.style.top = e.clientY+14+'px';
  }
}

function hidden_tooltip() {
  let tooltip = document.getElementById('tooltip');
  if (tooltip !== null) {
    tooltip.style.visibility = 'hidden';
    is_tooltip_visible = false;
  }
}

function right_click(e: React.MouseEvent) {
  e.preventDefault();
  let new_todo = document.getElementById('new-todo');
  if (new_todo !== null) {
    if (is_tooltip_visible) {
      hidden_tooltip();
    }
    new_todo.style.visibility = 'visible';
    new_todo.style.left = e.clientX+48+'px';
    new_todo.style.top = e.clientY+14+'px';
  }
}

function TodoCircle(props: TodoCircleInterface) {
  return (
    <circle onMouseOver={e => show_tooltip(e, props)} onMouseLeave={hidden_tooltip}
            onContextMenu={e => right_click(e)} style={cursor_css}
            cx={props.cx*40+10} cy={props.cy*40+10} r="6" stroke="white" strokeWidth="2" fill="#282c34">
    </circle>
  );
}

export default TodoCircle;
