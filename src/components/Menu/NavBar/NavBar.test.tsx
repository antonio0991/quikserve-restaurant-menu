import { render, screen } from '@testing-library/react';
import { IVenue } from '../../../models/IVenue';
import NavBar from './NavBar';

const mockVenue: IVenue = {
  id: 1,
  name: 'Venue 1',
  internalName: 'Venue 1',
  description: null,
  liveFlag: 1,
  demoFlag: 0,
  address1: 'Address 1',
  address2: 'Address 2',
  address3: null,
  city: 'City',
  county: 'County',
  postcode: 'Postcode',
  country: 'Country',
  timezoneOffset: 'GMT',
  locale: 'en',
  timeZone: 'GMT',
  webSettings: {
    id: 1,
    venueId: 1,
    bannerImage: 'banner.png',
    backgroundColour: 'white',
    primaryColour: 'black',
    primaryColourHover: 'grey',
    navBackgroundColour: 'blue',
  },
  ccy: 'USD',
  ccySymbol: '$',
  currency: 'USD',
};

describe('NavBar', () => {
  test('renders correctly', () => {
    render(<NavBar venue={mockVenue} />);

    expect(screen.getByText(/menu/i)).toBeInTheDocument();
  });
});
