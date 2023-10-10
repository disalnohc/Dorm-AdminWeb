import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={blog.image} className="card-img-top" alt={blog.title} />
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          <p className="card-text">{blog.description}</p>
          <p className="card-text">Author: {blog.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
