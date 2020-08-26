import {createMonthDayFormat} from "../common";

const getCost = (events) => {
  const totalByBasePrice = events.reduce((acc, cur) => acc + cur.basePrice, 0);
  const totalByAdditionalOffersPrice = events.reduce((acc, cur) => acc + cur.offers.offers.reduce((accO, curO) => accO + curO.isChecked ? curO.price : 0, 0), 0);
  return {
    totalByBasePrice: events.length > 0 ? totalByBasePrice : 0,
    totalByAdditionalOffersPrice: events.length > 0 ? totalByAdditionalOffersPrice : 0,
    sumTotal: events.length > 0 ? totalByBasePrice + totalByAdditionalOffersPrice : 0,
  };
};

const getRoutePointsString = (events) => {
  const routePoints = Array.from(new Set(events.map((it) => it.destination.name)));
  return events.length > 3 ?
    `${routePoints[0]} &mdash; ... &mdash; ${routePoints[routePoints.length - 1]}` :
    `${routePoints[0]} &mdash; ${routePoints[Math.floor(routePoints.length / 2)]} &mdash; ${routePoints[routePoints.length - 1]}`;
};

const getTravelDatesString = (events) => {
  return `${createMonthDayFormat(events[0].dateFrom)}&nbsp;&mdash;&nbsp;${createMonthDayFormat(events[events.length - 1].dateTo)}`;
};

const createRouteAndCostData = (events) => {
  return {
    cost: getCost(events),
    pointsString: events.length > 0 ? getRoutePointsString(events) : ``,
    travelDatesString: events.length > 0 ? getTravelDatesString(events) : ``,
  };
};

export {createRouteAndCostData};
