import React from 'react';
import './App.css';
import {Col, Container, FormControl, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

type Rating = {
    helpful: boolean;
    comment: string;
    referenceId: string;
    link: string;
}

const Rating: React.FC<{ rating: Rating }> = ({rating}) => {
    return <div className="my-3 p-3 border border-3 border-dark bg-white">
        <Row>
            <Col xs="auto"><FontAwesomeIcon icon={rating.helpful ? faThumbsUp : faThumbsDown} size="3x"/></Col>
            <Col>
                <Row>
                    <Col><small className="text-black-50">{rating.referenceId}</small></Col>
                    <Col xs="3"><small className="text-black-50">gestern</small></Col>
                </Row>
                <Row>
                    <Col>
                        {rating.comment}
                    </Col>
                    <Col xs="auto">
                        <FormControl className="w-100 h-100" type="checkbox"/>
                    </Col>
                </Row>
                <Row>
                    <Col><small className="text-black-50">{rating.link}</small></Col>
                </Row>
            </Col>
        </Row>
    </div>
}

const Ratings: React.FC = () => {
    const [ratings, setRatings] = React.useState<Rating[] | undefined>(undefined);

    React.useEffect(() => {
            fetch("http://192.168.50.38:8080/doc/1/ratings", {
                method: 'GET',
                mode: 'cors'
            })
                .then(result => result.json())
                .then(ratings => setRatings(ratings));
        }
        , []);

    if (ratings === undefined) return <div>Keine Daten</div>;

    return <>
        {ratings.map(rating => <Rating rating={rating}/>)}
    </>
}

function App() {

    return <>
        <Container fluid>
            <Row className="border-bottom border-3 border-dark bg-white">
                <Col>
                    <nav className="p-3 float-end"><FontAwesomeIcon icon={faBars} size="3x"/></nav>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row>
                <Col>
                    <Ratings/>
                </Col>
            </Row>
        </Container>
    </>
}

export default App;
