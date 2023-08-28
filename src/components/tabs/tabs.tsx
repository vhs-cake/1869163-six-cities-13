import { memo } from 'react';
import TabItem from './tab-item';

type TabsProps = {
  cities?: string[];
};

function Tabs({ cities }: TabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities?.map((cityName) => (
            <TabItem cityName={cityName} key={cityName} />
          ))}
        </ul>
      </section>
    </div>
  );
}

const TabsMemo = memo(Tabs);

export default TabsMemo;
