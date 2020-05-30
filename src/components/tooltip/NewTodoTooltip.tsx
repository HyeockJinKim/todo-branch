import React, {MutableRefObject, useState} from 'react';
import ReactTooltip from "react-tooltip";
import {TodoType, useTodoDispatch} from "../../context/Todo.context";
import {Tip} from "../Tooltip";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTodoTooltip(props: {branchTooltip: MutableRefObject<any>, data: Tip}) {
  const [header, setHeader] = useState('');
  const [typ, setType] = useState(TodoType.Normal);
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const dispatch = useTodoDispatch();

  const onNewTodo = (e: React.MouseEvent, num: number, header: string, text: string) => {
    e.preventDefault();
    const current = props.branchTooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    if (header === '') {
      header = 'temp header';
    }
    if (text === '') {
      text = 'temp text';
    }

    dispatch({
      type: "CREATE-TODO",
      branch: num,
      header,
      text,
      typ,
      start_date: new Date(),
      end_date: date,
    })
    setHeader('');
    setText('');
    setType(TodoType.Normal);
    setDate(null);
  };

  return (
    <div className="NewTodoTooltip">
      <label>
        할 일
        <input value={header} onChange={e => setHeader(e.target.value)}/>
      </label>
      <label>
        내용
        <textarea value={text} onChange={e => setText(e.target.value)}/>
      </label>
      <label>
        타입
        <svg style={{display: "block", margin: "3px auto", cursor: "pointer"}} width="120" height="20">
          <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="1" fill="white" onClick={() => setType(TodoType.Normal)}/>
          <circle cx="40" cy="10" r="9" stroke="black" strokeWidth="1" fill="yellow" onClick={() => setType(TodoType.Warning)}/>
          <circle cx="70" cy="10" r="9" stroke="black" strokeWidth="1" fill="orange" onClick={() => setType(TodoType.Important)}/>
          <circle cx="100" cy="10" r="9" stroke="black" strokeWidth="1" fill="red" onClick={() => setType(TodoType.MUST)}/>
        </svg>
      </label>
      <label>
        기한
        <DatePicker style={{width: "80px"}} selected={date} onChange={setDate} />
      </label>
      <span className="btn" onClick={(e) => onNewTodo(e, props.data.index, header, text)}>new todo</span>
    </div>
  );
}

export default NewTodoTooltip;
