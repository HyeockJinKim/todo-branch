import React from 'react';
import ReactTooltip from "react-tooltip";
import {useBranchState, useTodoDispatch} from "../context/Todo.context";

function ToolTip() {
  const branches = useBranchState();
  const btn_style = {
    cursor: 'pointer',
    fontSize: '17px',
    backgroundColor: '#7b95cd',
    color: 'white',
    lineHeight: '25px',
    height: '25px',
    margin: '.3rem auto 0 auto',
    width: '120px',
    display: 'block',
    borderRadius: '.3rem',
  };
  const dispatch = useTodoDispatch();
  const onNewTodo = (e: React.MouseEvent, num:string) => {
    e.preventDefault();
    console.log(num);
    dispatch({
      type: "CREATE-TODO",
      header: "Temp header",
      text: "Temp text",
      branch: parseInt(num),
    })
  };
  const onNewBranch = (e: React.MouseEvent, num:string) => {
    e.preventDefault();
    dispatch({
      type: "CREATE-BRANCH",
      branch: parseInt(num),
    })
  };
  const onMerge = (e: React.MouseEvent, num:string) => {
    e.preventDefault();
    dispatch({
      type: "MERGE",
      branch: parseInt(num),
    })
  };
  return (
    <div>
      {
        branches.map(branch => (
          branch.todo.map(todo => (
            <ReactTooltip id={'circle_' + branch.y + '_' + todo.x} effect='solid' border={true} place="bottom"
                          type={'light'}>
              <h3 style={{margin: '3px auto 3px auto'}}>{todo.header}</h3>
              <span>{todo.text}</span>
            </ReactTooltip>
          ))
        ))
      }
      <ReactTooltip id='create_tooltip' place='right' effect='solid' clickable={true}
                    type={'light'} globalEventOff='click' getContent={(data) => (
        <div>
          <h3 style={{margin: '3px auto 3px auto'}}>{data} Branch</h3>
          <span style={btn_style} onClick={(e) => onNewTodo(e, data)}>new todo</span>
          <span style={btn_style} onClick={(e) => onNewBranch(e, data)}>new branch</span>
          <span style={btn_style} onClick={(e) => onMerge(e, data)}>merge</span>
        </div>
      )}>
      </ReactTooltip>
    </div>
  );
}

export default ToolTip;
