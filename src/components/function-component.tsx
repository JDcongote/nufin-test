import React from 'react';

type Props = { name: string };

const FComp = (props: Props) => <div className={props.name}></div>;

export default FComp;
