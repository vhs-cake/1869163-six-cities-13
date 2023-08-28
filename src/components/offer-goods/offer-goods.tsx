import { memo } from 'react';

type OfferGoodsProps = {
  goods: string[];
};

function OfferGoods({ goods }: OfferGoodsProps): JSX.Element {
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

const OfferGoodsMemo = memo(OfferGoods);

export default OfferGoodsMemo;
