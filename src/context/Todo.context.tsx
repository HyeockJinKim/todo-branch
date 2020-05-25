import React, {createContext, Dispatch, useContext, useReducer} from 'react';

let x: number = 3;

export type Todo = {
  x: number;
  parent: number[];
  header: string,
  text: string,
};

export type Branch = {
  y: number;
  todo: Todo[];
  is_merge: boolean;
};

type TodoState = Branch[];

const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action =
  | { type: 'CREATE-TODO'; header: string, text: string, branch: number }
  | { type: 'REMOVE'; id: number[] };

type TodoDispatch = Dispatch<Action>;
const TodoDispatchContext = createContext<TodoDispatch | undefined>(
  undefined
);

function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'CREATE-TODO':
      // TODO: 현재 첫 노드는 예외 발생 가능
      state[action.branch].todo.push({
        x: x++,
        parent: [action.branch, state[action.branch].todo.length-1],
        header: action.header,
        text: action.text,
      })
      return state;
    case 'REMOVE':
      // TODO: Branch 첫 노드는 삭제 불가능하게 할지, 브렌치를 지울지?
      state[action.id[0]].todo.splice(action.id[1], 1);
      return state;
    default:
      throw new Error('Unhandled action');
  }
}

export function TodoContextProvider({ children }: { children: React.ReactNode }) {
  const [todo, dispatch] = useReducer(todoReducer, [
    {
      todo: [
        {
          x: 0,
          parent: [0, 0],
          header: "Initial Header",
          text: "Initial Text",
        },
        {
          x: 1,
          parent: [0, 0],
          header: "Second Header",
          text: "Second Text",
        }],
      y: 0,
      is_merge: false,
    },
    {
      todo: [
        {
          x: 2,
          parent: [0, 0],
          header: "First Branch",
          text: "First Branch Text",
        }
      ],
      y: 1,
      is_merge: false,
    }
  ]);

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={todo}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  );
}

export function useTodoState() {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error('Todo Provider not found');
  return state;
}

export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error('Todo Provider not found');
  return dispatch;
}