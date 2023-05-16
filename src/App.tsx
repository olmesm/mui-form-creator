import { useReducer } from "react";
import { Button } from "@mui/material";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

type State = Record<string, unknown>;
type Action = { type: "add" } | { type: "remove" };

const INITIAL_STATE: State = {};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add": {
      return { ...state, [Date.now()]: true };
    }
    case "remove": {
      const ks = Object.keys(state);
      ks.pop();

      return Object.fromEntries(ks.map((k) => [k, state[k]]));
    }
    default:
      return { ...state };
  }
};

export const Component = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <Button variant="contained" onClick={() => dispatch({ type: "add" })}>
        Add
      </Button>
      <Button variant="contained" onClick={() => dispatch({ type: "remove" })}>
        Remove
      </Button>

      <AceEditor
        style={{ border: "1px solid black" }}
        readOnly
        mode="json"
        theme="github"
        value={JSON.stringify(state)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};
