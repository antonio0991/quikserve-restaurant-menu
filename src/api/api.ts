import axios, { AxiosResponse } from 'axios';
import { IMenu } from '../models/IMenu';
import { IVenue } from '../models/IVenue';
import { MENU_DETAILS, VENUE_DETAILS } from '../utils/urlUtil';

const instance = axios.create({
  baseURL: '',
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const VenueService = {
  getVenue: (): Promise<IVenue> => requests.get(VENUE_DETAILS),
  getMenu: (): Promise<IMenu> => requests.get(MENU_DETAILS),
};
