
const createDaysData = (events) => {
  return Array.from(new Set(events.map((event) => event.dateFrom.toDateString()))).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map((date, i) => {
    return {
      date: new Date(date),
      dayNumber: ++i,
    };
  });
};

export {createDaysData};
