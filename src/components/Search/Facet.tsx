import React, { useState } from 'react';
import './FacetGroup.scss';

type FacetProps = {
  name: string;
  id: string;
  groupId: string;
  isRadio: boolean;
  checked: boolean;
  facet: any;
  onChange: (
    facetId: string,
    selected: boolean,
    facet: any,
    facetName?: string
  ) => void;
};

class Facet extends React.PureComponent<FacetProps> {
  onChange() {
    this.props.onChange(
      this.props.id,
      !this.props.checked,
      this.props.facet,
      this.props.name
    );
  }

  render() {
    return (
      <React.Fragment>
        <input
          type={this.props.isRadio ? 'radio' : 'checkbox'}
          name={this.props.groupId}
          className="facet"
          onChange={this.onChange.bind(this)}
          checked={this.props.checked}
        ></input>
        {this.props.name}
      </React.Fragment>
    );
  }
}

export default Facet;
