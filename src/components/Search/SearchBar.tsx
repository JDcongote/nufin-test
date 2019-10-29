import React from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  onSearch: (filtered: any[]) => void;
  content: any[];
  property: string;
};

type State = {
  searchTerm: string;
};

class SearchBar extends React.PureComponent<SearchBarProps, State> {
  componentDidMount() {
    this.setState({ searchTerm: '' });
  }

  doSearch(term: string) {
    if (term !== '') {
      const filtered = this.props.content.filter(
        item => item[this.props.property].toLowerCase().indexOf(term) > -1
      );
      this.props.onSearch(filtered);
    } else {
      this.props.onSearch(this.props.content);
    }
  }

  onInputChange(event: React.BaseSyntheticEvent) {
    const term = event.target.value.toLowerCase();
    this.setState({ searchTerm: term });
    this.doSearch(term);
  }
  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search"
          onChange={this.onInputChange.bind(this)}
        ></input>
      </div>
    );
  }
}

export default SearchBar;
