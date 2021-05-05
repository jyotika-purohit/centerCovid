import React from "react";
import moment from "moment";

export default props => {
    const {date : str = '' } = props;
    const date = str.split("-");
    // console.log("78364872634623764327 ===>",{date})
    const newDate = `"${date[1]}-${date[0]}-${date[2]}"`
    const value = moment(newDate).format("DD MMMM , YYYY");
    return (
        <div>
            {date ? value : ' -- '}
        </div>
    )
}