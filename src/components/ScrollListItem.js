import TypeAnimation from "react-type-animation";

export default function ScrollListItem({ item, index, selected }) {
  let className = "scroll-list-item";
  if (selected) {
    className = "scroll-list-item-selected";
  }
  const { name, tokenId } = item;
  return (
    <div className={className}>
      {(index ? index : 0).toString() +
        ". " +
        name.toString() +
        " #" +
        tokenId.toString()}
      {/* <TypeAnimation cursor={false} sequence={[item.toString()]} wrapper="p" /> */}
    </div>
  );
}
