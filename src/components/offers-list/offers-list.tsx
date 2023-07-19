import { PlaceCard } from '../place-card/place-card';
import { OfferType } from '../types/offer';

type OffersListProps = {
  cardsCount: number;
  offers: OfferType[];
}

export function OffersList({ cardsCount, offers }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">

      {Array.from({ length: cardsCount }, (_, i) => <PlaceCard key={i} offer={offers[i]} />)}

    </div>
  );
}
