import React, {useState} from 'react';
import {BranchTooltip, TodoType, useBranchState, useTodoDispatch} from "../../context/Todo.context";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Tooltip.css'

type NewTodoProps = {
  dataTip: string | null;
  tooltipType: BranchTooltip;
  setTooltip: (BranchTooltip) => void;
}

function EditTodo(props: NewTodoProps) {
  const [header, setHeader] = useState<string | null>(null);
  const [typ, setType] = useState(TodoType.Normal);
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const branches = useBranchState();
  const dispatch = useTodoDispatch();

  const onEditTodo = (x: number, y: number, header: string, text: string) => {
    if (header === '') {
      header = 'temp header';
    }
    if (props.tooltipType === BranchTooltip.NewTodo)
      dispatch({type: "CREATE-TODO", branch: y, header, text, typ, start_date: new Date(), end_date: date});
    else
      dispatch({type: "EDIT-TODO", x, y, header, text, typ, start_date: new Date(), end_date: date});

    setHeader(null);
    setText('');
    setType(TodoType.Normal);
    setDate(null);
    props.setTooltip(BranchTooltip.None);
  };
  let x = 0;
  let y = 0;
  if (props.dataTip !== null) {
    const tip = JSON.parse(props.dataTip);
    x = tip.x;
    y = tip.y;
    if (header === null) {
      if (y < branches.length && x < branches[y].todo.length) {
        const todo = branches[y].todo[x];
        setHeader(todo.header);
        setText(todo.text);
        setType(todo.type);
        setDate(todo.end_date !== null ? new Date(todo.end_date) : null);
      } else {
        setHeader('');
      }
    }
  }

  const enter_key = (e: React.KeyboardEvent) => {
    if (!e.shiftKey) {
      if (e.key === 'Enter') {
        onEditTodo(x, y, header !== null ? header : '', text);
      }
    }
  }

  return (
    <div className="NewTodoTooltip">
      <label>
        할 일
        <input value={header !== null ? header : ''} onKeyDown={(e) => enter_key(e)} onChange={e => setHeader(e.target.value)}/>
      </label>
      <label>
        내용
        <textarea value={text} onKeyDown={(e) => enter_key(e)} onChange={e => setText(e.target.value)}/>
      </label>
      <label>
        타입
        <svg style={{display: "block", margin: "3px auto", cursor: "pointer"}} width="120"
             height="20">
          <circle cx="10" cy="10" r="9" stroke={typ === TodoType.Normal ? "black" : "white"} strokeWidth="1" fill="white"
                  onClick={() => setType(TodoType.Normal)}/>
          <circle cx="40" cy="10" r="9" stroke={typ === TodoType.Warning ? "black" : "white"} strokeWidth="1" fill="yellow"
                  onClick={() => setType(TodoType.Warning)}/>
          <circle cx="70" cy="10" r="9" stroke={typ === TodoType.Important ? "black" : "white"} strokeWidth="1" fill="orange"
                  onClick={() => setType(TodoType.Important)}/>
          <circle cx="100" cy="10" r="9" stroke={typ === TodoType.MUST ? "black" : "white"} strokeWidth="1" fill="red"
                  onClick={() => setType(TodoType.MUST)}/>
        </svg>
      </label>
      <label>
        기한
        <DatePicker style={{width: "80px"}} selected={date} onChange={setDate}/>
      </label>
      <span className="btn" onClick={(e) => onEditTodo(x, y, header !== null ? header : '', text)}>
        {props.tooltipType === BranchTooltip.EditTodo ? "edit todo" : "new todo"}
      </span>
    </div>
  )
}

export default EditTodo;
