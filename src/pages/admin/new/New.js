import React, { useState, useEffect } from 'react';
import './new.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { firestore } from '../../firebase';

const fetchNewsFromFirestore = async () => {
    try {
        const newsCollection = await firestore.collection('news').get();
        const updatedNewsData = [];
        newsCollection.forEach((doc) => {
            const news = doc.data();
            updatedNewsData.push(news);
        });
        return updatedNewsData;
    } catch (error) {
        console.error('Error fetching news from Firestore: ', error);
        return [];
    }
};

const addNewsToFirestore = async (newsData) => {
    try {
        await firestore.collection('news').add(newsData);
        console.log('News added to Firestore successfully');
    } catch (error) {
        console.error('Error adding news to Firestore: ', error);
    }
};

const ITEMS_PER_PAGE = 2;


function News() {
    const [showModal, setShowModal] = useState(false);
    const [newNews, setNewNews] = useState(false);
    const [firebaseNews, setFirebaseNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = firebaseNews.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newsPage = firebaseNews.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsData = await fetchNewsFromFirestore();
                setFirebaseNews(newsData);
            } catch (error) {
                console.error('Error fetching news from Firestore: ', error);
            }
        };

        fetchData();
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleAddNews = async () => {
        try {
            const newsData = {
                title: newNews.title,
                description: newNews.description,
                image: newNews.image,
                date: newNews.date,
            };
            await addNewsToFirestore(newsData);
            const updatedNews = await fetchNewsFromFirestore();
            setFirebaseNews(updatedNews);
            handleClose();
        } catch (error) {
            console.error('Error adding news to Firestore: ', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setNewNews({
                    ...newNews,
                    image: imageUrl,
                    file: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNews({
            ...newNews,
            [name]: value,
        });
    };

    return (
        <div className="app">
            <div className="main-content">
                <div className="info">
                    <h1>บอร์ดข่าวสาร</h1>
                </div>
                <div className="row">
                    {newsPage.map((news, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="card">
                                <img
                                    src={news.image}
                                    className="card-img-top"
                                    alt={`News ${index}`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{news.title}</h5>
                                    <p className="card-text">{news.description}</p>
                                    <p className="card-text">{news.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`btn btn-primary ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                <div className="add-button">
                    <button className="btn btn-primary" onClick={handleShow}>Add</button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newNews.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={newNews.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*" 
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newNews.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNews}>
                        Add News
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default News;
