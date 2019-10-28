import React from 'react';
import './Filter.scss';

type FilterProps = {
  onFilter: (filtered: any[]) => void;
  filters: tFilter[];
  content: any[];
  property: string;
};

export type tFilter = {
  name: string;
  id: string;
};

type State = {};

class Filter extends React.PureComponent<FilterProps, State> {
  componentDidMount() {
    this.setState({ searchTerm: '' });
  }
  doFiltering(event: React.BaseSyntheticEvent) {
    const term = event.target.value.toLowerCase();
    if (term !== '-') {
      const filtered = this.props.content.filter(
        item => item[this.props.property].toLowerCase().indexOf(term) > -1
      );
      this.props.onFilter(filtered);
    } else {
      this.props.onFilter(this.props.content);
    }
  }
  render() {
    return (
      <div className="filter">
        <div className="filter__select-container">
          <select
            className="filter__select"
            onChange={this.doFiltering.bind(this)}
          >
            <option
              key="default"
              id="none"
              onClick={this.doFiltering.bind(this)}
            >
              -
            </option>
            {this.props.filters.map(filter => (
              <option key={filter.id} id={filter.id}>
                {filter.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;
