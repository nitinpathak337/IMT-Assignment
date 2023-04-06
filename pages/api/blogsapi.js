


import {v4 as uuidv4} from 'uuid'


//initial blog list to render
let Blogs = [
  {
    id:uuidv4(),
    title: "Blog One",
    content:
      "This is the first Blog I have created using my own Blogs Website, Lokking to create many other blogs also. The emergence and growth of blogs in the late 1990s coincided with the advent of web publishing tools that facilitated the posting of content by non-technical users who did not have much experience with HTML or computer programming. Previously, knowledge of such technologies as HTML and File Transfer Protocol had been required to publish content on the Web, and early Web users therefore tended to be hackers and computer enthusiasts. In the 2010s, the majority are interactive Web 2.0 websites, allowing visitors to leave online comments, and it is this interactivity that distinguishes them from other static websites.[2] In that sense, blogging can be seen as a form of social networking service. Indeed, bloggers not only produce content to post on their blogs but also often build social relations with their readers and other bloggers.[3] Blog owners or authors often moderate and filter online comments to remove hate speech or other offensive content. There are also high-readership blogs which do not allow comments.",
    writer: "Admin",
    img: "https://th.bing.com/th/id/R.00e3a080ed68c8cb424c3e84a7631d86?rik=stEjC4ABrKWnEw&riu=http%3a%2f%2fwww.ecampusnews.com%2ffiles%2f2016%2f01%2fblogs.jpg&ehk=5oDkBWPnLzL8FFugyxR6325T%2bSLdwvY1Gif1V330xbU%3d&risl=&pid=ImgRaw&r=0",
    comments: ["This is awesome", "Looking forward to read all your blogs"],
  },
  {
    id: uuidv4(),
    title: "Blog Two",
    content:
      "This is the first Blog I have created using my own Blogs Website, Lokking to create many other blogs also.The emergence and growth of blogs in the late 1990s coincided with the advent of web publishing tools that facilitated the posting of content by non-technical users who did not have much experience with HTML or computer programming. Previously, knowledge of such technologies as HTML and File Transfer Protocol had been required to publish content on the Web, and early Web users therefore tended to be hackers and computer enthusiasts. In the 2010s, the majority are interactive Web 2.0 websites, allowing visitors to leave online comments, and it is this interactivity that distinguishes them from other static websites.[2] In that sense, blogging can be seen as a form of social networking service. Indeed, bloggers not only produce content to post on their blogs but also often build social relations with their readers and other bloggers.[3] Blog owners or authors often moderate and filter online comments to remove hate speech or other offensive content. There are also high-readership blogs which do not allow comments.",
    writer: "Admin",
    img: "https://th.bing.com/th/id/OIP.cRZoxgfjQUtQ6Hvvf9n14wHaE8?pid=ImgDet&rs=1",
    comments: ["This is awesome", "Looking forward to read all your blogs"],
  },
  {
    id: uuidv4(),
    title: "Blog Three",
    content:
      "This is the first Blog I have created using my own Blogs Website, Lokking to create many other blogs also.A blog can be private, as in most cases, or it can be for business or not-for-profit organization or government purposes. Blogs used internally and only available to employees via an Intranet are called corporate blogs. Companies use internal corporate blogs to enhance the communication, culture and employee engagement in a corporation. Internal corporate blogs can be used to communicate news about company policies or procedures, build employee esprit de corps and improve morale. Companies and other organizations also use external, publicly accessible blogs for marketing, branding, or public relations purposes. Some organizations have a blog authored by their executive; in practice, many of these executive blog posts are penned by a ghostwriter who makes posts in the style of the credited author. Similar blogs for clubs and societies are called club blogs, group blogs, or by similar names; typical use is to inform members and other interested parties of club and member activities.",
    writer: "Admin",
    img: "https://www.lifewire.com/thmb/A9JP7DO7H2eNsPLdhWhkl-_dAW4=/5000x3333/filters:fill(auto,1)/blogging--woman-reading-blog-887987150-5afa2f65ba61770036427de0.jpg",
    comments: ["This is awesome", "Looking forward to read all your blogs"],
  },
  {
    id: uuidv4(),
    title: "Blog Four",
    content:
      "This is the first Blog I have created using my own Blogs Website, Lokking to create many other blogs also. A blog can be private, as in most cases, or it can be for business or not-for-profit organization or government purposes. Blogs used internally and only available to employees via an Intranet are called corporate blogs. Companies use internal corporate blogs to enhance the communication, culture and employee engagement in a corporation. Internal corporate blogs can be used to communicate news about company policies or procedures, build employee esprit de corps and improve morale. Companies and other organizations also use external, publicly accessible blogs for marketing, branding, or public relations purposes. Some organizations have a blog authored by their executive; in practice, many of these executive blog posts are penned by a ghostwriter who makes posts in the style of the credited author. Similar blogs for clubs and societies are called club blogs, group blogs, or by similar names; typical use is to inform members and other interested parties of club and member activities.",
    writer: "Author1",
    img: "https://th.bing.com/th/id/OIP.cRZoxgfjQUtQ6Hvvf9n14wHaE8?pid=ImgDet&rs=1",
    comments: ["This is awesome", "Looking forward to read all your blogs"],
  },
  {
    id: uuidv4(),
    title: "Blog Five",
    content:
      "This is the first Blog I have created using my own Blogs Website, Lokking to create many other blogs also. A blog can be private, as in most cases, or it can be for business or not-for-profit organization or government purposes. Blogs used internally and only available to employees via an Intranet are called corporate blogs. Companies use internal corporate blogs to enhance the communication, culture and employee engagement in a corporation. Internal corporate blogs can be used to communicate news about company policies or procedures, build employee esprit de corps and improve morale. Companies and other organizations also use external, publicly accessible blogs for marketing, branding, or public relations purposes. Some organizations have a blog authored by their executive; in practice, many of these executive blog posts are penned by a ghostwriter who makes posts in the style of the credited author. Similar blogs for clubs and societies are called club blogs, group blogs, or by similar names; typical use is to inform members and other interested parties of club and member activities.",
    writer: "Author2",
    img: "https://www.hallaminternet.com/wp-content/uploads/2020/01/Is-blogging-relevant-anymore.jpeg",
    comments: ["This is awesome", "Looking forward to read all your blogs"],
  },
];



import nc from "next-connect";

const handler =  nc({
  
}).get((req, res) => {
  //handler to send all blog list
  res.send(Blogs);
  
})
.post(async (req, res) => {
  //handler to post new blog
  const {name,title,img,content}=req.body;
  const newBlogItem={
    id:uuidv4(),
    title:title,
    writer:name,
    content:content,
    img:img,
    comments:[]
  }
   Blogs.push(newBlogItem);
  res.send("Blog Added Successfully")
  
})
.delete(async (req,res)=>{
  //handler to delete a blog
  const {id}=req.body;
  const index=Blogs.findIndex((each)=>{
    if(each.id===id){
      return true;
    }
    return false;
  })
  
  Blogs.splice(index,1);
  res.send("Blog Deleted Successfully")
})
.put(async (req, res) => {
  //handler to edit blog and also to add comments in  blog
  const {name,title,img,content,id,comment}=req.body;
  if(comment===undefined){
  const oldBlog=Blogs.filter((each)=>each.id===id);
  const oldComments=oldBlog[0].comments;
  const updatedBlogItem={
    id:id,
    title:title,
    writer:name,
    content:content,
    img:img,
    comments:oldComments
    
  }
  const index=Blogs.findIndex((each)=>{
    if(each.id===id){
      return true;
    }
    return false;
  })

   Blogs.splice(index,1,updatedBlogItem);
  res.send("Blog Updated Successfully")
}
else{
  const index=Blogs.findIndex((each)=>{
    if(each.id===id){
      return true;
    }
    return false;
  })
  Blogs[index]={...Blogs[index],comments:[...Blogs[index].comments,comment]};
  res.send("Comment Added Successfully")
}
})


export default handler;
