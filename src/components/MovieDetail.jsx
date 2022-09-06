import { useState, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'

const MovieDetail = ({ selectedMovie }) => {
  const [movie, setMovie] = useState(null)

  // componentDidMount = () => {
  //   // qui effettueremo la nostra chiamata iniziale per 'Iron Man'
  //   console.log('componentDidMount chiamato')
  //   this.fetchMovieDetails()
  // }

  const fetchMovieDetails = async () => {
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + selectedMovie
      ) // this.props.selectedMovie inizialmente sarà sempre Iron Man
      console.log('RESPONSE: ', response)
      if (response.ok) {
        // la chiamata è andata a buon fine
        // e posso aspettarmi il risultato nel body
        let data = await response.json() // leggo il body
        console.log(data)
        // this.setState({
        //   movie: data.Search[0], // <-- il mio risultato corretto
        // }) // dopo setState parte SEMPRE render() e, se c'è, componentDidUpdate
        setMovie(data.Search[0])
      } else {
        alert('ERRORE NEL RECUPERO DEL FILM')
      }
    } catch (error) {
      console.log('error happened', error)
    }
  }

  useEffect(() => {
    console.log('componentDidMount chiamato')
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('COMPONENTDIDUPDATE')
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovie])

  // componentDidUpdate(prevProps, prevState) {
  //   // questo metodo intercetta qualsiasi aggiornamento nel componente
  //   // quindi ogni cambio di stato e ogni cambio di props
  //   console.log('COMPONENTDIDUPDATE')

  //   // prevProps e prevState sono i due parametri di componentDidUpdate
  //   // prevProps è la versione precedente di this.props
  //   // prevState è la versione precedente di this.state
  //   //  nel nostro caso, noi vogliamo che fetchMovieDetails() venga invocato
  //   // quando scegliamo un nuovo titolo <-- quindi quando c'è un cambio nelle props
  //   // quello che NON vogliamo è che venga invocato di nuovo a seguito del
  //   // setState
  //   if (prevProps.selectedMovie !== this.props.selectedMovie) {
  //     // UNA CONDIZIONE DEL GENERE È OBBLIGATORIA IN OGNI COMPONENTDIDUPDATE
  //     this.fetchMovieDetails()
  //     // la condizione è necessaria in componentDidUpdate per fare in modo di
  //     // non entrare in un loop infinito, che è il pericolo n.1 di questo metodo
  //   }
  // }

  console.log('sono render')
  // ogni cambio nelle prop o nello state provoca una nuova
  // invocazione di render()
  // this.fetchMovieDetails() // <-- SBAGLIATO, perchè fetchMovieDetails()
  // effettua un setState! e ad ogni cambio di stato render() di invoca di nuovo
  // --> INFINITE LOOP
  return (
    <>
      {movie ? (
        <Card>
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body className="text-dark">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              {movie.Year} - {movie.imdbID}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div>
          <Spinner animation="border" variant="warning" />
        </div>
      )}
    </>
  )
}

export default MovieDetail
