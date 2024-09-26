import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/Categories.css"

function CategoriesPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/products").then((res) => {
            setProducts(res.data);
        });
    }, []);


    // Uncomment to fetch categories if your API supports this
    // axios.get("http://localhost:8000/api/categories").then((res) => {
    //   setCategories(res.data);
    // });


    return (

        <Container fluid className="p-10">
            <Row className="mb-0">
                <Col md={4} className="p-0">
                    <h2>Categories</h2>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroup.Item key={category.id}>
                                <Link to={`/category/${category.id}`}>
                                    {category.name}
                                </Link>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col md={8} className="mb-4 p-0">
                    <Carousel>
                        {products.slice(0, ).map((product) => (
                            <Carousel.Item key={product.id}>
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                                    <img
                                        className="d-block w-100"
                                        src={product.image}
                                        art={product.name}
                                        style={{ height: "400px", objectFit: "cover" }}
                                    />
                                    <Carousel.Caption>
                                        <h3>{product.name}</h3>
                                        <p>Price: ${product.price}</p>
                                    </Carousel.Caption>
                                </Link>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>


            </Row>

        </Container>
    );

}

export default CategoriesPage;