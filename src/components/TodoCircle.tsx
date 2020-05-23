import React from 'react';

interface TodoCircleInterface {
  cx: string,
  cy: string,
}

const cursor_css = {cursor: 'pointer'};

function circle_click(todo: TodoCircleInterface) {
  console.log(todo)
}

function TodoCircle(props: TodoCircleInterface) {
  return (
    <circle onClick={e => circle_click(props)} style={cursor_css}
            cx={props.cx} cy={props.cy} r="5" stroke="white" strokeWidth="2" fill="#282c34">
    </circle>
  );
}

export default TodoCircle;
