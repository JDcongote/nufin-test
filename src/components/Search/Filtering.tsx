import React from 'react';
import './Filtering.scss';
import List, { ListItem } from '../List';
import Facet from './Facet';

type FilteringProps = {
  onFilter: (filtered: any[]) => void;
  facetGroups: tFacet[];
  content: any[];
};

type State = {
  searchTerm: string;
  filterWindowOpen: boolean;
  facetGroups: tFacet[];
  facetsFull: boolean;
  mappedContent: IDictionary<IDictionary<any>>;
};

export type tFacet = {
  id: string;
  name: string;
  facets: ListItem[];
};

type IDictionary<TValue> = {
  [id: string]: TValue;
};

class Filtering extends React.PureComponent<FilteringProps, State> {
  state = {
    searchTerm: '',
    filterWindowOpen: false,
    facetGroups: [],
    facetsFull: false,
    mappedContent: {}
  };

  /**
   * Map the available facets to the provided content, makes filtering fast.
   */
  mapContentToFacets() {
    debugger;
    let mappedContent: IDictionary<IDictionary<any>> = {};
    this.props.facetGroups.forEach(facetGroup => {
      mappedContent[facetGroup.id] = {};
      facetGroup.facets.forEach(facet => {
        mappedContent[facetGroup.id][facet.key] = this.props.content.filter(
          team => team[facetGroup.id] === facet.fragment.name
        );
      });
    });
    this.setState({ mappedContent });
  }

  /**
   * Facets need to be finished using the correct component, only runs once
   * @param prevProps
   */
  componentDidUpdate(prevProps: FilteringProps) {
    if (!this.state.facetsFull && this.props.content.length > 0) {
      const fullFacets = this.props.facetGroups.map(facetGroup => {
        return {
          id: facetGroup.id,
          name: facetGroup.name,
          facets: facetGroup.facets.map((facet: ListItem) => ({
            key: facet.key,
            fragment: (
              <Facet
                name={facet.fragment.name}
                id={facet.fragment.id}
                groupId={facetGroup.id}
                onChange={this.onFacetChange.bind(this)}
              ></Facet>
            )
          }))
        };
      });
      this.setState({ facetsFull: true });
      this.setState({ facetGroups: fullFacets });
      this.mapContentToFacets();
    }
  }

  /**
   * Whenever a facet change pass the filtered content to the parent
   * @param facetId
   * @param facetName
   * @param groupId
   */
  onFacetChange(facetId: string, facetName: string, groupId: string) {
    this.props.onFilter(this.state.mappedContent[groupId][facetId]);
  }

  /**
   * Open the filter view
   * @param event
   */
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
            {this.state.facetGroups.map((facet: tFacet) => {
              return (
                <li className="facet-group" key={facet.id}>
                  <h3>{facet.name}</h3>
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
