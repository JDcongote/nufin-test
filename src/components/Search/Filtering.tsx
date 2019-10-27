import React from 'react';
import './Filtering.scss';
import List, { ListItem } from '../List';
import Facet from './Facet';

type FilteringProps = {
  onFilter?: (filtered: any[]) => void;
  facetGroups: PartialFacet[];
  content: any[];
};

type State = {
  searchTerm: string;
  filterWindowOpen: boolean;
  facetGroups: FullFacet[];
  facetsFull: boolean;
};

export type PartialFacet = {
  id: string;
  facets: { key: string; fragment: { name: string; id: string } }[];
};

type FullFacet = {
  id: string;
  facets: ListItem[];
};

class Filtering extends React.PureComponent<FilteringProps, State> {
  state = {
    searchTerm: '',
    filterWindowOpen: false,
    facetGroups: [],
    facetsFull: false
  };

  componentDidUpdate(prevProps: FilteringProps) {
    if (!this.state.facetsFull) {
      const fullFacets = this.props.facetGroups.map(facetGroup => {
        return {
          id: facetGroup.id,
          facets: facetGroup.facets.map(facet => ({
            key: facet.key,
            fragment: (
              <Facet
                name={facet.fragment.name}
                id={facet.fragment.id}
                onChange={this.onFacetChange}
              ></Facet>
            )
          }))
        };
      });
      this.setState({ facetsFull: true });
      this.setState({ facetGroups: fullFacets });
    }
  }

  doFiltering(term: string) {}

  onFacetChange(facetId: string) {
    console.log(facetId);
    /*const term = event.target.value.toLowerCase();
    this.setState({ searchTerm: term });
    this.doFiltering(term);*/
  }

  onOpenFilter(event: React.MouseEvent) {
    this.setState({ filterWindowOpen: !this.state.filterWindowOpen });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.state.filterWindowOpen
              ? 'filter-view filter-view--opened'
              : 'filter-view'
          }
        >
          <h2 className="filter-view__title">Filters</h2>
          <div className="filter-view__selected-filters">
            No filters Selected
          </div>
          <ul className="filter-view__facet-group-container">
            {this.state.facetGroups.map((facet: FullFacet) => {
              return (
                <li className="facet-group" key={facet.id}>
                  <h3>{facet.id}</h3>
                  <List items={facet.facets}></List>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="filter-bar">
          <button
            className="filter-bar__button"
            onClick={this.onOpenFilter.bind(this)}
          >
            Filters
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Filtering;
