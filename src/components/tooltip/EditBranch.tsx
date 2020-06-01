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

  const onEditBranch = (e: React.MouseEvent, num: number, name: string) => {
    e.preventDefault();
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

  let index = 0;
  if (props.dataTip !== null)
    index = JSON.parse(props.dataTip).y;

  return (
    <div className="EditBranchTooltip">
      <label>
        Branch Name
        <input value={header} onChange={e => setHeader(e.target.value)}/>
      </label>
      <span className="btn" onClick={(e) => onEditBranch(e, index, header)}>
        {props.tooltipType === BranchTooltip.EditBranch ? "edit branch" : "new branch"}
      </span>
    </div>
  )
}

export default EditBranch;
