import { useEffect, useState } from "react";
import useKeyPress from "./useKeyPress";

function shiftList(oldList, startIndex) {
  let newList = [];
  let ol = [...oldList];
  let s =
    startIndex < 0
      ? (startIndex % oldList.length) + oldList.length
      : startIndex;
  for (let i = s; i < oldList.length + s; i++) {
    let n = i % ol.length;
    newList.push(ol[n]);
  }
  return newList;
}

export default function VertArrowScrollList({
  items,
  ListItemComponent,
  setSelection,
}) {
  const up = useKeyPress("w");
  const down = useKeyPress("s");
  const [selected, setSelected] = useState(0);
  const [biteSized, setBiteSized] = useState([
    ...shiftList(items, selected).slice(0, 3),
  ]);

  useEffect(() => {
    if (up) {
      if (items.length > 3) {
        setBiteSized([...shiftList(items, selected - 1).slice(0, 3)]);
        setSelection(items[(selected + items.length) % items.length]);
        setSelected((selected - 1 + items.length) % items.length);
      } else {
        if (selected > 0) {
          setSelection(items[selected - 1]);

          setSelected(selected - 1);
        }
      }
    }
  }, [up]);

  useEffect(() => {
    if (down) {
      // if (selected < items.length - 1) {
      //   setSelected(selected + 1);
      // }
      if (items.length > 3) {
        setBiteSized([...shiftList(items, selected + 1).slice(0, 3)]);
        setSelection(items[(selected + 2) % items.length]);

        setSelected((selected + 1) % items.length);
      } else {
        if (selected < items.length - 1) {
          setSelection(items[selected + 1]);

          setSelected(selected + 1);
        }
      }
    }
  }, [down]);

  if (items.length < 4) {
    return (
      <>
        {items.map((element, index) => (
          <ListItemComponent
            key={index}
            index={index + 1}
            item={element}
            selected={index === selected}
          />
        ))}
      </>
    );
  }

  return (
    <div className="scroll-list-wrapper">
      <div>...</div>
      {[...biteSized].map((element, index) => (
        <ListItemComponent
          key={element.address + element.tokenId}
          index={((selected + items.length + index) % items.length) + 1}
          item={element}
          selected={index === 1}
        />
      ))}
      <div>...</div>
    </div>
  );
}
