import React from 'react';
import './App.css';
import TodoBranch from "./components/TodoBranch";
import {TodoContextProvider} from "./context/Todo.context";
import ToolTip from "./components/tooltip/Tooltip";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoContextProvider>
          <TodoBranch/>
          <ToolTip/>
        </TodoContextProvider>
      </header>
    </div>
  );
}

export default App;
