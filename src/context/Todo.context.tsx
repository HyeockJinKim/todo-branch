import React, {createContext, Dispatch, useContext, useReducer} from 'react';

export type Todo = {
  x: number;
  parent: number[];
  header: string,
  text: string,
  success: boolean,
};

export type Branch = {
  parent: number;
  name: string;
  todo: Todo[];
  is_merge: boolean;
  y: number;
};

export type TodoBranch = {
  branches: Branch[];
  global_x: number;
}

type TodoState = TodoBranch;

const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action =
  | { type: 'CREATE-TODO'; header: string, text: string, branch: number }
  | { type: 'CREATE-BRANCH'; branch: number, name: string }
  | { type: 'SUCCESS'; id: number[] }
  | { type: 'MERGE'; branch: number };

type TodoDispatch = Dispatch<Action>;
const TodoDispatchContext = createContext<TodoDispatch | undefined>(
  undefined
);

function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'CREATE-TODO':
      console.log(state)
      // TODO: 현재 첫 노드는 예외 발생 가능
      if (isNaN(action.branch) || action.branch == null)
        return state;
      state.branches[action.branch].todo.push({
        x: state.global_x++,
        parent: [action.branch, state.branches[action.branch].todo.length - 1],
        header: action.header,
        text: action.text,
        success: false,
      })
      return {...state};
    case "CREATE-BRANCH":
      if (isNaN(action.branch) || action.branch == null)
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
          success: false,
        }],
        is_merge: false,
        y: target_y + 1,
      })
      return {...state};
    case "SUCCESS":
      if (isNaN(action.id[0]) || action.id[0] == null || isNaN(action.id[1]) || action.id[1] == null)
        return state;
      state.branches[action.id[0]].todo[action.id[1]].success = !state.branches[action.id[0]].todo[action.id[1]].success;
      return {...state};
    case 'MERGE':
      // TODO: Merge 기능 미구현
      if (isNaN(action.branch) || action.branch == null)
        return state;
      return {...state};
    default:
      throw new Error('Unhandled action');
  }
}

export function TodoContextProvider({children}: { children: React.ReactNode }) {
  const [todo, dispatch] = useReducer(todoReducer, {
    branches: [
      {
        parent: 0,
        name: "Master",
        todo: [
          {
            x: 0,
            parent: [0, 0],
            header: "Initial Header",
            text: "Initial Text",
            success: false,
          },
          {
            x: 1,
            parent: [0, 0],
            header: "Second Header",
            text: "Second Text",
            success: false,
          }],
        is_merge: false,
        y: 0,
      },
      {
        parent: 0,
        name: "Second",
        todo: [
          {
            x: 2,
            parent: [0, 0],
            header: "First Branch",
            text: "First Branch Text",
            success: false,
          }
        ],
        is_merge: false,
        y: 1,
      }
    ],
    global_x: 3,
  });

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
