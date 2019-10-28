import React from 'react';
import './Item.scss';
import { Team } from 'redux-store/_types';

type ItemProps = {
  select?: (object: any) => void;
  items: ItemData[];
  title: string;
  image?: string;
  object?: any;
};

export type ItemData = {
  id: string;
  name: string;
};

const Item = ({ title, items, select, image, object }: ItemProps) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    select(object);
  }
  return (
    <div className="team-item">
      <div className="team-item__header">
        <h3 className="school-name">{title}</h3>
      </div>
      <div className="team-item__content">
        <aside className="logo">
          <img className="logo-image" src={image}></img>
        </aside>
        <table className="detail">
          <tbody>
            {items.map(item => (
              <tr>
                <td className="" id={item.id + '-label'}>
                  {item.id}:
                </td>
                <td aria-labelledby={item.id + '-label'}>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="team-item__footer">
        <button onClick={handleClick}>Details</button>
      </div>
    </div>
  );
};

export default Item;
