import React from 'react';
import './Filtering.scss';
import FacetGroup, { tFacet } from './FacetGroup';
import { ListItem } from 'components/Common/list';

type FilteringProps = {
  onFilter: (filtered: any[]) => void;
  facetGroups: tFacet[];
  content: any[];
};

type State = {
  searchTerm: string;
  filterWindowOpen: boolean;
  facetsFull: boolean;
  mappedContent: IDictionary<IDictionary<any>>;
  facetGroups: tFacet[];
  checkedFacets: boolean;
  clearedFacets: boolean;
};

export type IDictionary<TValue> = {
  [id: string]: TValue;
};

class Filtering extends React.PureComponent<FilteringProps, State> {
  state = {
    searchTerm: '',
    filterWindowOpen: false,
    facetsFull: false,
    facetGroups: [],
    mappedContent: {},
    checkedFacets: false,
    clearedFacets: false
  };

  /**
   * Map the available facets to the provided content, makes filtering fast.
   */
  mapContentToFacets() {
    let mappedContent: IDictionary<IDictionary<any>> = {};
    let facetGroups: tFacet[] = [];
    this.props.facetGroups.forEach(facetGroup => {
      mappedContent[facetGroup.id] = {};

      let facets: ListItem[] = [];
      facetGroup.facets.forEach(facet => {
        mappedContent[facetGroup.id][facet.key] = this.props.content.filter(
          team => team[facetGroup.id] === facet.fragment.name
        );
        if (mappedContent[facetGroup.id][facet.key].length > 0) {
          let checked = { checked: false };
          facets.push({ ...facet, ...checked });
        }
      });
      facetGroups.push({
        id: facetGroup.id,
        name: facetGroup.name,
        isRadio: facetGroup.isRadio,
        facets: facets
      });
    });
    this.setState({ mappedContent, facetGroups: facetGroups });
  }

  /**
   * Facets need to be finished using the correct component
   * @param prevProps
   */
  componentDidUpdate(prevProps: FilteringProps) {
    if (this.props.content !== prevProps.content) {
      this.setState({ facetsFull: true });
      this.setState({ facetGroups: this.props.facetGroups });
      this.mapContentToFacets();
    }
    if (prevProps.content !== this.props.content) {
    }
  }

  /**
   * Whenever a facet change pass the filtered content to the parent
   * @param facetId
   * @param facetName
   * @param groupId
   */
  onFacetsChange(facetId: string, groupId: string, checked: boolean) {
    // let auxFacets: IDictionary<boolean> = { ...this.state.checkedFacets };

    // auxFacets[facetId] = checked;
    if (checked) {
      this.props.onFilter(this.state.mappedContent[groupId][facetId]);
    } else {
      this.clearFilter();
    }
    this.setState({ checkedFacets: true, clearedFacets: false });
  }

  /**
   * Open the filter view
   */
  onOpenFilter() {
    this.setState({ filterWindowOpen: !this.state.filterWindowOpen });
  }

  clearFilter() {
    this.props.onFilter(this.props.content);
    this.setState({ clearedFacets: true, checkedFacets: false });
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
            {this.state.facetGroups.map((facet: tFacet) => (
              <FacetGroup
                onChange={this.onFacetsChange.bind(this)}
                isRadio={facet.isRadio}
                facetGroup={facet}
                clear={this.state.clearedFacets}
              ></FacetGroup>
            ))}
          </ul>
        </div>
        <div className="filter-bar">
          <button
            className="filter-bar__button"
            onClick={this.onOpenFilter.bind(this)}
          >
            Filters
          </button>
          {this.state.checkedFacets ? (
            <button
              className="filter-bar__button"
              onClick={this.clearFilter.bind(this)}
            >
              Filters
            </button>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Filtering;
