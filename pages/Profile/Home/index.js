import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { DivRow, AppLayout, YellowButton, DivColumn, Avatar } from '~/components';
import { OrderRequest, AuthRequest } from '~/utils/services';
import { loadUserSuccess } from '~/utils/redux/actions';
import { makeSelectUser } from '~/utils/redux/selectors';
import { getFirstTimeOfMonth } from '~/utils/utils';
import { Media } from '~/utils/constants';

import { Header, AvatarPanel, CalendarPanel, JobPanel } from './Components';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: props.calendarData,
      title: 'Upcoming Jobs',
      selectedMonth: new Date(),
    };
  }

  onSelectDate = date => {
    this.setState({ title: 'Jobs', selectedDate: date, search: undefined });
  };

  onSearch = value => {
    this.setState({
      title: value ? 'Job Search Results' : 'Upcoming Jobs',
      search: value,
      selectedDate: undefined,
    });
  };

  onUpcomingJobs = () => {
    this.setState({ title: 'Upcoming Jobs', selectedDate: undefined, search: undefined });
  };

  onJobRemove = calendarData => {
    this.setState({ calendarData });
  };

  onMonthChange = async month => {
    let jobs;
    try {
      jobs = (await OrderRequest.getCalendarList(getFirstTimeOfMonth(moment(month).add(-1, 'month')))).jobs;
    } finally {
      this.setState({ calendarData: jobs || [], selectedMonth: month });
    }
  };

  render() {
    return (
      <AppLayout noHeader withLayout>
        <Header value={this.state.search} onSearch={this.onSearch}>
          <AvatarPanel
            user={this.props.user}
            onUpcomingJobs={this.onUpcomingJobs}
            showUpcoming={!!this.state.selectedDate || !!this.state.search}
          />
        </Header>

        <Content>
          <CalendarPanel
            calendarData={this.state.calendarData}
            onSelectDate={this.onSelectDate}
            isSelectDisabled={!this.state.selectedDate}
            onMonthChange={this.onMonthChange}
          />
          <JobPanel
            title={this.state.title}
            filter={this.state.search}
            selectedDate={this.state.selectedDate}
            onJobRemove={this.onJobRemove}
            currentMonth={this.state.selectedMonth}
          />
        </Content>
      </AppLayout>
    );
  }
}

const Content = DivRow.extend`
  position: relative;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 15px;

  ${Media.tablet`
    flex-direction: column;
    align-items: center;
  `};
`;

Home.getInitialProps = async ({ ctx }) => {
  const promises = [];
  promises.push(OrderRequest.getCalendarList(getFirstTimeOfMonth(moment().add(-1, 'month')), ctx));

  if (!ctx.store.getState().global.user) {
    promises.push(AuthRequest.signInWithToken(ctx));
  }

  const [{ jobs }, user] = await Promise.all(promises);
  if (user) {
    ctx.store.dispatch(loadUserSuccess(user.profile));
  }

  return { calendarData: jobs };
};

Home.propTypes = {
  calendarData: PropTypes.array,
  user: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(Home);
