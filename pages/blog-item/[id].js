

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from '../../styles/blogItem.module.css';
import Link from "next/link";
import { useState } from "react";


//component to display particular blog item
const BlogItem=({data})=>{
    const router=useRouter();
    
 
    
   const [comment,setComment]=useState("") ;

  

    const userDetails=JSON.parse(localStorage.getItem("UserDetails"));
    

  
    const id=router.query.id;
    
    const blogItem=data.filter(each=>each.id==id);

    //sending request to server to delete blog
    const deleteBlog=async ()=>{
      const res=await fetch(`http://localhost:3000/api/blogsapi`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id:id
        })})
      const msg=await res.text();
      alert(msg);
      router.push("/blogfeed");

    }

    //function to add comment to a blog item
    const addComment=async ()=>{
      if(comment===""){
        alert("Please enter the comment");
      }
      else{
        const response = await fetch("http://localhost:3000/api/blogsapi", {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          id:id,
          
          comment:comment
        }),
      });
      setComment("");
      const msg=await response.text();
      alert(msg);
      router.push(`/blog-item/${id}`);
      }

    }

    
    

    return(
        <Layout>
            <div className="p-5 d-flex flex-column align-items-center">
            <h1 className="text-center text-info">{blogItem[0].title}</h1>
            <p className={`align-self-end ${styles.writer}`}>{`Writer : ${blogItem[0].writer}`}</p>
            <div>
            {
               (userDetails.type==="Admin" || userDetails.name===blogItem[0].writer) ?
               (<div>
                <Link href={`/editBlog/${id}`}><button className="btn btn-primary mx-3" >Edit</button></Link>
                <button className="btn btn-danger" onClick={deleteBlog}>Delete</button>
               </div>):null
            }
            </div>
            <img src={`${blogItem[0].img}`} alt={`${blogItem[0].id}`} className="w-75 m-5 text-center"/>
            <div dangerouslySetInnerHTML={{__html: `${blogItem[0].content}.....`}}/>
            
            <div className="d-flex flex-column align-items-start align-self-start">
            <div className="w-100 my-3">   
            <input type="text" placeholder="Write a comment" className={`  ${styles.commentinp}`} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            <button className="btn btn-primary mx-3" onClick={addComment}>Add Comment</button>
            </div> 
            <p>{`Comments : ${blogItem[0].comments.length}`}</p>
            <ul>
                {blogItem[0].comments.map(each=><li key={each}>{each}</li>)}
            </ul>
            </div>
            </div>
        </Layout>
    )
}

export default BlogItem;

//fetching blog list from the server
export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/blogsapi`);
    const data = await res.json();
    
    
    
  
    if (!data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    return {
      props: { data },
    };
  }
  