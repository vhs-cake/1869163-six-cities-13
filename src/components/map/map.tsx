import { useEffect, useRef } from 'react';
import leaflet, { Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { CardType } from '../../types/offer';
import { CityType } from '../../types/city';
import { NameSpace, UrlMarker } from '../../const';
import { useAppSelector } from '../../hooks';

type MapProps = {
  cards: CardType[];
  city: CityType;
  isOfferPage: boolean;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.Default,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.Current,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

function Map({ cards, city, isOfferPage }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  const activeCard = useAppSelector(
    (state) => state[NameSpace.Cities].activeCard
  );
  const chosenOffer = useAppSelector(
    (state) => state[NameSpace.Data].chosenOffer
  );

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      if (chosenOffer) {
        const marker = new Marker({
          lat: chosenOffer.location.latitude,
          lng: chosenOffer.location.longitude,
        });

        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      cards?.forEach((card) => {
        const marker = new Marker({
          lat: card.location.latitude,
          lng: card.location.longitude,
        });

        marker
          .setIcon(
            !isOfferPage && activeCard?.id === card.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, cards, activeCard, city, chosenOffer, isOfferPage]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default Map;
