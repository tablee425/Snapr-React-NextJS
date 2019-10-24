import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import NoSSR from 'react-no-ssr';

import styled from 'styled-components';

import { DivRow, DivColumn } from '~/components';
import { aryColorStatus, Media } from '~/utils/constants';
import { pushRoute } from '~/utils/utils';

const EventCell = (day, calendarData) => {
  const timeData = _.filter(calendarData, item => moment(day).isSame(item.startTime, 'day'));

  return (
    <Container>
      <NoSSR>{getEventContent(timeData)}</NoSSR>
      <span>{day.getDate()}</span>
    </Container>
  );
};

const paddingEvent = 1;
const sizeEvent = 11;
const CALENDAR_DAY_SIZE = 65;
const CALENDAR_DAY_MOBILE_SIZE = 45;
const gapEvent = calendarSize => (calendarSize - paddingEvent * 2 - sizeEvent * 3) / 2 + sizeEvent;

const getEventContent = timeData => {
  if (timeData.length === 0) {
    return null;
  }

  const aryEventCells = Array(8);
  const sortedData = _.sortBy(timeData, item => item.startTime);

  const onClickYellow = (e, orderId) => {
    e.stopPropagation();
    pushRoute(`/order/detail/${orderId}`);
  };

  _.forEach(sortedData, item => {
    const startDate = moment(moment(item.startTime).format('HH:mm'), 'HH:mm');
    startDate.set({ hour: ((startDate.hours() - 9) % 12) + 9 });
    for (const [index, separator] of arySeparators.entries()) {
      if (startDate.isBefore(separator.limit)) {
        if (!aryEventCells[index]) {
          aryEventCells[index] = [];
        }
        aryEventCells[index].push(
          <YellowCircle
            key={aryEventCells[index].length}
            marginX={separator.marginX ? separator.marginX * aryEventCells[index].length : 0}
            marginY={separator.marginY ? separator.marginY * aryEventCells[index].length : 0}
            x={separator.x}
            y={separator.y}
            index={aryEventCells[index].length}
            status={item.jobStatus}
            onClick={e => onClickYellow(e, item.jobId)}
          />,
        );
        break;
      }
    }
  });

  return (
    <EventContainer>
      {_.map(aryEventCells, aryEventCell => aryEventCell && aryEventCell.reverse())}
    </EventContainer>
  );
};

const Container = DivRow.extend`
  width: ${CALENDAR_DAY_SIZE}px;
  height: ${CALENDAR_DAY_SIZE}px;
  align-items: center;
  justify-content: center;

  @media (max-width: 470px) {
    width: ${CALENDAR_DAY_MOBILE_SIZE}px;
    height: ${CALENDAR_DAY_MOBILE_SIZE}px;
  }
`;

const YellowCircle = styled.div`
  position: absolute;
  left: ${({ marginX, x }) => x * gapEvent(CALENDAR_DAY_SIZE) + marginX * 3}px;
  top: ${({ marginY, y }) => y * gapEvent(CALENDAR_DAY_SIZE) + marginY * 3}px;
  width: ${sizeEvent}px;
  height: ${sizeEvent}px;
  border: 1px solid #979797;
  border-radius: 7.5px;
  background-color: ${({ status }) => aryColorStatus[status]};

  @media (max-width: 470px) {
    left: ${({ marginX, x }) => x * gapEvent(CALENDAR_DAY_MOBILE_SIZE) + marginX * 3}px;
    top: ${({ marginY, y }) => y * gapEvent(CALENDAR_DAY_MOBILE_SIZE) + marginY * 3}px;
  }
`;

const EventContainer = DivColumn.extend`
  position: absolute;
  left: ${paddingEvent}px;
  right: ${paddingEvent}px;
  top: ${paddingEvent}px;
  bottom: ${paddingEvent}px;
`;

const arySeparators = [
  { limit: moment('10:31', 'HH:mm'), marginX: 1, x: 0, y: 0 },
  { limit: moment('12:01', 'HH:mm'), marginX: 1, x: 1, y: 0 },
  { limit: moment('13:31', 'HH:mm'), marginY: 1, x: 2, y: 0 },
  { limit: moment('15:01', 'HH:mm'), marginY: 1, x: 2, y: 1 },
  { limit: moment('16:31', 'HH:mm'), marginX: -1, x: 2, y: 2 },
  { limit: moment('18:01', 'HH:mm'), marginX: -1, x: 1, y: 2 },
  { limit: moment('19:31', 'HH:mm'), marginY: -1, x: 0, y: 2 },
  { limit: moment('21:01', 'HH:mm'), marginY: -1, x: 0, y: 1 },
];

export default EventCell;
