import {TABLE_COLUMN} from "../helper";

export default data => {
    const { id = null , session = {} } = data ; 
    const {available_capacity = 0 , slots = {},
    vaccine = '', date = '',min_age_limit='' } = session || {};
    // console.log("78364872634623764327 ====>>> ", {session,data});
    return {
        key:id,
        [TABLE_COLUMN.DATE.dataIndex]:{
            date
        },
        [TABLE_COLUMN.VACCINE.dataIndex]:{
            vaccine
        },
        [TABLE_COLUMN.SLOTS.dataIndex]:{
            id,
            slots
        },
        [TABLE_COLUMN.CAPACITY.dataIndex]:{
            available_capacity
        },
        [TABLE_COLUMN.MIN_AGE_LIMIT.dataIndex]:{
            min_age_limit
        }
    }
}