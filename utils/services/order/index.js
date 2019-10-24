import { post } from '../request';

export const getCalendarList = async (firstTime, ctx) =>
  post({ endPoint: '/job/get/calendar/client', data: { firstTime }, hasAuth: true, ctx });

export const getUpcomingJobs = async (firstTime, page, pageSize = 15) =>
  post({ endPoint: '/client/job/upcoming', data: { firstTime, page, pageSize }, hasAuth: true });

export const getJobByDate = async (firstTime, lastTime, page, pageSize = 15) =>
  post({ endPoint: '/job/get/client', data: { firstTime, lastTime, page, pageSize }, hasAuth: true });

export const getJobAll = async (filter, page, pageSize = 15) =>
  post({ endPoint: '/job/get/client/all', data: { filter, page, pageSize }, hasAuth: true });

export const getJobDetail = async (id, ctx) =>
  post({ endPoint: '/client/job/detail/id', data: { id }, hasAuth: true, ctx });

export const jobClose = async (jobId, firstTime) =>
  post({ endPoint: '/job/close', data: { jobId, firstTime }, hasAuth: true });

export const getOrderInfo = async ctx =>
  post({ endPoint: '/client/get/orderinfo', data: null, hasAuth: true, ctx });

export const createJob = async (values, isDraft) =>
  post({ endPoint: '/job/create', data: { ...values, draft: isDraft ? 0 : 1 }, hasAuth: true });

export const editJob = async values => post({ endPoint: '/job/edit', data: values, hasAuth: true });

export const reviewJob = async values =>
  post({ endPoint: '/client/review/set', data: values, hasAuth: true });

export const requestNewUpload = async jobId =>
  post({ endPoint: '/client/request/reupload', data: { jobId }, hasAuth: true });

export const requestToEdit = async (jobId, imageIds) =>
  post({ endPoint: '/client/edit/request', data: { jobId, imageIds }, hasAuth: true });

export const postJob = async id => post({ endPoint: '/client/job/post', data: { id }, hasAuth: true });

export const downloadJob = async jobId =>
  post({ endPoint: '/client/job/download', data: { jobId }, hasAuth: true });

export const downloadEPC = async jobId =>
  post({ endPoint: '/client/epc/download', data: { jobId }, hasAuth: true });

export const downloadFloorPlan = async jobId =>
  post({ endPoint: '/client/fp/download', data: { jobId }, hasAuth: true });

export const requestToEditFP = async (jobId, fpNote) =>
  post({ endPoint: '/client/edit/floorPlan/request', data: { jobId, fpNote }, hasAuth: true });
