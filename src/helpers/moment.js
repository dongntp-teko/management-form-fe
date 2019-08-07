import moment from 'moment/moment';
// import momentDurationFormatSetup from 'moment-duration-format';

// momentDurationFormatSetup(moment);

const DATE_FORMAT_CLIENT = 'DD/MM/YYYY';
const MONTH_FORMAT_CLIENT = 'MM/YYYY';
const DATETIME_FORMAT_CLIENT = 'DD/MM/YYYY HH:mm:ss';
const DATE_FORMAT_SERVER = 'YYYY-MM-DD';
const DATETIME_FORMAT_SERVER = 'YYYY-MM-DD HH:mm:ss';
const DATETIME_FORMAT_SERV3R = 'YYYY-MM-DDTHH:mm:ss';

const parseServerDateToClientMoment = serverDate =>
  serverDate ? moment(serverDate, DATETIME_FORMAT_SERV3R) : null;

const parseServerDateToClientDate = serverDate =>
  serverDate
    ? moment(serverDate, DATETIME_FORMAT_SERV3R).format(DATE_FORMAT_CLIENT)
    : '';
const parseServerDateToClientDateTime = serverDate =>
  serverDate
    ? moment(serverDate, DATETIME_FORMAT_SERV3R).format(DATETIME_FORMAT_CLIENT)
    : '';

const parseClientMomentToServerDate = clientMoment =>
  clientMoment ? clientMoment.format(DATE_FORMAT_SERVER) : '';
const parseClientMomentToServerDateTime = clientMoment =>
  clientMoment ? clientMoment.format(DATETIME_FORMAT_SERVER) : '';

const parseMomentToClientDate = clientMoment =>
  clientMoment ? clientMoment.format(DATE_FORMAT_CLIENT) : '';
const parseMomentToClientDateTime = clientMoment =>
  clientMoment ? clientMoment.format(DATETIME_FORMAT_CLIENT) : '';

const convertSecondToTime = second =>
  moment.duration(second, 'seconds').format('H:mm:ss', { trim: !second });
const getWeekRange = () => [moment().add(-6, 'days'), moment()];

export const momentFormat = {
  DATETIME_FORMAT_CLIENT,
  DATE_FORMAT_CLIENT,
  DATE_FORMAT_SERVER,
  MONTH_FORMAT_CLIENT,
};

export const momentRangeKeys = {
  today: 'Today',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  last7days: 'Last 7 days',
  last30days: 'Last 30 days',
};

export const momentRanges = {
  [momentRangeKeys.today]: [moment(), moment()],
  [momentRangeKeys.thisWeek]: [moment().startOf('isoWeek'), moment()],
  [momentRangeKeys.thisMonth]: [moment().startOf('month'), moment()],
  [momentRangeKeys.last7days]: [moment().add(-6, 'days'), moment()],
  [momentRangeKeys.last30days]: [moment().add(-29, 'days'), moment()],
};

export const momentHelper = {
  parseServerDateToClientMoment,

  parseServerDateToClientDate,
  parseServerDateToClientDateTime,

  parseClientMomentToServerDate,
  parseClientMomentToServerDateTime,

  parseMomentToClientDate,
  parseMomentToClientDateTime,

  convertSecondToTime,
  getWeekRange,
};
