import React from 'react';
import Facet from './Facet';
import './FacetGroup.scss';
import { IDictionary } from './Filtering';

type FacetGroupProps = {
  facetGroup: tFacet;
  isRadio: boolean;
  clear: boolean;
  onChange: (
    facetId: string,
    groupId: string,
    selected: boolean,
    facetName?: string
  ) => void;
};
export type tFacet = {
  id: string;
  name: string;
  facets: any[];
  isRadio: boolean;
};

type State = {
  availableFacets: IDictionary<boolean>;
};

/**
 *
 * @param props: FacetProps {
 * facetGroup: tFacet => the group to render, has to be of type tFacet
 * exclusiveFacet: boolean => if true only one facet from this group may be active at any time;
 * 	onChange: () => void => called when the facets in this group are checked ;
 * }
 */
class FacetGroup extends React.PureComponent<FacetGroupProps, State> {
  state = {
    availableFacets: {}
  };
  componentDidUpdate(prevProps: FacetGroupProps) {
    if (prevProps.facetGroup !== this.props.facetGroup) {
      const obj: IDictionary<boolean> = {};
      this.props.facetGroup.facets.forEach(facet => (obj[facet.key] = false));
      const finalState = { ...this.state.availableFacets, ...obj };
      this.setState({ availableFacets: finalState });
    }
    if (this.props.clear !== prevProps.clear) {
    }
  }

  onFacetChange(facetId: string, checked: boolean, facet: any) {
    facet.checked = checked;
    let aux = this.clearFacets();
    aux[facetId] = checked;
    this.setState({ availableFacets: aux });

    //this.props.onChange(facetId, this.props.facetGroup.id, checked);
  }

  clearFacets() {
    let aux: IDictionary<boolean> = { ...this.state.availableFacets };
    Object.keys(aux).forEach(key => (aux[key] = false));
    return aux;
  }

  getChecked(facetId: string): boolean {
    return this.state.availableFacets[facetId];
  }
  render() {
    return (
      <li className="facet-group" key={this.props.facetGroup.id}>
        <h3>{this.props.facetGroup.name}</h3>
        <form className="facet-group__form">
          <fieldset className="form__fieldset" id={this.props.facetGroup.id}>
            {this.props.facetGroup.facets.map((facet: any) => (
              <Facet
                facet={facet}
                name={facet.fragment.name}
                id={facet.fragment.id}
                groupId={this.props.facetGroup.id}
                onChange={this.onFacetChange.bind(this)}
                isRadio={true}
                checked={this.getChecked(facet.key)}
              ></Facet>
            ))}
          </fieldset>
        </form>
      </li>
    );
  }
}

export default FacetGroup;
