import React from "react";

export default props => {
    const {min_age_limit = 0 } = props;
    return (
        <div>
            {min_age_limit ? min_age_limit : ' -- '}
        </div>
    )
}