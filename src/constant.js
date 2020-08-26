const TYPES_OF_ACTIVITY = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const ACTIVITIES_BY_TYPE = {
  transports: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  places: [`check-in`, `sightseeing`, `restaurant`],
};

const NUMBER_OF_EVENTS_PER_DAY = 4;

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export {TYPES_OF_ACTIVITY, ACTIVITIES_BY_TYPE, NUMBER_OF_EVENTS_PER_DAY, FilterType};
