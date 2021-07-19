import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HttpClient } from "../http";
import { UserContext } from "../context";

export class Users extends Component{
    constructor(props){
        super(props);

        this.state = {
            page: 1,
            perPage: 0,
            total: 0,
            totalPages: 0,
            users: []
        }

        this.httpClient = new HttpClient();
    }

    prevPage = () => {
        let {page} = this.state;
        if(page > 1){
            this.getData(page - 1);
        }
    }

    nextPage = () => {
        let {page, totalPages} = this.state;
        if(page < totalPages){
            this.getData(page + 1);
        }
    }

    render() {
        let {users, page, perPage, total, totalPages} = this.state;
        let accessToken = this.context.user.token;

        return ( accessToken ? 
            <div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">avatar</th>
                            <th className="p-2">email</th>
                            <th className="p-2">first name</th>
                            <th className="p-2">last name</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((u, i) => 
                                <tr key={u.id} className={ i%2  === 0 ? "bg-gray-100 p-2" : "p-4" }>
                                    <td className="p-2"><img src={u.avatar} className="rounded-full" style={{width: "4rem"}}/></td>
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2">{u.first_name}</td>
                                    <td className="p-2">{u.last_name}</td>
                                    <td className="p-2">
                                        <Link to={`/users/${u.id}`} className="text-gray-900 border-0 p-2 focus:outline-none hover:bg-gray-300 rounded text-lg">Detail</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="px-5 py-5 w-full bg-white border-t flex flex-row justify-between">
                    <div className="text-gray-900 py-2">
                        Showing {(page-1) * perPage + 1} to {page * perPage} of {total} Entries
                    </div>
                    <div className="inline-flex">
                        <button onClick={this.prevPage} disabled={ page === 1 } className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                            Prev
                        </button>
                        <button onClick={this.nextPage} disabled={ page === totalPages } className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            :
            <div>you need login to see this page: <Link to={`/login?returnUrl=${this.props.location.pathname}`} className="hover:text-blue-500">Login</Link></div>
        );
    }

    getData = (page) => {
        this.httpClient.request({
            method: 'get',
            url: `https://reqres.in/api/users?page=${page}`,
            callback: (res) => {
                let data = res.data;
                this.setState({
                    users: data.data,
                    page: data.page,
                    perPage: data.per_page,
                    total: data.total,
                    totalPages: data.total_pages
                });
            }
        })
    }

    componentDidMount() {
        this.getData(1);
    }
}

Users.contextType = UserContext;