import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { useState } from 'react'
import MovieDetail from './components/MovieDetail'

const App = () => {
  const [movieTitle, setMovieTitle] = useState('Iron Man')

  return (
    <div className="App">
      <header>
        <Container>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Scegli il tuo film</Form.Label>
                <Form.Control
                  as="select"
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                >
                  <option>Iron Man</option>
                  <option>Black Widow</option>
                  <option>Spiderman</option>
                  <option>The Hulk</option>
                  <option>Doctor Strange</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
              <MovieDetail selectedMovie={movieTitle} />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

export default App
