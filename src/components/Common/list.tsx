import React from 'react';
import './List.scss';

type ListProps = {
  items: ListItem[];
  class?: string;
  onScroll?: (event: React.UIEvent<HTMLUListElement>) => void;
};

export type ListItem = { key: string; fragment: React.ReactElement | any };

const List = (props: ListProps) => {
  const items = props.items;
  return (
    <ul
      className={'list' + (props.class ? props.class : '')}
      onScroll={props.onScroll}
    >
      {items.map(item => (
        <li key={item.key} className="list__item">
          {item.fragment}
        </li>
      ))}
    </ul>
  );
};

export default List;
