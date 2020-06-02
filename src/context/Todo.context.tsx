import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import TodoBranch from "../components/TodoBranch";

export enum TodoType {
  Initial,
  Normal,
  Merge,
  MUST,
  Warning,
  Important,
  Plan,
}

export type Todo = {
  x: number;
  parent: number[];
  header: string;
  text: string;
  start_date: Date | null;
  end_date: Date | null;
  type: TodoType;
  success: boolean;
};

export enum BranchTooltip {
  None,
  BranchTooltip,
  NewTodo,
  NewBranch,
  EditBranch,
  TodoInfo,
  EditTodo,
}

export type Branch = {
  parent: number;
  name: string;
  todo: Todo[];
  merge_node: number[];
  y: number;
};

type Backup = {
  branches: Branch[];
  global_x: number;
}

export type TodoBranch = {
  branches: Branch[];
  global_x: number;
  history: Backup[];
  history_index: number;
}

type TodoState = TodoBranch;

const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action =
  | { type: 'CREATE-TODO'; header: string, text: string, branch: number, typ: TodoType, start_date: Date | null, end_date: Date | null }
  | { type: 'CREATE-BRANCH'; branch: number, name: string }
  | { type: 'SUCCESS'; id: number[] }
  | { type: 'EDIT-TODO'; header: string, text: string, x: number, y: number, typ: TodoType, start_date: Date | null, end_date: Date | null }
  | { type: 'EDIT-BRANCH'; index: number, name: string }
  | { type: 'MERGE'; branch: number }
  | { type: 'UNDO'; }
  | { type: 'REDO'; }
  | { type: 'REMOVE'; y: number, x: number }
  | { type: 'REMOVE-BRANCH'; y: number };

type TodoDispatch = Dispatch<Action>;
const TodoDispatchContext = createContext<TodoDispatch | undefined>(
  undefined
);

function history_save(state: TodoState) {
  state.history_index++;
  state.history.splice(state.history_index, state.history.length - state.history_index, JSON.parse(JSON.stringify(state)));
}

function todoReducer(state: TodoState, action: Action): TodoState {

  switch (action.type) {
    case 'CREATE-TODO': {
      if (isNaN(action.branch) || action.branch == null || state.branches[action.branch].merge_node.length !== 0)
        return state;
      history_save(state);
      state.branches[action.branch].todo.push({
        x: state.global_x++,
        parent: [action.branch, state.branches[action.branch].todo.length - 1],
        header: action.header,
        text: action.text,
        type: action.typ,
        start_date: action.start_date,
        end_date: action.end_date,
        success: false,
      });
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "CREATE-BRANCH": {
      if (isNaN(action.branch) || action.branch == null || state.branches[action.branch].merge_node.length !== 0)
        return state;
      history_save(state);
      const target_y = state.branches[action.branch].y;
      state.branches = state.branches.map(branch => {
        if (branch.y > target_y)
          branch.y++;
        return branch;
      });
      state.branches.push({
        parent: action.branch,
        name: action.name,
        todo: [{
          x: state.global_x++,
          parent: [action.branch, state.branches[action.branch].todo.length - 1],
          header: 'First Plan',
          text: 'Initial State',
          type: TodoType.Initial,
          start_date: new Date(),
          end_date: null,
          success: false,
        }],
        merge_node: [],
        y: target_y + 1,
      });
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "SUCCESS": {
      if (isNaN(action.id[0]) || action.id[0] == null || isNaN(action.id[1]) || action.id[1] == null)
        return state;
      history_save(state);
      state.branches[action.id[0]].todo[action.id[1]].success = !state.branches[action.id[0]].todo[action.id[1]].success;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "EDIT-TODO": {
      history_save(state);
      const target = state.branches[action.y].todo[action.x];
      target.header = action.header;
      target.text = action.text;
      target.type = action.typ;
      target.start_date = action.start_date;
      target.end_date = action.end_date;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "EDIT-BRANCH": {
      history_save(state);
      const branch = state.branches[action.index];
      branch.name = action.name;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case 'MERGE': {
      if (isNaN(action.branch) || action.branch == null || action.branch === 0 || state.branches[action.branch].merge_node.length !== 0)
        return state;
      history_save(state);
      const target_branch = state.branches[action.branch];
      const parent = target_branch.parent;
      target_branch.merge_node = [parent, state.branches[parent].todo.length];
      state.branches[parent].todo.push({
        x: state.global_x++,
        parent: [parent, state.branches[parent].todo.length - 1],
        header: target_branch.name + " Merged!",
        text: target_branch.name + " Merged!",
        type: TodoType.Merge,
        start_date: target_branch.todo[0].start_date,
        end_date: new Date(),
        success: true,
      });
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "UNDO": {
      if (state.history_index < 0)
        return state;
      let states = state.history.splice(state.history_index--, 1, JSON.parse(JSON.stringify(state)));
      const undo_state = states[0];
      state.branches = undo_state.branches;
      state.global_x = undo_state.global_x;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "REDO": {
      if (state.history_index >= state.history.length - 1)
        return state;
      state.history_index++;
      let states = state.history.splice(state.history_index, 1, JSON.parse(JSON.stringify(state)));
      const redo_state = states[0];
      state.branches = redo_state.branches;
      state.global_x = redo_state.global_x;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "REMOVE": {
      let target = state.branches[action.y].todo[action.x];
      if (target.type === TodoType.Merge || target.type === TodoType.Initial)
        return state;
      history_save(state);
      if (target.x+1 === state.global_x)
        state.global_x--;
      state.branches[action.y].todo.splice(action.x, 1);
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "REMOVE-BRANCH": {
      if (action.y === 0)
        return state;
      history_save(state);
      state.branches.splice(action.y, 1);
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    default:
      throw new Error('Unhandled action');
  }
}

export function TodoContextProvider({children}: { children: React.ReactNode }) {
  let item = window.localStorage.getItem("TodoBranch");
  let init;
  if (item === null) {
    init = {
      branches: [
        {
          parent: 0,
          name: "master",
          todo: [
            {
              x: 0,
              parent: [0, 0],
              header: "Initial Header",
              text: "Initial Text",
              type: TodoType.Initial,
              start_date: new Date(),
              end_date: null,
              success: false,
            }
          ],
          merge_node: [],
          y: 0,
        }],
      global_x: 1,
      history: [],
      history_index: -1,
    }
  } else {
    init = JSON.parse(item);
    if (init.history === undefined) {
      init.history = [];
    }
    if (init.history_index === undefined) {
      init.history_index = init.history.length;
    }
  }
  const [todo, dispatch] = useReducer(todoReducer, init);

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={todo}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
}

export function useTodoBranchState() {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error('Todo Branch Provider not found');
  return state;
}

export function useBranchState() {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error('Branch Provider not found');
  return state.branches;
}

export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error('Todo Provider not found');
  return dispatch;
}
