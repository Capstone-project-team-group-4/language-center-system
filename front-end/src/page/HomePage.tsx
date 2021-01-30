import React, { ReactElement } from "react";
import { Col, Container, Jumbotron, Media, Row } from "react-bootstrap";
import './HomePage.css';
import AboutUs from './AboutUs.jpg';

export function HomePage (): ReactElement {
    return (
        <Container fluid = {true} id = "PageContentContainer">
            <main>
                <Container 
                    fluid = {true} 
                    id = "PageBodyContainer" 
                    className = "px-0"
                >
                    <Row>
                        <Col>
                            <Jumbotron fluid id = "AboutUs">
                                <Container>
                                    <Media>
                                        <Media.Body>
                                            <h2 className = "py-5">
                                                Giới thiệu về 
                                                Language Center
                                            </h2>
                                            <p className = "pr-5">
                                                <span 
                                                    className 
                                                    = "font-weight-bold"
                                                >
                                                    Language Center
                                                </span> là tổ chức 
                                                đào tạo và khảo thí ngoại ngữ 
                                                nội bộ cho tổ chức
                                                , đặc biệt hướng tới đối tượng 
                                                người đi làm và sinh viên. 
                                                Language Center mang đến 
                                                những phương pháp giáo dục 
                                                tiên tiến, ứng dụng 
                                                công nghệ tối đa. 
                                                Chúng tôi phát triển 
                                                các dịch vụ dựa trên giá trị 
                                                cốt lõi của tính trách nhiệm
                                                , sự linh hoạt và sáng tạo
                                                . Mỗi sản phẩm
                                                , dịch vụ và hành động 
                                                của Language Center đều đáp ứng 
                                                3 tiêu chí: linh hoạt
                                                , tiết kiệm và hiệu quả.
                                            </p>
                                        </Media.Body>
                                        <img
                                            width = "40%"
                                            height = "200%"
                                            className="mr-3"
                                            src = {AboutUs}
                                            alt="Generic placeholder"
                                        />         
                                    </Media>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
            </footer>
        </Container>
    );
}