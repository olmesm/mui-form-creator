import update from "immutability-helper";
import { useReducer } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { DndList } from "./components/dnd-list";
import { Button } from "@mui/material";

export type Item = {
  id: number;
  text: string;
};

type State = Item[];
type Action =
  | { type: "move"; payload: { dragIndex: number; hoverIndex: number } }
  | { type: "remove"; payload: { id: number } }
  | { type: "add" };

const INITIAL_STATE: State = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add": {
      const highestIndex = state.reduce(
        (a, { id }) => (a > id ? a : id + 1),
        1
      );
      return update(state, {
        $push: [
          {
            id: highestIndex,
            text: "New Item",
          } as Item,
        ],
      });
    }
    case "remove": {
      const index = state.findIndex(({ id }) => id === action.payload.id);

      if (index === -1) {
        return state;
      }

      return update(state, {
        $splice: [[index, 1]],
      });
    }
    case "move": {
      const { dragIndex, hoverIndex } = action.payload;

      return update(state, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, state[dragIndex] as Item],
        ],
      });
    }
    default:
      return { ...state };
  }
};

export const Component = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <Button variant="outlined" onClick={() => dispatch({ type: "add" })}>
        Add
      </Button>

      <DndList
        cards={state}
        setCards={(payload: { dragIndex: number; hoverIndex: number }) =>
          dispatch({ type: "move", payload })
        }
        removeCard={(payload: { id: number }) =>
          dispatch({ type: "remove", payload })
        }
      />

      <AceEditor
        style={{ border: "1px solid black" }}
        readOnly
        mode="json"
        theme="github"
        value={JSON.stringify(state, null, 2)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};
