

import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/createBlog.module.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });


//component to dispaly create blog page
const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const onPublishBlog = (e) => {
    e.preventDefault();
    if (title === "" || name === "" || content === "") {
      alert("Name, Title and Content should not be blank");
    } else {
      successPublish();
    }
  };

  //sending request to server to add new blog
  const successPublish = async () => {
    const response = await fetch("http://localhost:3000/api/blogsapi", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
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
    const msg=await response.text()
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
            Publish Blog
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateBlog;
