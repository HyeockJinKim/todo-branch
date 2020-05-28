import React, {useEffect, useState} from 'react';
import ReactTooltip from "react-tooltip";
import './Tooltip.css'
import {useBranchState, useTodoDispatch} from "../context/Todo.context";

type ToolTipRef = { tooltipRef: null } | null;
type Tip = {
  name: string;
  index: number;
}

enum Input {
  None,
  Todo,
  Branch,
  Edit,
}

enum CircleTooltip {
  Info,
  Edit,
}

function ToolTip() {
  const branchTooltip = React.useRef(null);
  const [inputs, setInput] = useState(Input.None);
  const [circleTooltip, setCircleTooltip] = useState(CircleTooltip.Info);
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');
  const [infoHeader, setInfoHeader] = useState('');
  const [infoText, setInfoText] = useState('');
  const branches = useBranchState();
  const dispatch = useTodoDispatch();

  const resetAll = () => {
    setHeader('');
    setText('');
    setInput(Input.None);
  }

  const onNewTodo = (e: React.MouseEvent, num: number, header: string, text: string) => {
    e.preventDefault();
    const current: ToolTipRef = branchTooltip.current;
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
    })
  };
  const onEditTodo = (e: React.MouseEvent, x: number, y: number, header: string, text: string) => {
    e.preventDefault();
    dispatch({
      type: "EDIT-TODO",
      x,
      y,
      header,
      text,
    })
    setCircleTooltip(CircleTooltip.Info);
  };
  const onNewBranch = (e: React.MouseEvent, num: number, name: string) => {
    e.preventDefault();
    const current: ToolTipRef = branchTooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    if (name === '') {
      name = 'temp branch';
    }
    dispatch({
      type: "CREATE-BRANCH",
      branch: num,
      name,
    })
  };
  const onEditBranch = (e: React.MouseEvent, num: number, name: string) => {
    e.preventDefault();
    const current: ToolTipRef = branchTooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    if (name === '') {
      name = 'temp branch';
    }
    dispatch({
      type: "EDIT-BRANCH",
      index: num,
      name,
    })
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
    case Input.None:
      todoInputs = (data: Tip) => (
        <div>
          <span className="btn" onClick={() => setInput(Input.Todo)}>new todo</span>
          <span className="btn" onClick={() => setInput(Input.Branch)}>new branch</span>
          <span className="btn" onClick={(e) => onMerge(e, data.index)}>merge</span>
          <span className="btn" onClick={() => setInput(Input.Edit)}>Edit</span>
        </div>
      );
      break;
    case Input.Todo:
      todoInputs = (data: Tip) => (
        <div>
          <label>
            Header
            <input value={header} onChange={e => setHeader(e.target.value)}/>
          </label>
          <label>
            Text
            <input value={text} onChange={e => setText(e.target.value)}/>
          </label>
          <span className="btn" onClick={(e) => onNewTodo(e, data.index, header, text)}>new todo</span>
        </div>
      )
      break;
    case Input.Branch:
      todoInputs = (data: Tip) => (
        <div>
          <label>
            Branch Name
            <input value={header} onChange={e => setHeader(e.target.value)}/>
          </label>
          <span className="btn" onClick={(e) => onNewBranch(e, data.index, header)}>new branch</span>
        </div>
      )
      break;
    case Input.Edit:
      todoInputs = (data: Tip) => (
        <div>
          <label>
            Branch Name
            <input value={header} onChange={e => setHeader(e.target.value)}/>
          </label>
          <span className="btn" onClick={(e) => onEditBranch(e, data.index, header)}>edit branch</span>
        </div>
      )
      break;
    default:
      throw new Error('Unhandled action');
  }

  let circleInfo = (data: string) => {
    let header = '';
    let text = '';
    if (data !== null) {
      let tip = JSON.parse(data);
      const todo = branches[tip.y].todo[tip.x];
      header = todo.header;
      text = todo.text;
      setInfoHeader(todo.header);
      setInfoText(todo.text);
    }
    return (
      <div>
        <h3>{header}</h3>
        <span>{text}</span>
        <span className="btn" onClick={() => setCircleTooltip(CircleTooltip.Edit)}>edit</span>
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

  if (circleTooltip === CircleTooltip.Edit) {
    circleInfo = (data: string) => {
      let tip = JSON.parse(data);

      return (
        <div>
          <label>
            Header
            <input value={infoHeader} onChange={e => setInfoHeader(e.target.value)}/>
          </label>
          <label>
            Text
            <input value={infoText} onChange={e => setInfoText(e.target.value)}/>
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
      <ReactTooltip id='todo_tooltip' effect='solid' border={true} place="bottom"
                    type={'light'} delayHide={500} delayUpdate={300} getContent={(data) => (
        circleInfo(data)
      )}>
      </ReactTooltip>
      <ReactTooltip ref={branchTooltip} id='create_tooltip' place='right' effect='solid' clickable={true}
                    type={'light'} globalEventOff='click' afterHide={resetAll}
                    getContent={(data) => branchToolTipContent(data)}>
      </ReactTooltip>
    </div>
  );
}

export default ToolTip;
