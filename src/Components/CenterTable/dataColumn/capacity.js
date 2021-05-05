import React from "react";

export default props => {
    const {available_capacity = 0 } = props;
    return (
        <div className={`${available_capacity === 0 ? "bg-red" : null}`} >
            {available_capacity ? available_capacity : ' -- '}
        </div>
    )
}