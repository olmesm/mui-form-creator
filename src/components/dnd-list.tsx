import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container, Props } from "./container";

export const DndList = (props: Props) => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container {...props} />
      </DndProvider>
    </>
  );
};
