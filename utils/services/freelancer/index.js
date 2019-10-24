import { post } from '../request';

export const getFreelancerInfo = async (jobId, ctx) =>
  post({ endPoint: '/client/get/freelancer', data: { jobId }, hasAuth: true, ctx });

export const getChatHistory = async (jobId, ctx) =>
  post({ endPoint: '/client/chat/load', data: { jobId }, hasAuth: true, ctx });
