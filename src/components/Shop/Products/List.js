import React from 'react';

import Item from './Item';

function List(props) {
  return (
		<div className="features_items">
			<h2 className="title text-center">{props.title}</h2>
			
			{props.products.map(product => <Item key={product.id} product={product} />)}
		</div>
  );
}

export default List;