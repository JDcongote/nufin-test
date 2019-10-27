import React from 'react';
import './TeamItem.scss';
import { Team } from 'redux-store/_types';

type TeamItemProps = { team: Team; select: (team: Team) => void };

const TeamItem = ({ team, select }: TeamItemProps) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    select(team);
  }
  return (
    <div className="team-item">
      <div className="team-item__header">
        <h3 className="school-name">{team.school}</h3>
      </div>
      <div className="team-item__content">
        <aside className="logo">
          <img className="logo-image" src={team.logos[0]}></img>
        </aside>
        <table className="detail">
          <tbody>
            <tr>
              <td id="mascot-label">Mascot: </td>
              <td aria-labelledby="mascot-label">{team.mascot}</td>
            </tr>
            <tr>
              <td id="division-label">Division: </td>
              <td aria-labelledby="division-label">{team.division}</td>
            </tr>
            <tr>
              <td id="conference-label">Conference: </td>
              <td aria-labelledby="conference-label">{team.conference}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="team-item__footer">
        <button onClick={handleClick}>Details</button>
      </div>
    </div>
  );
};

export default TeamItem;
