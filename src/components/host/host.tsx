import { FullOfferType } from '../types/full-offer';

type HostProps = {
  offer: FullOfferType;
}

export function Host({ offer }: HostProps) {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
          <img
            className="offer__avatar user__avatar"
            src={offer.host.avatarUrl}
            width={74}
            height={74}
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{offer.host.name}</span>
        <span className={`offer__user-status ${offer.host.isPro ? '' : 'visually-hidden'}`}>Pro</span>
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {offer.description}
        </p>
      </div>
    </div>
  );
}
