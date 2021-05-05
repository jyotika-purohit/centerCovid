import React from "react";
import {Tooltip} from "antd";

export default props => {
    const {slots = {},showSlots } = props;
    return (
            <Tooltip title="View Slots" >
                <div onClick={showSlots(slots)} className="" >
                    { slots ? Object.keys(slots).length : ' -- '}
                </div>

            </Tooltip>
    )
}