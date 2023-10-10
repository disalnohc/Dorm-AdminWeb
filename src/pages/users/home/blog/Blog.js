import React from "react";
import BlogCard from "../../blog/BlogCard";
import Bolg from "../../images/about.jpg"

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
        <div className="container recent" style={{ display: "flex", width: "1200px", flexDirection: "column", alignItems: "center", gap: "52px" }}>
          <h4>Board & News</h4>
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
