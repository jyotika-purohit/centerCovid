import React,{Component} from "react";
import logo from './logo.svg';
import './App.css';
import message from "antd/es/message";
import { Modal, Button, DatePicker, Form, Input,Space, Table , Spin} from "antd";
import FormItem from "antd/lib/form/FormItem";
import moment from "moment";
import CenterTable from "./Components/CenterTable";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      pincode:null,
      date:'',
      centers : {},
      minAgeLimit:null,
      modalSlots:[],
      isModalVisible:false,
      loading:false

    };
  }

  componentDidMount(){
    const TDate = new Date();
    const today = moment(TDate, 'YYYY-MM-DD').add(1,'day');
    console.log("863876278362713",{today});
    this.setState({date:today , minAgeLimit : 18});
  }

  handleGetCalenderData = async() => {
    try{
      
      const { date = '' , pincode = '' , minAgeLimit = 0} = this.state;
      const formattedDate = moment(date).format("DD-MM-YYYY");
     
      this.setState({loading:true});
      // fetch(`https://api.cowin.gov.in/api/v2/appointment/sessions/calendarByDistrict?district_id=${district}&date=${formattedDate}`)
      fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${formattedDate}`)
      .then(response => 
        {
          const {status } = response;
          // console.log("3242423",{status,response});
          if(status !== 200){
            message.warn("Something went wrong,try using different details");
          }
          return response.json();
        }
      ).then((data) =>  
        {
          const {centers  = {} } = data ;

          if(Object.keys(centers).length === 0 ){
            message.warn("No matching Data found");
          }

          // console.log("3242423 ===>",{data});
          let apiData = {};
          
          for(let each in centers){
            const center = centers[each];
            const {sessions = {} } = center || {};
            let centerApiData = {};

            for(let s in sessions){
              const session = sessions[s] || {};
              const {available_capacity = null , min_age_limit = null } = session || {};
              if(available_capacity > 0 && min_age_limit.toString() >= minAgeLimit.toString() ){
                centerApiData[s]={ ...session };
              }
            }

            if(Object.keys(centerApiData).length > 0 ){
              const { sessions , ...rest } = center || {};
              apiData[each] = { ...rest , sessions : Object.keys(centerApiData).map(each => centerApiData[each] ) };
            }
          }

          this.setState({centers : { ...apiData } });

        });
        this.setState({loading:false});

    }catch(error){
      console.log("error ===>",{error});
      this.setState({loading:false});

      message.warn(error);

    }
  }


  setDate =(date, dateString)=> {
    console.log("47234234",{date});
    this.setState({date});
  }

  setDistrict = (e) => {
    e.preventDefault();
    const val = e.target.value;
    this.setState({pincode:val});
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  handleCancel = () => {
    this.setState({
      modalSlots:[],
      isModalVisible:false});
  }

  openModal = (slots) => {

    this.setState({
      modalSlots:slots,
      isModalVisible:true
    });

  }

  getModalContent = () => {
    const { modalSlots = [] } = this.state;
    const data = [];

    console.log("3724523546723",{modalSlots});

    data.push(modalSlots.map(slot => 
      <div>{slot}</div>
      )
    );

    return data;
       
    
  }
  
  getCentersContent = () => {
    const {centers = {} } = this.state;
    let content = [];
    for(let each in centers){
      const center = centers[each];
      const { name = '' ,  sessions = {} , pincode = '' } = center || {};
      content.push(
        <div>
           {`${name}${" , "}pincode - ${pincode}`}
           <div>
             <CenterTable sessions={sessions} openModal={this.openModal} />
           </div>
        </div>
      )

    }

    return content;

  }

  render(){
    const {pincode = '' ,date = null , centers = {} ,isModalVisible=false ,loading = false} = this.state;
    console.log("4763257457236546723",{centers});

    
    
    if(loading){
      return <div className="hvp100 wp100 align-center justify-center flex direction-column" >
        <div className="tac" ><Spin size="default" /></div>
      </div>
    }

    return (
      <div className="App">
        <h1 className="mt40 mb40" >Add Details</h1>
        <Form className="flex wp100 align-center justify-center" >
          <FormItem 
          label="Pincode"
          className="mr20" >
            <Input
              value={pincode}
              onChange={this.setDistrict}
              type={"number"}
            />
          </FormItem>

          <FormItem label="Date" >
            <Space direction="vertical">
              <DatePicker
                value={date}
                onChange={this.setDate}
                className="w200"
                disabledDate={this.disabledDate}
              />
            </Space>
           

          </FormItem>

          
        </Form>
        <Button 
        type="primary"
        disabled={!date || !pincode}
        onClick={this.handleGetCalenderData}
        >
          Get Centers</Button>

          

          {
            Object.keys(centers).length > 0
            &&
            <div className="mt40" >
              {this.getCentersContent()}
            </div>
          }

          <Modal title="Time Slots" visible={isModalVisible} onOk={this.handleCancel} onCancel={this.handleCancel}>
            {this.getModalContent()}
          </Modal>


      </div>
    );
  }
}

export default App;
