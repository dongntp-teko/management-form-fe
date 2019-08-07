// @flow
import React from 'react';
import moment from 'moment';
import { dateTimeConstants } from 'constant';

const { DATE_TIME_FORMAT, DATE_FORMAT, TIME_FORMAT, TIME_WITHOUT_SECOND } = dateTimeConstants;
const formatDateTime = (time: string) => moment(time).format(DATE_TIME_FORMAT);

const formatDate = (time: string) => moment(time).format(DATE_FORMAT);

const formatTime = (time: string) => moment(time).format(TIME_FORMAT);

const formatTimeWithoutSecond = (time: string) =>
  moment(time).format(TIME_WITHOUT_SECOND);


const toDateTimeFormat = (datetime: string) => {
  if (!datetime) return null;
  try {
    const miliseconds = Date.parse(datetime);
    const mm = moment(miliseconds);
    return (
      <div className="text-center">
        {mm.format(DATE_FORMAT)}
        <br />
        {mm.format(TIME_FORMAT)}
      </div>
    );
  } catch (error) {
    return null;
  }
};

const getMinutesInDay = (time: moment) => {
  if (!time) return 0;
  return time.hour() * 60 + time.minute();
};

const formatTimeStringWithoutSecond = (time: string) => moment(time, TIME_FORMAT).format(TIME_WITHOUT_SECOND)

export default {
  formatDateTime,
  formatDate,
  formatTime,
  formatTimeWithoutSecond,
  toDateTimeFormat,
  getMinutesInDay,
  formatTimeStringWithoutSecond,
};
