type OfferGoodsListProps = {
  goods: string[] | undefined;
};

function OfferGoodsList({ goods }: OfferGoodsListProps): JSX.Element {
  return (
    <ul className="offer__inside-list">
      {goods?.map((goodsItem) => (
        <li key={goodsItem} className="offer__inside-item">
          {goodsItem}
        </li>
      ))}
    </ul>
  );
}

export default OfferGoodsList;
