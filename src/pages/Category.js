import React from 'react';
import Shop from '../components/Shop';

function Category(props) {
  return (
		<Shop
			category={props.match.params.category}
			title={props.match.params.category}
		/>
  );
}

export default Category;