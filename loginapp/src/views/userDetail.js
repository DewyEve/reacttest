import React, { Component } from "react";
import { HttpClient } from "../http";
import { UserContext } from "../context";
import { Link } from "react-router-dom";

export class UserDetail extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: 0,
                email: "",
                firstName: "",
                lastName: "",
                avatar: ""
            },
            support: {}
        }

        this.httpClient = new HttpClient();
    }

    render() {
        let accessToken = this.context.user.token;
        let {user, support} = this.state;
        return ( accessToken ?
            <div className="flex flex-col bg-gray-100 max-w-sm shadow-md mt-8 py-10 px-10 md:px-8 rounded-md">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <img className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto" src={user.avatar} alt="avatar" />
                    <div className="flex flex-col text-center md:text-left">
                        <div className="font-medium text-lg text-gray-800">{user.firstName} {user.lastName}</div>
                        <div className="text-gray-500 mb-3 whitespace-nowrap">{user.email}</div>
                    </div>
                </div>
            </div>
            :
            <div>you need login to see this page: <Link to={`/login?returnUrl=${this.props.location.pathname}`} className="hover:text-blue-500">Login</Link></div>
        );
    }

    getData = () => {
        let id = Number(this.props.match.params.id);

        if(id > 0) {
            this.httpClient.request({
                method: 'get',
                url: `https://reqres.in/api/users/${id}`,
                callback: (res) => {
                    let data = res.data;
                    let user = data.data;
                    
                    this.setState({
                        user: {
                            id: user.id,
                            email: user.email,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            avatar: user.avatar
                        },
                        support: data.support
                    });
                }
            })
        }
        
    }

    componentDidMount() {
        this.getData();
    }
}

UserDetail.contextType = UserContext;