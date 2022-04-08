import { useEffect, useState } from "react";
import useKeyPress from "./useKeyPress";

export default function ArrowScrollList({ items, ListItemComponent }) {
  const up = useKeyPress(38);
  const down = useKeyPress(40);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (up) {
      if (selected > 0) {
        setSelected(selected - 1);
      }
    }
  }, [up]);

  useEffect(() => {
    if (down) {
      if (selected < items.length - 1) {
        setSelected(selected + 1);
      }
    }
  }, [down]);

  return (
    <>
      {items.map((element, index) => (
        <ListItemComponent item={element} selected={index === selected} />
      ))}
    </>
  );
}
