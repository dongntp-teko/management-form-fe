import axios from 'axios';

const searchApplication = request =>
  axios.post('application/search', {
    ...request,
  });

export const applicationService = {
  searchApplication,
};
