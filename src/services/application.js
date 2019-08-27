import { requestServices } from 'services';

const searchApplication = body =>
  requestServices.apiClient.post('application/search', body);

export const applicationService = {
  searchApplication,
};
