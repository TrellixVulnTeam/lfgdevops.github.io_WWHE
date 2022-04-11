export default function NFTListItem({ element, selected }) {
  return (
    <div className={`nft-list-item${selected ? "-selected" : ""}`}>- Poop</div>
  );
}
