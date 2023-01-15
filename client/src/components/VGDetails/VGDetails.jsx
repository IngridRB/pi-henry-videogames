import './vGDetails.css';
import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getVideogamesDetails } from '../../actions';
// import { useEffect } from 'react';
// import { connect } from "react-redux";

const VGDetails = () => {
  // console.log (props);
  // const { id } = useParams();

  // React.useEffect(() => {
  //   getVideogamesDetails(id);
  // }, []);

  // 

  return (
    <div className="container-details">

      <div className="card-details">

        <div className="card-details-image">
          <img src=""  alt="Imagen del Videojuego" />
        </div>

        <div className="card-details-body">
          <div className="card-details-close"> 
            <Link to="/home/" >          
              <button>x</button>
            </Link>
          </div>
          <div className="card-details-title">
            <h2 >VideoJuego</h2>
          </div>
          <div className='card-text'>
            <p>Géneros: <span className="text"> Género, azul </span></p>
            <p>Fecha de lanzamiento: <span className="text"> 31/12/2022 </span></p>
            <p>Rating: <span className="text"> 5 </span></p>
            <p>Plataformas: <span className="text"> Internet </span></p>
            <p>Descripción: <span className="text"> Hay algunas reglas básicas que te ayudarán a atravesar el juego. Atacar enemigos. La forma general de atacar a los enemigos es saltar sobre ellos. </span></p>
          </div>
 
        </div>

      </div>

    </div>
  )
}
// function mapStateToProps(state) {
//   return {
//     videogame: state.getVideogamesDetails,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getVideogamesDetails: (id) => dispatch(getVideogamesDetails(id)),
//   };
// }
export default VGDetails;
