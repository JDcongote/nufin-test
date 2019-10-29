import React from 'react';
import Button from './Button';
import './List.scss';

type ListProps = {
  items: ListItem[];
  class?: string;
};
type State = {
  scrolled: boolean;
};

export type ListItem = { key: string; fragment: React.ReactElement | any };

class List extends React.PureComponent<ListProps, State> {
  ref: React.RefObject<HTMLUListElement> = React.createRef();
  state = {
    scrolled: false
  };
  onScroll(event: React.UIEvent) {
    const scroll = event.target.scrollTop;
    if (scroll > 0) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  }
  scrollTop() {
    if (this.ref.current) {
      this.ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  render() {
    return (
      <ul
        ref={this.ref}
        className={'list' + (this.props.class ? this.props.class : '')}
        onScroll={this.onScroll.bind(this)}
      >
        {this.props.items.map(item => (
          <li key={item.key} className="list__item">
            {item.fragment}
          </li>
        ))}
        <Button
          text={'Back to Top'}
          visible={this.state.scrolled}
          floating={'bottom bottom-right'}
          context={null}
          onClick={this.scrollTop.bind(this)}
        ></Button>
      </ul>
    );
  }
}

export default List;
