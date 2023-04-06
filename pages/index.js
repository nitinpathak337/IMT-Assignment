import Head from "next/head";
import styles from "../styles/login.module.css";
import { useState } from "react";

import { useRouter } from "next/router";

//component to show sign in route
const SignIn = () => {
  const [userType,setUserType]=useState("Admin");
  const [password,setPassword]=useState("");
  const [username,setUserName]=useState("");

  const sign=useRouter();

  const signIn=async (e)=>{
    e.preventDefault();
    if(username==="" || password===""){
      alert("Please enter Username and Password")
    }
    else{
      //on success login , adding user details in local storage
      localStorage.setItem("UserDetails",JSON.stringify({name:username,password:password,type:userType}));
      sign.push("/blogfeed");
    }
  }
  

  return (
   
    
    <div>
      <Head>
        <title>Blogs App</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
          crossOrigin="anonymous"
        />
      </Head>
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.cont}`}
      >
        <h1 className="text-center text-info mb-3">IMT Blogs</h1>
        <form className="border rounded p-4">
          <h3 className="text-secondary text-center m-2">Sign In</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>setUserName(e.target.value)}
              
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="select" >Choose User Type</label>
            <select
              
              id="select"
              onChange={(e)=>setUserType(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Author">Author</option>
              
              <option value="Reader">Reader</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={signIn}>
            Submit
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default SignIn;
