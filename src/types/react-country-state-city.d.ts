declare module 'react-country-state-city' {
  import { FC } from 'react';

  interface BaseSelectProps {
    onChange: (selectedOption: { id: number; name: string }) => void;
    placeHolder: string;
  }

  export const CitySelect: FC<{
    countryid: number;
    stateid: number;
    onChange: (selectedOption: {
      longitude: string;
      latitude: string; id: number; name: string 
}) => void;
    placeHolder: string;
  }>;

  export const CountrySelect: FC<BaseSelectProps>;

  export const StateSelect: FC<{
    countryid: number;
    onChange: (selectedOption: { id: number; name: string }) => void;
    placeHolder: string;
  }>;

}
