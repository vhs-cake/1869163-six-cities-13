import { CommentType } from './types/comment';
import { CardType } from './types/offer';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getFormattedDate = (date: string) => {
  const parsedDate = new Date(date);

  const year = parsedDate.getUTCFullYear();
  const month = monthNames[parsedDate.getMonth()];

  return `${month} ${year}`;
};

export function sortByDate(a: CommentType, b: CommentType) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getUpdatedCards(
  id: string,
  updatedCard: CardType,
  cardsToUpdate: CardType[],
  forceIgnorePushToUpdate?: boolean
) {
  if (
    !cardsToUpdate.some((card) => card.id === id) &&
    !forceIgnorePushToUpdate
  ) {
    cardsToUpdate.push(updatedCard);
  }

  const updatedCards = cardsToUpdate.map((card) => {
    if (card.id === updatedCard.id) {
      return updatedCard;
    }
    return card;
  });

  return updatedCards;
}
