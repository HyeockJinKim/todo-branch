import React, {useEffect, useRef, useState} from 'react';
import ReactTooltip from "react-tooltip";
import './Tooltip.css'
import {BranchTooltip} from "../../context/Todo.context";
import EditTodo from "./EditTodo";
import 'react-datepicker/dist/react-datepicker.css';
import BranchChoice from "./BranchChoice";
import EditBranch from "./EditBranch";
import TodoInfo from "./TodoInfo";

function useOutsideAlerter(ref, setTooltip) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        const current = ref.current;
        current!.tooltipRef = null;
        ReactTooltip.hide();
        setTooltip(BranchTooltip.None);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setTooltip]);
}

function ToolTip() {
  const branchTooltip = useRef(null);
  const [tooltipType, setTooltip] = useState(BranchTooltip.BranchTooltip);
  useOutsideAlerter(branchTooltip, setTooltip);
  console.log();
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const tooltipContent = (data) => {
    if (data !== null) {
      const dataTip = JSON.parse(data);
      if ((tooltipType === BranchTooltip.None || tooltipType === BranchTooltip.BranchTooltip || tooltipType === BranchTooltip.TodoInfo)
        && dataTip.type !== tooltipType) {
        setTooltip(dataTip.type);
      }
    }
    switch (tooltipType) {
      case BranchTooltip.None:
        return <div/>;
      case BranchTooltip.BranchTooltip:
        return <BranchChoice setTooltip={(tooltipType) => setTooltip(tooltipType)} dataTip={data}/>
      case BranchTooltip.NewBranch:
      case BranchTooltip.EditBranch:
        return <EditBranch tooltipType={tooltipType} setTooltip={(tooltipType) => setTooltip(tooltipType)}
                           dataTip={data}/>
      case BranchTooltip.NewTodo:
      case BranchTooltip.EditTodo:
        return <EditTodo tooltipType={tooltipType} setTooltip={(tooltipType) => setTooltip(tooltipType)}
                         dataTip={data}/>
      case BranchTooltip.TodoInfo:
        return <TodoInfo setTooltip={(tooltipType) => setTooltip(tooltipType)} dataTip={data}/>;
      default:
        throw new Error('Unhandled action');
    }
  }

  return (
    <div ref={branchTooltip}>
      <ReactTooltip id='tooltip' place='right' effect='solid' clickable={true} type={'light'}
                    getContent={(data) => tooltipContent(data)}/>
    </div>
  )
}

export default ToolTip;
