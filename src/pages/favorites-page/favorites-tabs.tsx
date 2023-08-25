import FavoritesTabItem from './favorites-tab-item';

type FavoritesTabsProps = {
  cities?: string[];
};

function FavoritesTabs({ cities }: FavoritesTabsProps): JSX.Element {
  return (
    <ul>
      {cities?.map((cityName) => (
        <FavoritesTabItem cityName={cityName} key={cityName} />
      ))}
    </ul>
  );
}

export default FavoritesTabs;
