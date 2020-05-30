import React, {useEffect, useState} from 'react';
import ReactTooltip from "react-tooltip";
import './Tooltip.css'
import {TodoType, useBranchState, useTodoDispatch} from "../context/Todo.context";
import NewTodoTooltip from "./tooltip/NewTodoTooltip";
import EditBranchTooltip from "./tooltip/EditBranchTooltip";
import NewBranchTooltip from "./tooltip/NewBranchTooltip";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ToolTipRef = { tooltipRef: null } | null;
export type Tip = {
  name: string;
  index: number;
}

enum BranchTooltip {
  None,
  Todo,
  Branch,
  Edit,
}

enum TodoTooltip {
  Info,
  Edit,
}

function ToolTip() {
  const branchTooltip = React.useRef(null);
  const [inputs, setInput] = useState(BranchTooltip.None);
  const [todoTooltip, setTodoTooltip] = useState(TodoTooltip.Info);
  const [infoHeader, setInfoHeader] = useState('');
  const [infoText, setInfoText] = useState('');
  const [typ, setType] = useState(TodoType.Normal);
  const [date, setDate] = useState<Date | null>(null);
  const branches = useBranchState();
  const dispatch = useTodoDispatch();

  const resetAll = () => {
    setTodoTooltip(TodoTooltip.Info);
    setInput(BranchTooltip.None);
    setDate(null);
  }

  const onEditTodo = (e: React.MouseEvent, x: number, y: number, header: string, text: string) => {
    e.preventDefault();
    dispatch({
      type: "EDIT-TODO",
      x,
      y,
      header,
      text,
      typ,
      start_date: new Date(),
      end_date: date,
    })
    setTodoTooltip(TodoTooltip.Info);
  };
  const onMerge = (e: React.MouseEvent, num: number) => {
    e.preventDefault();
    const current: ToolTipRef = branchTooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    dispatch({
      type: "MERGE",
      branch: num,
    })
  };

  let todoInputs: (data: Tip) => JSX.Element;
  switch (inputs) {
    case BranchTooltip.None:
      todoInputs = (data: Tip) => (
        <div>
          <span className="btn" onClick={() => setInput(BranchTooltip.Todo)}>new todo</span>
          <span className="btn" onClick={() => setInput(BranchTooltip.Branch)}>new branch</span>
          <span className="btn" onClick={(e) => onMerge(e, data.index)}>merge</span>
          <span className="btn" onClick={() => setInput(BranchTooltip.Edit)}>Edit</span>
        </div>
      );
      break;
    case BranchTooltip.Todo:
      todoInputs = (data: Tip) => (
        <NewTodoTooltip branchTooltip={branchTooltip} data={data}/>
      )
      break;
    case BranchTooltip.Branch:
      todoInputs = (data: Tip) => (
        <NewBranchTooltip branchTooltip={branchTooltip} data={data}/>
      )
      break;
    case BranchTooltip.Edit:
      todoInputs = (data: Tip) => (
        <EditBranchTooltip branchTooltip={branchTooltip} data={data}/>
      )
      break;
    default:
      throw new Error('Unhandled action');
  }

  const date_to_string = (d: Date) => {
    if (d === null || d === undefined)
      return '';
    const _date = new Date(d);
    return _date.getFullYear() + '년 ' + (_date.getMonth() + 1) + '월 ' + _date.getDate() + '일';
  }

  let todoTooltipInfo = (data: string) => {
    let header = '';
    let text = '';
    let start_date = '';
    let end_date = '';
    if (data !== null) {
      let tip = JSON.parse(data);
      const todo = branches[tip.y].todo[tip.x];
      console.log(todo);
      header = todo.header;
      text = todo.text;
      start_date = todo.start_date !== null ? date_to_string(todo.start_date) : '~';
      end_date = todo.end_date !== null ? date_to_string(todo.end_date) : '~';
      setInfoHeader(todo.header);
      setInfoText(todo.text);
      setType(todo.type);
    }
    return (
      <div>
        <h3>{header}</h3>
        <span>{text}</span><br/>
        <label>
          시작일
          <span style={{display: "block", textAlign: "center", fontWeight: "normal"}}>{start_date}</span>
        </label>
        <label>
          기한
          <span style={{display: "block", textAlign: "center", fontWeight: "normal"}}>{end_date}</span>
        </label>

        <span className="btn" onClick={() => setTodoTooltip(TodoTooltip.Edit)}>edit</span>
      </div>
    );
  }
  const branchToolTipContent = (data: string) => {
    if (data === null)
      return <div/>;
    let tip = JSON.parse(data);
    return (
      <div>
        <h3>{tip.name} Branch</h3>
        {todoInputs(tip)}
      </div>
    );
  };

  if (todoTooltip === TodoTooltip.Edit) {
    todoTooltipInfo = (data: string) => {
      let tip = JSON.parse(data);

      return (
        <div>
          <label>
            할 일
            <input value={infoHeader} onChange={e => setInfoHeader(e.target.value)}/>
          </label>
          <label>
            내용
            <textarea value={infoText} onChange={e => setInfoText(e.target.value)}/>
          </label>
          <label>
            타입
            <svg style={{display: "block", margin: "3px auto", cursor: "pointer"}} width="120" height="20">
              <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="1" fill="white"
                      onClick={() => setType(TodoType.Normal)}/>
              <circle cx="40" cy="10" r="9" stroke="black" strokeWidth="1" fill="yellow"
                      onClick={() => setType(TodoType.Warning)}/>
              <circle cx="70" cy="10" r="9" stroke="black" strokeWidth="1" fill="orange"
                      onClick={() => setType(TodoType.Important)}/>
              <circle cx="100" cy="10" r="9" stroke="black" strokeWidth="1" fill="red"
                      onClick={() => setType(TodoType.MUST)}/>
            </svg>
          </label>
          <label>
            기한
            <DatePicker style={{width: "80px"}} selected={date} onChange={setDate} />
          </label>
          <span className="btn" onClick={(e) => onEditTodo(e, tip.x, tip.y, infoHeader, infoText)}>edit</span>
        </div>
      );
    }
  }
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  return (
    <div>
      <ReactTooltip id='todo_tooltip' effect='solid' border={true} place="bottom" afterHide={resetAll}
                    type={'light'} delayHide={500} delayUpdate={300} getContent={(data) => (todoTooltipInfo(data))}/>
      <ReactTooltip ref={branchTooltip} id='create_tooltip' place='right' effect='solid' clickable={true}
                    type={'light'} globalEventOff='click' afterHide={resetAll}
                    getContent={(data) => branchToolTipContent(data)}/>
    </div>
  );
}

export default ToolTip;
