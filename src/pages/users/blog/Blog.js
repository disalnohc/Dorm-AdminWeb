import React from "react";
import Back from "../common/Back";
import img from "../images/services.jpg";
import BlogCard from "./BlogCard";
import Bolg from "../images/about.jpg";
import "./blog.css";

const Blog = () => {

  const blogs = [
    {
      title: "Blog Title 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget augue vel justo eleifend venenatis.",
      author: "John Doe",
      image: Bolg, 
    },
    {
      title: "Blog Title 2",
      description: "Sed ac tellus id nunc sollicitudin hendrerit. Etiam bibendum, neque eu facilisis hendrerit.",
      author: "Jane Smith",
      image: Bolg, 
    },
    {
      title: "Blog Title 3",
      description: "Vivamus euismod tincidunt justo, eget cursus metus lacinia nec. Aliquam id augue a libero.",
      author: "Alice Johnson",
      image: Bolg, 
    },
  ];

  return (
    <>
      <section className="blog-out mb">
        <Back name="Blog" title="Blog Grid - Our Blogs" cover={img} />
        <div className="container-blog">
          <h1>Board & News</h1>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          <div className="row">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
