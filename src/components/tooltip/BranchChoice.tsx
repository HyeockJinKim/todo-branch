import React from 'react';
import {BranchTooltip, useBranchState, useTodoDispatch} from "../../context/Todo.context";
import './Tooltip.css'

type BranchChoiceProps = {
  dataTip: string | null;
  setTooltip: (BranchTooltip) => void;
}

function BranchChoice(props: BranchChoiceProps) {
  const branches = useBranchState();
  const dispatch = useTodoDispatch();

  const onMerge = (e: React.MouseEvent, num: number) => {
    e.preventDefault();
    dispatch({
      type: "MERGE",
      branch: num,
    });
    props.setTooltip(BranchTooltip.None);
  };
  const onRemove = () => {
    if (props.dataTip !== null) {
      const tip = JSON.parse(props.dataTip);
      dispatch({type: "REMOVE-BRANCH", y: tip.y})
    }
    props.setTooltip(BranchTooltip.None);
  }
  let can_remove = true;
  let name = '';
  let index = 0;
  if (props.dataTip !== null) {
    let tip = JSON.parse(props.dataTip);
    if (tip.y < branches.length) {
      name = branches[tip.y].name;
      index = tip.y;
      can_remove = index !== 0;
    }
  }
  return (
    <div>
      <h3>{name} Branch</h3>
      <span className="btn" onClick={() => props.setTooltip(BranchTooltip.NewTodo)}>new todo</span>
      <span className="btn" onClick={() => props.setTooltip(BranchTooltip.NewBranch)}>new branch</span>
      <span className="btn" onClick={e => onMerge(e, index)}>merge</span>
      <span className="btn" onClick={() => props.setTooltip(BranchTooltip.EditBranch)}>Edit</span>
      {can_remove ? <span className="btn" onClick={() => onRemove()}>remove</span> : <div/>}
    </div>
  );
}

export default BranchChoice;
