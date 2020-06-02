import React from 'react';
import {BranchTooltip, TodoType, useBranchState, useTodoDispatch} from "../../context/Todo.context";
import './Tooltip.css'

type BranchChoiceProps = {
  dataTip: string | null;
  setTooltip: (BranchTooltip) => void;
}

const date_to_string = (d: Date) => {
  if (d === null || d === undefined)
    return '';
  const _date = new Date(d);
  return _date.getFullYear() + '년 ' + (_date.getMonth() + 1) + '월 ' + _date.getDate() + '일';
}

function TodoInfo(props: BranchChoiceProps) {
  const branches = useBranchState();
  const dispatch = useTodoDispatch();

  let header = '';
  let text = '';
  let start_date = '';
  let end_date = '';
  let can_remove = true;
  let success = false;
  if (props.dataTip !== null) {
    const tip = JSON.parse(props.dataTip);
    if (tip.y < branches.length && tip.x < branches[tip.y].todo.length) {
      const todo = branches[tip.y].todo[tip.x];
      header = todo.header;
      text = todo.text;
      start_date = todo.start_date !== null ? date_to_string(todo.start_date) : '~';
      end_date = todo.end_date !== null ? date_to_string(todo.end_date) : '~';
      can_remove = todo.type !== TodoType.Initial && todo.type !== TodoType.Merge;
      success = todo.success;
    }
  }
  const onRemove = () => {
    if (props.dataTip !== null) {
      const tip = JSON.parse(props.dataTip);
      dispatch({type: "REMOVE", y: tip.y, x: tip.x})
    }
    props.setTooltip(BranchTooltip.None);
  }

  return (
    <div>
      <h3>{header}</h3>
      {text.split('\n').map(line => <span>{line}<br/></span>)}
      <label>
        시작일
        <span
          style={{display: "block", textAlign: "center", fontWeight: "normal"}}>{start_date}</span>
      </label>
      <label>
        {success ? "완료일" : "기한"}
        <span style={{display: "block", textAlign: "center", fontWeight: "normal"}}>{end_date}</span>
      </label>
      <span className="btn" onClick={() => props.setTooltip(BranchTooltip.EditTodo)}>edit</span>
      {can_remove ? <span className="btn" onClick={() => onRemove()}>remove</span> : <div/>}
    </div>
  )
}

export default TodoInfo;
