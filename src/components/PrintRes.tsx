import React, { Component } from "react";
import ResForm from "./ResForm";
import ResPage from "./ResPage";

class PrintRes extends Component{
    state={
        data:{},
        showTemplate:false
    }
    handleSubmitAll = (depo:any) => {
        this.setState(()=>{return {
            ...this.state,
            data:depo ,
            showTemplate:true
        } })
    }
    render(){
        return (
            <div className='container-fluid'>
                <div className='col-lg-4 offset-4'>
                    <ResForm  state={this.state} handleSubmitAll={this.handleSubmitAll} />
                </div>
                <ResPage data={this.state} />
            </div>
        )
    }
} 

export default PrintRes