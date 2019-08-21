import axios from 'axios';

const searchApplication = (body, headers) =>
  axios.post('application/search', body, headers);

export const applicationService = {
  searchApplication,
};
