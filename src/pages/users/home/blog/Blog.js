import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firestore } from '../../../../firebase';

const fetchNewsFromFirestore = async () => {
  try {
    const newsCollection = await firestore.collection("news").get();
    const updatedNewsData = [];
    newsCollection.forEach((doc) => {
      const news = { id: doc.id, ...doc.data() };
      updatedNewsData.push(news);
    });
    return updatedNewsData;
  } catch (error) {
    console.error("Error fetching news from Firestore: ", error);
    return [];
  }
};


const ITEMS_PER_PAGE = 3;

function Blog() {
  const [firebaseNews, setFirebaseNews] = useState([]);
  const [currentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const newsPage = firebaseNews.slice(startIndex, endIndex);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchNewsFromFirestore();
        setFirebaseNews(newsData);
      } catch (error) {
        console.error("Error fetching news from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="blog-out mb">
        <div className="container recent" style={{ display: "flex", width: "1200px", flexDirection: "column", alignItems: "center", gap: "52px" }}>
          <h4>Board & News</h4>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          {newsPage.map((news, index) => {
            if (index % 3 === 0) {
              return <div key={index} className="row">
                {newsPage.slice(index, index + 3).map((newsItem, itemIndex) => (
                  <div key={itemIndex} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={newsItem.image}
                        className="card-img-top"
                        alt={`News ${index + itemIndex}`}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{newsItem.title}</h5>
                        <p className="card-text">{newsItem.description}</p>
                        <p className="card-text">{newsItem.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>;
            }
            return null; 
          })}
        </div>
      </section>
    </>
  );
};

export default Blog;
