import React, { Component } from 'react';
import UserService from '../Services/UserService';

class UpdateUserComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName:'',
            lastName:"",
            emailId:'',
            skill:"",
            position:""
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeSkillHandler = this.changeSkillHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.UpdateUser = this.UpdateUser.bind(this);
    }
    updateUser = (e) => {
        e.preventDefault();
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            skill: this.state.skill,
            position: this.state.position
        }
        UserService.updateUser(user, this.state.id).then((res) => {
                this.props.history.push('/users');
            });
    }
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }
            
    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});    
    }
    
    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});        
    }
    
    changeSkillHandler= (event) => {
        this.setState({skill: event.target.value});
    }
    
    changePositionHandler= (event) => {
        this.setState({position: event.target.value});    
    }
    
    cancel(){
        this.props.history.push('/users');
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then((res)=>{
            let user = res.data;
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                emailId:user.emailId,
                skill:user.skill,
                position:user.position
            });
        });
    }

    render(){
        return(
            <div>
                <br></br>
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3'>
                                {
                                    this.getTitle()
                                }
                                <div className='card-body'>
                                    <form>
                                        <div className='form-group'>
                                            <label> First Name: </label>
                                            <input placeholder='First Name' name='firstName' className='form-control' value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label> Last Name: </label>
                                            <input placeholder='Last Name' name='lastName' className='form-control' value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label> Email Id: </label>
                                            <input placeholder='Email Address' name='emailId' className='form-control' value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label> Skill: </label>
                                            <input placeholder='Skill' name='skill' className='form-control' value={this.state.skill} onChange={this.changeSkillHandler}/>
                                        </div>
                                        <div className='form-group'>
                                            <label> Position: </label>
                                            <input placeholder='Position' name='position' className='form-control' value={this.state.position} onChange={this.changePositionHandler}/>
                                        </div>
                                        <button className='btn btn-success' onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>
        )
    }   
}

export default UpdateUserComponent