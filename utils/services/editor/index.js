import { post } from '../request';

export const getEditorImages = async jobId =>
  post({ endPoint: '/editor/work/fetch', data: { jobId }, hasAuth: false });

export const uploadEditorImages = async (jobId, files, onUploadProgress) =>
  post({
    endPoint: '/editor/work/upload',
    data: [...files, { key: 'jobId', value: jobId }],
    hasAuth: false,
    isFile: true,
    onUploadProgress,
  });

export const getFloorPlan = async (jobId, imageId) =>
  post({ endPoint: '/editor/floorplan/work/fetch', data: { jobId, imageId }, hasAuth: false });

export const uploadFloorPlan = async (jobId, imageId, files, onUploadProgress) =>
  post({
    endPoint: '/editor/floorplan/work/upload',
    data: [...files, { key: 'jobId', value: jobId }, { key: 'imageId', value: imageId }],
    hasAuth: false,
    isFile: true,
    onUploadProgress,
  });
