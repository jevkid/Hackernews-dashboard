import React, { Component } from 'react';

class Table extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	isLoading: false,
    	error: null,
    	storyData: this.props.data,
      showPagination: true,
      results: 10,
      sort: 'desc',
      sortBy: 'Date'
    };
  }
	
  getStories(type, direction) {
    fetch(`http://localhost:3000/transactions?_sort=${type}&_order=${direction}`)
      .then(response => {
      	if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ storyData: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
	}

	// updateSort(e, type, direction) {
	// 	e.preventDefault();
	// 	this.setState({sort: direction, sortBy: type});
	// 	this.updateTable(type, direction);
	// }

  render() {	
  	const { storyData, isLoading, error } = this.state;

  // 	const tableRow = storyData.map((row) => 
  // 				<tr>
		// 		    <td key={row.Date}>{row.Date}</td>
		// 		    <td key={row['Debit/Credit']}>{row['Debit/Credit']}</td>
		// 		    <td key={row['Merchant/Description']}>{row['Merchant/Description']}</td>
		// 		    <td key={row.Balance}>{row.Balance}</td>
		// 		  </tr>
		// );

		// const direction = this.state.sort === 'desc' ? 'asc' : 'desc';

		if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading || storyData.length <= 0) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
      	<p> Works </p>
      </div>
    );
  }
};

export default Table;