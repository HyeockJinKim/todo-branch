import React, {useEffect, useState} from 'react';
import ReactTooltip from "react-tooltip";
import './Tooltip.css'
import {useBranchState, useTodoDispatch} from "../context/Todo.context";

type ToolTipRef = { tooltipRef: null } | null;

enum Input {
  None,
  Todo,
  Branch,
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
  const onNewTodo = (e: React.MouseEvent, num: string, header: string, text: string) => {
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
      branch: parseInt(num),
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
  const onNewBranch = (e: React.MouseEvent, num: string, name: string) => {
    e.preventDefault();
    const current: ToolTipRef = branchTooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    if (name === '') {
      name = 'temp branch';
    }
    dispatch({
      type: "CREATE-BRANCH",
      branch: parseInt(num),
      name,
    })
  };
  const onMerge = (e: React.MouseEvent, num: string) => {
    e.preventDefault();
    const current: ToolTipRef = branchTooltip.current;
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
                    type={'light'} delayHide={300} delayUpdate={300} getContent={(data) => (
        circleInfo(data)
      )}>
      </ReactTooltip>
      <ReactTooltip ref={branchTooltip} id='create_tooltip' place='right' effect='solid' clickable={true}
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
