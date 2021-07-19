import React, {Component} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context";

export class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <UserContext.Consumer>
                {({user, setUser}) => (
                    <header className="text-gray-600 body-font">
                    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                       
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white p-2 bg-indigo-600 rounded-full" viewBox="0 0 32 32">
                            <g fill="none" fillRule="evenodd" transform="translate(.648 2.438) scale(.05696)">
                                <circle cx="269.529" cy="237.628" r="50.167" fill="#00d8ff"></circle>
                                <g stroke="#00d8ff" strokeWidth="32">
                                <path d="M269.53 135.628c67.356 0 129.928 9.665 177.107 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.554 0-127.63-7.492-174.3-23.44C36.184 297.006.62 265.085.62 237.628c0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z"></path>
                                <path d="M180.736 186.922c33.65-58.348 73.28-107.724 110.92-140.48C337.006 6.976 380.163-8.48 403.43 4.937c24.248 13.983 33.042 61.814 20.067 124.796-9.8 47.618-33.234 104.212-65.176 159.6-32.75 56.788-70.25 106.82-107.377 139.272-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.3-31.906-56.92-20.834-115.233 9.355-49.27 32.832-109.745 66.8-168.664z"></path>
                                <path d="M180.82 289.482c-33.745-58.282-56.72-117.287-66.31-166.255-11.544-59-3.382-104.11 19.864-117.566 24.224-14.024 70.055 2.244 118.14 44.94 36.356 32.28 73.688 80.837 105.723 136.173 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.057 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.253-112.76-142.115z"></path>
                                </g>
                            </g>
                        </svg>
                        <span className="ml-3 text-xl">React Test</span>
                    </Link>

                    
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <Link to="/home" className="mr-5 hover:text-gray-900">Home</Link>
                        { user.token && 
                            <Link to="/users" className="mr-5 hover:text-gray-900">Users</Link>
                        }
                    </nav>
                    
                    
                    { !user.token && 
                        <Link to="/login" className="mr-5 hover:text-gray-900">Login</Link>
                    }
                    
                    { user.token && 
                        <Link to="/profile" className="mr-5 hover:text-gray-900">Hi {user.email}!</Link>
                    }

                    { user.token && 
                        <button onClick={ () => setUser({email: null, token: null}) } className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                            Logout
                        </button>
                    }
                    </div>
                </header>
                )}
            </UserContext.Consumer>
            
        );
    }
}