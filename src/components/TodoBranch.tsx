import React from 'react';
import TodoBadgeList from "./branch/TodoBadgeList";
import TodoLineList from "./branch/TodoLineList";
import {useTodoBranchState, useTodoDispatch} from "../context/Todo.context";
import "./TodoBranch.css"
import Timer from "./branch/Timer";

function TodoBranch() {
  const todoBranch = useTodoBranchState();
  const dispatch = useTodoDispatch();
  return (
    <div className="TodoBranch">
      <Timer/>
      <svg onClick={() => dispatch({type: "UNDO"})} className="undo" x="0px" y="0px" width="25px" height="25px"
           viewBox="0 0 438.536 438.536">
        <g>
          <path fill="white" d="M421.125,134.191c-11.608-27.03-27.217-50.347-46.819-69.949C354.7,44.639,331.384,29.033,304.353,17.42
		C277.325,5.807,248.969,0.005,219.275,0.005c-27.978,0-55.052,5.277-81.227,15.843C111.879,26.412,88.61,41.305,68.243,60.531
		l-37.12-36.835c-5.711-5.901-12.275-7.232-19.701-3.999C3.807,22.937,0,28.554,0,36.547v127.907c0,4.948,1.809,9.231,5.426,12.847
		c3.619,3.617,7.902,5.426,12.85,5.426h127.907c7.996,0,13.61-3.807,16.846-11.421c3.234-7.423,1.903-13.988-3.999-19.701
		l-39.115-39.398c13.328-12.563,28.553-22.222,45.683-28.98c17.131-6.757,35.021-10.138,53.675-10.138
		c19.793,0,38.687,3.858,56.674,11.563c17.99,7.71,33.544,18.131,46.679,31.265c13.134,13.131,23.555,28.69,31.265,46.679
		c7.703,17.987,11.56,36.875,11.56,56.674c0,19.798-3.856,38.686-11.56,56.672c-7.71,17.987-18.131,33.544-31.265,46.679
		c-13.135,13.134-28.695,23.558-46.679,31.265c-17.987,7.707-36.881,11.561-56.674,11.561c-22.651,0-44.064-4.949-64.241-14.843
		c-20.174-9.894-37.209-23.883-51.104-41.973c-1.331-1.902-3.521-3.046-6.567-3.429c-2.856,0-5.236,0.855-7.139,2.566
		l-39.114,39.402c-1.521,1.53-2.33,3.478-2.426,5.853c-0.094,2.385,0.527,4.524,1.858,6.427
		c20.749,25.125,45.871,44.587,75.373,58.382c29.502,13.798,60.625,20.701,93.362,20.701c29.694,0,58.05-5.808,85.078-17.416
		c27.031-11.607,50.34-27.22,69.949-46.821c19.605-19.609,35.211-42.921,46.822-69.949s17.411-55.392,17.411-85.08
		C438.536,189.569,432.732,161.22,421.125,134.191z"/>
        </g>
      </svg>
      <svg onClick={() => dispatch({type: "REDO"})} className="redo" x="0px" y="0px" width="25px" height="25px"
           viewBox="0 0 438.536 438.536">
        <g>
          <path fill="white" d="M421.125,134.191c-11.608-27.03-27.217-50.347-46.819-69.949C354.7,44.639,331.384,29.033,304.353,17.42
		C277.325,5.807,248.969,0.005,219.275,0.005c-27.978,0-55.052,5.277-81.227,15.843C111.879,26.412,88.61,41.305,68.243,60.531
		l-37.12-36.835c-5.711-5.901-12.275-7.232-19.701-3.999C3.807,22.937,0,28.554,0,36.547v127.907c0,4.948,1.809,9.231,5.426,12.847
		c3.619,3.617,7.902,5.426,12.85,5.426h127.907c7.996,0,13.61-3.807,16.846-11.421c3.234-7.423,1.903-13.988-3.999-19.701
		l-39.115-39.398c13.328-12.563,28.553-22.222,45.683-28.98c17.131-6.757,35.021-10.138,53.675-10.138
		c19.793,0,38.687,3.858,56.674,11.563c17.99,7.71,33.544,18.131,46.679,31.265c13.134,13.131,23.555,28.69,31.265,46.679
		c7.703,17.987,11.56,36.875,11.56,56.674c0,19.798-3.856,38.686-11.56,56.672c-7.71,17.987-18.131,33.544-31.265,46.679
		c-13.135,13.134-28.695,23.558-46.679,31.265c-17.987,7.707-36.881,11.561-56.674,11.561c-22.651,0-44.064-4.949-64.241-14.843
		c-20.174-9.894-37.209-23.883-51.104-41.973c-1.331-1.902-3.521-3.046-6.567-3.429c-2.856,0-5.236,0.855-7.139,2.566
		l-39.114,39.402c-1.521,1.53-2.33,3.478-2.426,5.853c-0.094,2.385,0.527,4.524,1.858,6.427
		c20.749,25.125,45.871,44.587,75.373,58.382c29.502,13.798,60.625,20.701,93.362,20.701c29.694,0,58.05-5.808,85.078-17.416
		c27.031-11.607,50.34-27.22,69.949-46.821c19.605-19.609,35.211-42.921,46.822-69.949s17.411-55.392,17.411-85.08
		C438.536,189.569,432.732,161.22,421.125,134.191z"/>
        </g>
      </svg>

      <div className="box">
        <svg style={{
          width: todoBranch.global_x * 50 + 500,
          height: todoBranch.branches.length * 50 + 400,
          margin: '2em 10%'
        }}>
          <TodoLineList/>
          <TodoBadgeList/>
        </svg>
      </div>
    </div>
  );
}

export default TodoBranch;
