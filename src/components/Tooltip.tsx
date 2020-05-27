import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";
import './Tooltip.css'
import {useBranchState, useTodoDispatch} from "../context/Todo.context";

type ToolTipRef = { tooltipRef: null } | null;

enum Input {
  None,
  Todo,
  Branch,
}

function ToolTip() {
  const tooltip = React.useRef(null);
  const [inputs, setInput] = useState(Input.None);
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');
  const branches = useBranchState();
  const dispatch = useTodoDispatch();

  const resetAll = () => {
    setHeader('');
    setText('');
    setInput(Input.None);
  }
  const onNewTodo = (e: React.MouseEvent, num: string, header: string, text: string) => {
    e.preventDefault();
    const current: ToolTipRef = tooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    dispatch({
      type: "CREATE-TODO",
      branch: parseInt(num),
      header,
      text,
    })
  };
  const onNewBranch = (e: React.MouseEvent, num: string, name: string) => {
    e.preventDefault();
    const current: ToolTipRef = tooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    dispatch({
      type: "CREATE-BRANCH",
      branch: parseInt(num),
      name,
    })
  };
  const onMerge = (e: React.MouseEvent, num: string) => {
    e.preventDefault();
    const current: ToolTipRef = tooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    dispatch({
      type: "MERGE",
      branch: parseInt(num),
    })
  };
  let todoInputs = (data: string) => (
    <div>
      <span className="btn" onClick={(e) => setInput(Input.Todo)}>new todo</span>
      <span className="btn" onClick={(e) => setInput(Input.Branch)}>new branch</span>
      <span className="btn" onClick={(e) => onMerge(e, data)}>merge</span>
    </div>
  );
  if (inputs === Input.Todo) {
    todoInputs = (data: string) => (
      <div>
        <label>
          Header
          <input value={header} onChange={e => setHeader(e.target.value)}/>
        </label>
        <label>
          Text
          <input value={text} onChange={e => setText(e.target.value)}/>
        </label>
        <span className="btn" onClick={(e) => onNewTodo(e, data, header, text)}>new todo</span>
      </div>
    )
  } else if (inputs === Input.Branch) {
    todoInputs = (data: string) => (
      <div>
        <label>
          Branch Name
          <input value={header} onChange={e => setHeader(e.target.value)}/>
        </label>
        <span className="btn" onClick={(e) => onNewBranch(e, data, header)}>new branch</span>
      </div>
    )
  }

  return (
    <div>
      {
        branches.map((branch, y) => (
          branch.todo.map(todo => (
            <ReactTooltip id={'circle_' + y + '_' + todo.x} effect='solid' border={true} place="bottom"
                          type={'light'} delayHide={300} delayUpdate={300}>
              <h3>{todo.header}</h3>
              <span>{todo.text}</span>
            </ReactTooltip>
          ))
        ))
      }
      <ReactTooltip ref={tooltip} id='create_tooltip' place='right' effect='solid' clickable={true}
                    type={'light'} globalEventOff='click' afterHide={resetAll} getContent={(data) => (
        <div>
          <h3>{data} Branch</h3>
          {todoInputs(data)}
        </div>
      )}>
      </ReactTooltip>
    </div>
  );
}

export default ToolTip;
