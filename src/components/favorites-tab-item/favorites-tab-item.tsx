type FavoritesTabItemProps = {
  cityName: string;
};

function FavoritesTabItem({ cityName }: FavoritesTabItemProps): JSX.Element {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoritesTabItem;
