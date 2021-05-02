import React, { Component } from "react";
import DepoForm from "./DepoForm";
import DepoPage from "./DepoPage";

class PrintDepo extends Component{
    state={
        data:{},
        showTemplate:false
    }
    handleSubmitAll = (depo:any) => {
        this.setState(()=>{return {
            ...this.state,
            data:depo ,
            showTemplate:true
        }})
    }
    render(){
        return (
            <div className='container-fluid'>
                <div className='col-lg-4 offset-4'>
                    <DepoForm  state={this.state} handleSubmitAll={this.handleSubmitAll} />
                </div>
                <DepoPage data={this.state} />
                <DepoPage data={this.state} />
                
            </div>
        )
    }
}

export default PrintDepo