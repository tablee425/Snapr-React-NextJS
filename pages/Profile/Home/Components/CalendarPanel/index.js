import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NormalDayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { DivColumn } from '~/components';
import { Media } from '~/utils/constants';

import NavBar from './NavBar';
import EventCell from './EventCell';
import './styles.css';

const WEEKDAYS_SHORT = 'S_M_T_W_T_F_S'.split('_');

class CalendarPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isSelectDisabled && nextProps.isSelectDisabled) {
      this.setState({ selectedDay: undefined });
    }
  }

  handleDayClick = day => {
    this.setState({ selectedDay: day });

    this.props.onSelectDate(day);
  };

  render() {
    return (
      <Container>
        <Title>Calendar</Title>
        <Divider />
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
          navbarElement={<NavBar />}
          firstDayOfWeek={1}
          weekdaysShort={WEEKDAYS_SHORT}
          renderDay={day => EventCell(day, this.props.calendarData)}
          onMonthChange={this.props.onMonthChange}
        />
      </Container>
    );
  }
}

const Container = DivColumn.extend`
  flex: none;
  align-items: center;
`;

const Title = styled.div`
  margin-bottom: 45px;
  font-size: 21px;

  ${Media.phone`
    margin-bottom: 15px;
  `};
`;

export const Divider = styled.div`
  align-self: stretch;
  height: 1px;
  background-color: #979797;
`;

const DayPicker = styled(NormalDayPicker)`
  margin: 25px 30px 0;

  ${Media.desktop`
    margin: 10px 0 0;
  `};
`;

CalendarPanel.propTypes = {
  calendarData: PropTypes.array,
  onSelectDate: PropTypes.func,
  onMonthChange: PropTypes.func,
  isSelectDisabled: PropTypes.bool,
};

export default CalendarPanel;
