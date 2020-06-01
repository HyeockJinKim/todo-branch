import React, {useState} from 'react';
import {BranchTooltip, useTodoDispatch} from "../../context/Todo.context";
import './Tooltip.css'

type EditBranchProps = {
  dataTip: string | null;
  tooltipType: BranchTooltip;
  setTooltip: (BranchTooltip) => void;
}

function EditBranch(props: EditBranchProps) {
  const [header, setHeader] = useState('');
  const dispatch = useTodoDispatch();

  const onEditBranch = (num: number, name: string) => {
    if (name === '') {
      name = 'temp branch';
    }
    if (props.tooltipType === BranchTooltip.EditBranch)
      dispatch({type: "EDIT-BRANCH", index: num, name});
    else
      dispatch({type: "CREATE-BRANCH", branch: num, name})

    setHeader('');
    props.setTooltip(BranchTooltip.None);
  };

  const enter_key = (e: React.KeyboardEvent) => {
    if (!e.shiftKey) {
      if (e.key === 'Enter') {
        onEditBranch(index, header);
      }
    }
  }

  let index = 0;
  if (props.dataTip !== null)
    index = JSON.parse(props.dataTip).y;

  return (
    <div className="EditBranchTooltip">
      <label>
        Branch Name
        <input value={header} onKeyDown={(e) => enter_key(e)} onChange={e => setHeader(e.target.value)}/>
      </label>
      <span className="btn" onClick={(e) => onEditBranch(index, header)}>
        {props.tooltipType === BranchTooltip.EditBranch ? "edit branch" : "new branch"}
      </span>
    </div>
  )
}

export default EditBranch;
