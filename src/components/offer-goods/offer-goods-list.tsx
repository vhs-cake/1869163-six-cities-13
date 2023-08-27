import { memo } from 'react';

type OfferGoodsListProps = {
  goods: string[];
};

function OfferGoodsList({ goods }: OfferGoodsListProps): JSX.Element {
  return (
    <ul className="offer__inside-list">
      {goods.map((goodsItem) => (
        <li key={goodsItem} className="offer__inside-item">
          {goodsItem}
        </li>
      ))}
    </ul>
  );
}

const OfferGoodsListMemo = memo(OfferGoodsList);

export default OfferGoodsListMemo;
