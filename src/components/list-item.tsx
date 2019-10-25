import React from 'react';

type State = { x: number };
type Props = { name: string };

class ListItem extends React.Component<Props, State> {}

export default ListItem;
