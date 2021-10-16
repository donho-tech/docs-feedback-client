import React from 'react';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";

type Rating = {
    helpful: boolean;
    comment: string;
    referenceId: string;
    link: string;
}

const Rating: React.FC<{ rating: Rating }> = ({rating}) => {
    return <div>{rating.comment}</div>
}

const Ratings: React.FC = () => {
    const [ratings, setRatings] = React.useState<Rating[] | undefined>(undefined);

    React.useEffect(() => {
            fetch("http://localhost:8080/doc/1/ratings", {
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

    return (
        <Container>
            <Row>
                <Col>
                    <Ratings/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
