import React , { Component } from "react";
import { Table } from "antd";
import getColumn from "./header";
import generateRow from "./dataRow";

class CenterTable extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    getDataSource = () => {
        const { sessions = {} } = this.props;
        return Object.values(sessions).map( (session,index) => {
            return (
                generateRow({
                    id:index,
                    session
                })
            )
        });

    }

    showSlots = (slots) => () => {
        const {openModal} = this.props;
        openModal(slots);
    }



    render(){
        return (
            <Table
                rowClassName = { () => "pointer" }
                columns = {
                    getColumn({
                        className:"pointer",
                        showSlots:this.showSlots
                    })
                }

                dataSource = {this.getDataSource()}
                scroll = {{x:"100%"}}

            />
        )
    }
}

export default CenterTable;