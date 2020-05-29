import React, {MutableRefObject, useState} from 'react';
import ReactTooltip from "react-tooltip";
import {useTodoDispatch} from "../../context/Todo.context";
import {Tip} from "../Tooltip";

function EditBranchTooltip(props: {branchTooltip: MutableRefObject<any>, data: Tip}) {
  const [header, setHeader] = useState('');
  const dispatch = useTodoDispatch();

  const onEditBranch = (e: React.MouseEvent, num: number, name: string) => {
    e.preventDefault();
    const current = props.branchTooltip.current;
    current!.tooltipRef = null;
    ReactTooltip.hide();
    if (name === '') {
      name = 'temp branch';
    }
    dispatch({
      type: "EDIT-BRANCH",
      index: num,
      name,
    });
    setHeader('');
  };

  return (
    <div className="EditBranchTooltip">
      <label>
        Branch Name
        <input value={header} onChange={e => setHeader(e.target.value)}/>
      </label>
      <span className="btn" onClick={(e) => onEditBranch(e, props.data.index, header)}>edit branch</span>
    </div>
  );
}

export default EditBranchTooltip;
