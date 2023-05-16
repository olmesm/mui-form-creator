import { Card } from "./card";
import type { Item } from "../App";

const style = {
  width: 400,
};

export interface Props {
  cards: Item[];
  setCards: (payload: { dragIndex: number; hoverIndex: number }) => void;
  removeCard: (payload: { id: number }) => void;
}

export const Container = ({
  cards,
  setCards,
  removeCard,
}: Props): JSX.Element => {
  const moveCard = (dragIndex: number, hoverIndex: number) =>
    setCards({ dragIndex, hoverIndex });

  return (
    <>
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            removeCard={() => removeCard({ id: card.id })}
          />
        ))}
      </div>
    </>
  );
};
