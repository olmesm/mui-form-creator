import update from "immutability-helper";
import { useReducer } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { DndList } from "./components/dnd-list";

export type Item = {
  id: number;
  text: string;
};

type State = Item[];
type Action =
  | { type: "move"; payload: { dragIndex: number; hoverIndex: number } }
  | { type: "remove" };

const INITIAL_STATE: State = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
      <DndList
        cards={state}
        setCards={(payload: { dragIndex: number; hoverIndex: number }) =>
          dispatch({ type: "move", payload })
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
