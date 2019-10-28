import React, { useState } from 'react';
import './Facet.scss';

type FacetProps = {
  name: string;
  id: string;
  groupId: string;
  onChange: (facetId: string, facetName: string, groupId: string) => void;
};

const Facet = (props: FacetProps) => {
  return (
    <span className="facet">
      <input
        type="checkbox"
        className="facet__checkbox"
        onChange={() => props.onChange(props.id, props.name, props.groupId)}
      ></input>
      {props.name}
    </span>
  );
};

export default Facet;
