

import { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/createBlog.module.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

//component to display edit blog page
const EditBlog = ({data}) => {
  const router=useRouter();
  const id=router.query.id;
  const blogItem=data.filter((each)=>each.id===id);
  
    const [content, setContent] = useState(blogItem[0].content);
    const [title, setTitle] = useState(blogItem[0].title);
    const [name, setName] = useState(blogItem[0].writer);
    const [img, setImg] = useState(blogItem[0].img);
  
    const onPublishBlog = (e) => {
      e.preventDefault();
      if (title === "" || name === "" || content === "") {
        alert("Name, Title and Content should not be blank");
      } else {
        successPublish();
      }
    };
  
    //updating the blog 
    const successPublish = async () => {
      const response = await fetch("http://localhost:3000/api/blogsapi", {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          id:id,
          name: name,
          title: title,
          img: img,
          content: content,
        }),
      });
      setContent("");
      setImg("");
      setName("");
      setTitle("");
      const msg=await response.text();
      alert(msg);
    };
  
    return (
      <Layout>
        <div className="p-5 d-flex flex-column align-items-center h-100">
          <h1 className="text-info">Write Your Own Blog</h1>
          <form className="d-flex flex-column align-items-stretch w-75">
            <label htmlFor="title" className="my-2">
              Enter Title of the Blog
            </label>
            <input
              type="text"
              placeholder="Title"
              id="title"
              className="mb-3"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="image" className="my-2">
              Enter Image Link
            </label>
            <input
              type="link"
              placeholder="Enter Image link you want to include in your blog"
              id="image"
              className="mb-3"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <label htmlFor="name" className="my-2">
              Enter Your Name
            </label>
            <input
              type="link"
              placeholder="Name"
              id="name"
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="content" className="my-2">
              Enter Content of the Blog
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className={styles.editor}
              id="id"
            />
            <button
              className="btn btn-primary mt-5 align-self-center"
              onClick={onPublishBlog}
              type="submit"
            >
              Publish Updated Blog
            </button>
          </form>
        </div>
      </Layout>
    );
  };
  
  
  export default EditBlog;

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
    props: { data }
  };
  }