import React, {createContext, Dispatch, useContext, useReducer} from 'react';

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
  header: string,
  text: string,
  type: TodoType
  success: boolean,
};

export type Branch = {
  parent: number;
  name: string;
  todo: Todo[];
  merge_node: number[];
  y: number;
};

export type TodoBranch = {
  branches: Branch[];
  global_x: number;
}

type TodoState = TodoBranch;

const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action =
  | { type: 'CREATE-TODO'; header: string, text: string, branch: number, typ: TodoType }
  | { type: 'CREATE-BRANCH'; branch: number, name: string }
  | { type: 'SUCCESS'; id: number[] }
  | { type: 'EDIT-TODO'; header: string, text: string, x: number, y: number, typ: TodoType }
  | { type: 'EDIT-BRANCH'; index: number, name: string }
  | { type: 'MERGE'; branch: number };

type TodoDispatch = Dispatch<Action>;
const TodoDispatchContext = createContext<TodoDispatch | undefined>(
  undefined
);

function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'CREATE-TODO': {
      if (isNaN(action.branch) || action.branch == null || state.branches[action.branch].merge_node.length !== 0)
        return state;
      state.branches[action.branch].todo.push({
        x: state.global_x++,
        parent: [action.branch, state.branches[action.branch].todo.length - 1],
        header: action.header,
        text: action.text,
        type: action.typ,
        success: false,
      });
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "CREATE-BRANCH": {
      if (isNaN(action.branch) || action.branch == null || state.branches[action.branch].merge_node.length !== 0)
        return state;
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
      state.branches[action.id[0]].todo[action.id[1]].success = !state.branches[action.id[0]].todo[action.id[1]].success;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "EDIT-TODO": {
      const target = state.branches[action.y].todo[action.x];
      target.header = action.header;
      target.text = action.text;
      target.type = action.typ;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case "EDIT-BRANCH": {
      const branch = state.branches[action.index];
      branch.name = action.name;
      window.localStorage.setItem('TodoBranch', JSON.stringify(state));
      return {...state};
    }
    case 'MERGE': {
      if (isNaN(action.branch) || action.branch == null || action.branch === 0 || state.branches[action.branch].merge_node.length !== 0)
        return state;
      const target_branch = state.branches[action.branch];
      const parent = target_branch.parent;
      target_branch.merge_node = [parent, state.branches[parent].todo.length];
      state.branches[parent].todo.push({
        x: state.global_x++,
        parent: [parent, state.branches[parent].todo.length - 1],
        header: target_branch.name + " Merged!",
        text: target_branch.name + " Merged!",
        type: TodoType.Merge,
        success: true,
      });
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
              success: false,
            }
          ],
          merge_node: [],
          y: 0,
        }],
      global_x: 1,
    }
  } else {
    init = JSON.parse(item);
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
