import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            resMessage: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        
        const user = {
            password: this.state.password,
            email: this.state.email
        }
        console.log(user);
        
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8000/users/login',
            validateStatus: null,
            data: user
          });
        if (res.status === 200) {
            localStorage.setItem('jwt', res.data.jwt);
            this.setState({resMessage: JSON.stringify(res.status)});
        } else {
            console.log(`Registration error: ${JSON.stringify(res.data)}`)
            this.setState({resMessage: JSON.stringify(res.status)});
            console.log(this.state.resMessage);
        }
        
        this.setState({
            email: '',
            password: ''
        })
        window.location.reload(true);
    }
    
    render() {
        return (
            <div className="container" >
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            placeholder="Email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            placeholder="Password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    { this.state.resMessage == 400 &&
                    <h3 className="error"> Complete all the fields! </h3> }
                    { this.state.resMessage == 401 &&
                    <h3 className="error"> User does not exist or incorrent password! </h3> }
                    { this.state.resMessage == 200 &&
                    <h3 className="error"> Success! </h3> }
                    
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

}