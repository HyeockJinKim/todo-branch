import React from 'react';

interface TodoLineInterface {
  x1: string,
  y1: string,
  x2: string,
  y2: string,
}

const cursor_css = {cursor: 'pointer'};

function line_click(todo: TodoLineInterface) {
  console.log(todo)
}

function TodoLine(props: TodoLineInterface) {
  return (
    <line onClick={e => line_click(props)} style={cursor_css}
          x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2} stroke="white" strokeWidth="2" />
  );
}

export default TodoLine;
