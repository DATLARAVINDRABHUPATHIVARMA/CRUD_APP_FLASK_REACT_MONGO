import React, {Component} from 'react';
import UserService from '../Services/UserService.js';

class ListUserComponent extends Component{
    constructor(props){
      super(props)

      this.state = {
        users:[]
      }
      this.deleteUser = this.deleteUser.bind(this)
      this.viewUser = this.viewUser.bind(this)
      this.editUser = this.editUser.bind(this)
      this.addUser = this.addUser.bind(this)
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-user/_add');
            }
            this.setState({users:res.data});
        });
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users:this.state.users.filter(user => user.id !== id )});
        });
    }

    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    addUser(){
        this.props.history.push(`/add-user/_add`);
    }
   
    render(){
        return( 
            <div>
                <h2 className='text-center'>Users List</h2>
                <div className='row'>
                    <button onClick={this.addUser} className='btn btn-primary'>Add User</button>
                </div>
                <br></br>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>User First Name</th>
                                <th>User Last Name</th>
                                <th>User Email Id</th>
                                <th>User Skill</th>
                                <th>User Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user => 
                                    <tr key = {user.id}>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName} </td>
                                        <td> {user.emailId}  </td>
                                        <td> {user.skill} </td>
                                        <td> {user.position} </td>
                                        <td>
                                            <button onClick={()=>this.editUser(user.id)} className='btn btn-info'>Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={()=>this.deleteUser(user.id)} className='btn btn-danger'>Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={()=>this.viewUser(user.id)} className='btn btn-info'>View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                
                </div>

            </div>
        )
    }
}

export default ListUserComponent