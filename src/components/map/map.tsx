import { useEffect, useRef } from 'react';
import leaflet, { Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { CardType } from '../../types/offer';
import { CityType } from '../../types/city';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { ChosenOfferType } from '../../types/chosen-offer';

type MapProps = {
  cards: CardType[];
  activeCard: CardType | null;
  chosenOffer: ChosenOfferType | null;
  city: CityType;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ cards, city, activeCard, chosenOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

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
            activeCard && activeCard?.id === card.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, cards, activeCard, city, chosenOffer]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default Map;
