import React, { Component } from "react";
import { HttpClient } from "../http";
import { UserContext } from "../context";

export class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            emailMsg: "",
            password: "",
            passwordMsg: "",
            errMessage: null
        }

        this.httpClient = new HttpClient();
    }

    updateInput = (e) => {
        let target = e.target;
        this.setState({[target.name]: target.value});
    }

    login = (e, setUser) => {
        e.preventDefault();

        let {email, password} = this.state;
        if(!email) {
            this.setState({emailMsg: "Please enter email!"});
            return;
        }
        if(!password) {
            this.setState({emailMsg: "", passwordMsg: "Please enter password!"});
            return;
        }

        this.httpClient.request({ method: 'post', url: 'https://reqres.in/api/login', data: {email: email, password: password}, 
        callback: (res) => {
            let data = res.data;

            setUser({email: email, token: data.token});
            
            let returnUrl = this.props.location.search?.split('=')[1];
            this.props.history.push(returnUrl || '/');
        }, 
        errCallback: (err) => {
            this.setState({errMessage: err?.response?.data?.error ?? "An error occured!"});
        }});
    }

    render() {
        let {email, emailMsg, password, passwordMsg, errMessage} = this.state;

        return (
            <UserContext.Consumer>
                {({user, setUser}) => (
                    <section className="text-gray-600">
                    <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
                        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">To Sign In enter your credential options.</h1>
                            <p className="leading-relaxed mt-4">Please enter your email and password.</p>
                        </div>
                        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                            <form onSubmit={ (e) => this.login(e, setUser)} method="post">
                                <div className="relative mb-4">
                                    <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input type="email" id="email" name="email" value={email} onChange={this.updateInput} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    { emailMsg && <span className="text-red-500 text-xs">{emailMsg}</span> }
                                </div>
                                <div className="relative mb-4">
                                    <label for="password" className="leading-7 text-sm text-gray-600">Password</label>
                                    <input type="password" id="password" name="password" value={password} onChange={this.updateInput} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    { passwordMsg && <span className="text-red-500 text-xs">{passwordMsg}</span> }
                                </div>
                                <button type="submit" className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                            </form>
                            
                            { errMessage && 
                                <p className="text-sm text-red-600 mt-3">{errMessage}</p>
                            }
                        </div>
                    </div>
                </section>
                )}
            </UserContext.Consumer>
        );
    }
}