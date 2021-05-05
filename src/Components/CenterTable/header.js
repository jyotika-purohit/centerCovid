import React from "react";
import { TABLE_COLUMN } from "./helper";
import Date from "./dataColumn/date";
import Capacity from "./dataColumn/capacity";
import Slots from "./dataColumn/slots";
import Vaccine from "./dataColumn/vaccine";
import MinAge from "./dataColumn/minAgeLimit";

export default props => {
    const {showSlots} = props;
    return [
        {
            title : 'Date',
            ...TABLE_COLUMN.DATE,
            render : data => {
                console.log("78364872634623764327",{data})
                const {date} = data || {};
                return (
                    <Date date={date} />
                )
            }
        },
        {
            title : 'Min Age limit',
            ...TABLE_COLUMN.MIN_AGE_LIMIT,
            render : data => {
                const {min_age_limit = '' } = data || {};
                return (
                    <MinAge min_age_limit={min_age_limit} />
                )
            }
        },
        {
            title:'Available Capacity',
            ...TABLE_COLUMN.CAPACITY,
            render : data => {
                const {available_capacity} = data || {};
                return (
                    <Capacity available_capacity={available_capacity} />
                )
            }
        },
        {
            title : 'Vaccine',
            ...TABLE_COLUMN.VACCINE,
            render : data => {
                const {vaccine} = data || {};
                return (
                    <Vaccine vaccine={vaccine} />
                )
            }
        },
        {
            title : 'Slots',
            ...TABLE_COLUMN.SLOTS,
            render : data => {
                const {id,slots} = data || {};
                return (
                    <Slots id={id} slots={slots} showSlots={showSlots} />
                )
            }
        }
    ]
};
