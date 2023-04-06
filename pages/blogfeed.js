import Link from "next/link";
import Layout from "../components/Layout";
import styles from '../styles/blogFeed.module.css';
import { useState } from "react";

//component to display all the blogs list
const BlogsFeed = ({ data }) => {


  const [search,setSearch]=useState("");
  
  const searchedData=data.filter((each)=>each.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  
  return (
    <Layout>
      <div className="bg-light d-flex flex-column text-center  p-5 ">
        <h1 className="mb-5 text-info">Blogs Feed</h1>
        <input type="search" placeholder="Search Blog" className="my-4 w-25 align-self-end"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
        {searchedData.length!==0?(
        <ul className="d-flex flex-column align-items-center ">
          {searchedData.map((each) => (
            <Link key={each.id} href={`./blog-item/${each.id}`} className={`mb-5 w-50 ${styles.blogCont}`}>
              <div className="card">
                <img src={`${each.img}`} className="card-img-top" alt={`${each.id}`} />
                <div className="card-body">
                  <h5 className="card-title">{each.title}</h5>
                  <div dangerouslySetInnerHTML={{__html: `${each.content.slice(0,200)}.....`}}/>
                  
                  
                </div>
              </div>
            </Link>
          ))}
        </ul>):<h1 className="text-secondary my-5">No Blogs Found</h1>
}
      </div>
    </Layout>
  );
};

export default BlogsFeed;


//using getServerSideProps function to fetch all blogs list from the server
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
