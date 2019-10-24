import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import NormalCircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

import { DivRow, DivColumn, YellowButton } from '~/components';
import { OrderRequest } from '~/utils/services';
import {
  MakeCancelable,
  generateRandomString,
  pushRoute,
  getFirstTimeOfMonth,
  setDateHour,
} from '~/utils/utils';
import { aryColorStatus, Media } from '~/utils/constants';
import { openAlertDialog } from '~/utils/redux/actions';

import { Divider } from '../CalendarPanel';

class JobPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      hasMoreItems: true,
      listKey: 'random',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDate !== nextProps.selectedDate || this.props.filter !== nextProps.filter) {
      this.setState({ hasMoreItems: true, jobs: [], listKey: generateRandomString() });
    }
  }

  componentWillUnmount() {
    if (this.jobPromise) {
      this.jobPromise.cancel();
    }
  }

  loadItems = page => {
    if (this.jobPromise) {
      this.jobPromise.cancel();
    }
    const { selectedDate, filter } = this.props;
    if (filter) {
      this.jobPromise = MakeCancelable(OrderRequest.getJobAll(filter, page));
    } else if (selectedDate) {
      const firstTime = setDateHour(selectedDate, 0);
      const lastTime = moment(firstTime).add(1, 'day');
      this.jobPromise = MakeCancelable(OrderRequest.getJobByDate(firstTime, lastTime, page));
    } else {
      this.jobPromise = MakeCancelable(
        OrderRequest.getUpcomingJobs(getFirstTimeOfMonth(this.props.currentMonth), page),
      );
    }

    this.jobPromise.promise
      .then(response => {
        const newJobs = response.jobs;
        if (newJobs.length === 0) {
          this.setState({
            hasMoreItems: false,
          });
        } else {
          const { jobs } = this.state;
          this.setState({
            jobs: jobs.concat(newJobs),
            hasMoreItems: jobs.length === 15,
          });
        }
      })
      .catch(err => {
        this.setState({ hasMoreItems: false });
      });
  };

  onCancelJob = async id => {
    this.props.dispatch(
      openAlertDialog({
        description: 'Are you sure to cancel order permanently?',
        noLabel: 'No',
        yesLabel: 'Yes',
        yesAction: async () => {
          await this.onDeleteJob(id);
        },
      }),
    );
  };

  onDeleteJob = async id => {
    this.setState({ [id]: true });

    try {
      const calendarData = await OrderRequest.jobClose(id, getFirstTimeOfMonth(this.props.currentMonth));
      this.props.onJobRemove(calendarData.jobs);

      const { jobs } = this.state;
      _.remove(jobs, job => job.jobId === id);
      this.setState({ jobs });
    } catch (err) {
      this.setState({ [id]: false });
      this.props.dispatch(openAlertDialog({ description: err.message }));
    }
  };

  renderItem = job => {
    const editPossible = job.jobStatus < 3 && !job.reviewPossible;
    return (
      <JobWrapper key={job.jobId}>
        <JobCircle status={job.jobStatus} />
        <DateWrapper>
          <div>
            {moment(job.startTime).format('HHmm')} - {moment(job.endTime).format('HHmm')}
          </div>
          <div>{moment(job.startTime).format('DD/MM/YYYY')}</div>
        </DateWrapper>

        <InfoWrapper>
          <InfoAddress style={{ fontSize: 17 }} lineHeight={27}>
            {job.address}
          </InfoAddress>
          <InfoAddress lineHeight={20}>{job.product.join(' + ')}</InfoAddress>
        </InfoWrapper>

        <ButtonWrapper>
          <YellowButton
            onClick={() => pushRoute(`/order/detail/${job.jobId}`)}
            disabled={this.state[job.jobId]}
          >
            Details
          </YellowButton>

          {editPossible && (
            <YellowButton onClick={() => pushRoute(`/order/${job.jobId}`)} disabled={this.state[job.jobId]}>
              Edit
            </YellowButton>
          )}

          {job.jobStatus < 3 && (
            <YellowButton onClick={() => this.onCancelJob(job.jobId)} loading={this.state[job.jobId]}>
              Cancel
            </YellowButton>
          )}
        </ButtonWrapper>
      </JobWrapper>
    );
  };

  render() {
    return (
      <Container>
        <TitleWrapper>
          <Title>{this.props.title}</Title>
          {this.props.selectedDate && (
            <SubTitle>{moment(this.props.selectedDate).format('Do MMMM YYYY')}</SubTitle>
          )}
        </TitleWrapper>
        <Divider />

        <ListWrapper key={this.state.listKey}>
          <InfiniteList
            loadMore={this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={<CircularProgress key="loading" size={30} />}
            useWindow={false}
          >
            {this.state.jobs.map(job => this.renderItem(job))}
          </InfiniteList>
        </ListWrapper>
      </Container>
    );
  }
}

const Container = DivColumn.extend`
  align-items: center;
  margin: 0 10px 0 20px;
  max-width: 570px;

  ${Media.tablet`
    margin: 10px 0 0;
    width: 100%;
  `};
`;

const TitleWrapper = DivColumn.extend`
  flex: none;
  align-items: center;
  height: 72px;
`;

const Title = styled.div`
  font-size: 21px;
`;

const SubTitle = styled.div`
  font-size: 19px;
  margin-top: 5px;
`;

const ListWrapper = styled.div`
  flex: 1;
  position: relative;
  align-self: stretch;
  overflow: auto;
  min-height: 400px;
`;

const InfiniteList = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

const JobWrapper = DivRow.extend`
  align-items: center;
  border-bottom: 1px solid #979797;
  padding: 10px 0 10px 5px;
`;

const DateWrapper = DivColumn.extend`
  flex: none;
  width: 110px;
  color: #888686;

  ${Media.phone`
    width:80px;
  `};
`;

const InfoAddress = styled.div`
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: ${({ lineHeight }) => lineHeight * 2}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
`;

const InfoWrapper = DivColumn.extend`
  margin-right: 10px;
  overflow: hidden;
  
  ${InfoAddress} + ${InfoAddress} {
    margin-top: 7px;
  }
`;

const ButtonWrapper = DivRow.extend`
  flex: none;

  ${YellowButton} {
    width: 70px;
  }
  ${YellowButton} + ${YellowButton} {
    margin-left: 10px;
  }
  
  ${Media.desktop`
    flex-direction: column;
    
    ${YellowButton} + ${YellowButton} {
      margin: 5px 0 0;
    }
  `};
`;

const CircularProgress = styled(NormalCircularProgress)`
  && {
    margin: 7px 0;
    align-self: center;
  }
`;

const JobCircle = styled.div`
  width: 11px;
  height: 11px;
  margin-right: 10px;
  border: 1px solid #979797;
  border-radius: 7.5px;
  background-color: ${({ status }) => aryColorStatus[status]};

  ${Media.phone`
    margin-right: 1px;
  `};
`;

JobPanel.propTypes = {
  selectedDate: PropTypes.object,
  filter: PropTypes.string,
  title: PropTypes.string,
  currentMonth: PropTypes.object,
  dispatch: PropTypes.func,
  onJobRemove: PropTypes.func,
};

export default connect()(JobPanel);
