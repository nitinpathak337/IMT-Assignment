Hi All,

This is the Advanced Blog App , I have bulit using Next JS and React JS. 

To run the application, open the repository in VS code and navigate to the root directory. Then give command 'npm run dev' in the terminal.
Then open http://localhost:3000/ to view the application in the browser. 

File Structure:

Components folder contain three components : Header , Footer and Layout , to achieve similar layout throughout the application. 

Style folder contains all the css stylesheets that have been used in the application.

Pages folder have api folder , that contains the backend part and all the apis created.

index.js is the login page , blogfeed.js is the home page that displays all the list of blogs , blogItem page displays a single blog item ,

createBlog.js is the page for creating blog and editBlog is the page for editing the blog. 


Features :

User  can login the application with three roles Admin, Author and Reader. Admin and Author can wtite new blogs but reader can not. 

Admin can update and delete all the blogs , while author can update and delete only its own blogs. Readers can only view blogs.

All three user types can add comments in the blog.

Search functionality is implemented to search a blog based on its title. 

Implemented React Hooks and Server Side Rending. 


Thank You !

