import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setOffers, setSortType, sortOffersByHighPrice, sortOffersByLowPrice, sortOffersByTopRated } from '../../store/offers-process/offers-process';
import { useState, MouseEvent, memo } from 'react';
import { SortType } from '../../const';
import { getActiveSortType, getOffersBackup } from '../../store/offers-process/selectors';

const SortOptionsComponent = () => {
  const optionsNames = Object.values(SortType);
  const [isOpened, setIsOpened] = useState(false);
  const activeSortType = useAppSelector(getActiveSortType);
  const dispatch = useAppDispatch();
  const originalOffers = useAppSelector(getOffersBackup);

  const handleClick = (item: string) => {
    switch (item) {
      case SortType.Popular:
        dispatch(setSortType(SortType.Popular));
        dispatch(setOffers(originalOffers));
        break;
      case SortType.PriceToHigh:
        dispatch(setSortType(SortType.PriceToHigh));
        dispatch(sortOffersByLowPrice());
        break;
      case SortType.PriceToLow:
        dispatch(setSortType(SortType.PriceToLow));
        dispatch(sortOffersByHighPrice());
        break;
      case SortType.TopRated:
        dispatch(setSortType(SortType.TopRated));
        dispatch(sortOffersByTopRated());
        break;
    }
  };

  const handleSpanClick = (evt: MouseEvent<HTMLFormElement>) => {
    evt.stopPropagation();
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={handleSpanClick} >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {
          optionsNames.map((item) => (
            <li className={`places__option ${item === activeSortType ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={item}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </form>
  );
};

export const SortOptions = memo(SortOptionsComponent);

