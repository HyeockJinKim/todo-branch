import React, {MutableRefObject, useState} from 'react';
import ReactTooltip from "react-tooltip";
import {useTodoDispatch} from "../../context/Todo.context";
import {Tip} from "../Tooltip";

function NewBranchTooltip(props: {branchTooltip: MutableRefObject<any>, data: Tip}) {
  const [header, setHeader] = useState('');
  const dispatch = useTodoDispatch();

  const onNewBranch = (e: React.MouseEvent, num: number, name: string) => {
    e.preventDefault();
    const current = props.branchTooltip.current;
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
    setHeader('');
  };

  return (
    <div className="NewBranchTooltip">
      <label>
        Branch Name
        <input value={header} onChange={e => setHeader(e.target.value)}/>
      </label>
      <span className="btn" onClick={(e) => onNewBranch(e, props.data.index, header)}>new branch</span>
    </div>
  );
}

export default NewBranchTooltip;
