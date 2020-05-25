import React from 'react';

interface TodoLineInterface {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

const cursor_css = {cursor: 'pointer'};

function line_click(todo: TodoLineInterface) {
  console.log(todo)
}

function TodoLine(props: TodoLineInterface) {
  return (
    <line onClick={e => line_click(props)} style={cursor_css}
          x1={props.x1*40+10} y1={props.y1*40+10} x2={props.x2*40+10} y2={props.y2*40+10} stroke="white" strokeWidth="2.5" />
  );
}

export default TodoLine;
