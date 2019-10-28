import React from 'react';
import './Item.scss';

type ItemProps = {
  items: ItemData[];
  highlightColor?: string;
  button?: JSX.Element;
  title: string;
  image?: string;
};

export type ItemData = {
  id: string;
  name: string;
};

const Item = ({ title, items, button, image, highlightColor }: ItemProps) => {
  return (
    <div className="item">
      <div
        className="item__highlight"
        style={{ backgroundColor: highlightColor }}
      ></div>
      <div className="item__header">
        <h3 className="item-title">{title}</h3>
      </div>
      <div className="item__content">
        <aside className="logo">
          <img className="logo-image" src={image}></img>
        </aside>
        <table className="detail">
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="detail__label" id={item.id + '-label'}>
                  {item.id}:
                </td>
                <td aria-labelledby={item.id + '-label'}>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="item__footer">{button}</div>
    </div>
  );
};

export default Item;
