import React from 'react';

function List(props) {
    let listItems = props.listItems
    let header = props.header
    return (
        <div className="accounts-list">
            <h2 className="align-content-center">{header}</h2>
            <ul className="list-group">
                {listItems}
            </ul>
        </div>
    );
}

export default List;