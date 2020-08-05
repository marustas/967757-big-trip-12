import {MONTHS} from '../constant';

export const createTripDaysItem = (tripDay, count) => {
  const month = MONTHS[new Date(tripDay).getMonth()];
  const dateNum = new Date(tripDay).getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${tripDay}">${month} ${dateNum}</time>
      </div>
    </li>`
  );
};
