import React from 'react';

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
  return (
    <circle data-tip='' data-for={'circle_' + props.cy + '_' + props.cx}
            onContextMenu={e => right_click(e)} style={cursor_css}
            cx={props.cx * 40 + 10} cy={props.cy * 40 + 10} r="6" stroke="white" strokeWidth="2" fill="#282c34">
    </circle>
  );
}

export default TodoCircle;
