import React from 'react';
import { Conference } from 'redux-store/_types';

type ConferenceItemProps = { conference: Conference };

const ConferenceItem = ({ conference }: ConferenceItemProps) => {
  return <div>{conference.name}</div>;
};

export default ConferenceItem;
