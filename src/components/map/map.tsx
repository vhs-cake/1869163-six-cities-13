import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
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

function Map({ cards, city, activeCard, chosenOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

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

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      if (chosenOffer) {
        leaflet
          .marker(
            {
              lat: chosenOffer.location.latitude,
              lng: chosenOffer.location.longitude,
            },
            {
              icon: currentCustomIcon,
            }
          )
          .addTo(map);
      }

      cards.forEach((card) =>
        leaflet
          .marker(
            {
              lat: card.location.latitude,
              lng: card.location.longitude,
            },
            {
              icon:
                card.id === activeCard?.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map)
      );
    }
  }, [
    activeCard?.id,
    cards,
    chosenOffer,
    city.location.latitude,
    city.location.longitude,
    city.location.zoom,
    currentCustomIcon,
    defaultCustomIcon,
    map,
  ]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default Map;
