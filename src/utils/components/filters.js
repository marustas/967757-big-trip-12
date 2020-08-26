import {FilterType} from "../../constant";

const getEventsAccordingCurrentTime = (events, date, filterType) => {
  return events.filter((event) => {
    const searchedDate = filterType === FilterType.FUTURE ? event.dateFrom : event.dateTo;

    if (!searchedDate) {
      return false;
    }

    return filterType === FilterType.FUTURE ? searchedDate.getTime() > date.getTime() : searchedDate.getTime() < date.getTime();
  });
};

const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getEventsAccordingCurrentTime(events, nowDate, FilterType.FUTURE);
    case FilterType.PAST:
      return getEventsAccordingCurrentTime(events, nowDate, FilterType.PAST);
  }

  return events;
};

export {getEventsAccordingCurrentTime, getEventsByFilter};
