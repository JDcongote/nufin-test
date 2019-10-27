import React from 'react';
import { Team } from 'redux-store/_types';
import './TeamDetail.scss';

type TeamDetailProps = { team: Team; close: () => void };

const TeamDetail = (props: TeamDetailProps) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    props.close();
  }
  return <div onClick={handleClick}>TEAM DETAIL</div>;
};

export default TeamDetail;
