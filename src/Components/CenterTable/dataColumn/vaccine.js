import React from "react";

export default props => {
    const {vaccine = 0 } = props;
    return (
        <div>
            {vaccine ? vaccine : ' -- '}
        </div>
    )
}