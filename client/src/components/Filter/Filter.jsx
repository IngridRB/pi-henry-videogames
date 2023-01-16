import './filter.css';
import React from 'react';
import { useSelector } from 'react-redux';


const Filter = () => {
  const genres = useSelector((state) => state.genresLoaded);

  return (
    <div className="box-filter">
      <div className="filter">
        <select className="filter-button n1" defaultValue={'all'} name="gender" >
          <option value='all'>Filtrar por Género:</option>
            {
              genres.map((genre) => <option value={genre.name} key={genre.name}>{genre.name}</option>)
            }
        </select>

        <select  className="filter-button n2" defaultValue={'all'} name="origin" >
          <option value="all">Filtrar por Origen:</option>
          <option value="api">API</option>
          <option value="db">Base de Datos</option>
        </select>

        <select className="filter-button n3" defaultValue={'all'} name="sortBy" >
          <option value="all">Ordenar por: </option>
          <option value="alpha-asc">Orden Alfabético Ascendente</option>
          <option value="alpha-desc">Orden Alfabético Descendente</option>
          <option value="rating-asc">Rating Ascendente</option>
          <option value="rating-desc">Rating Descendente</option>
        </select>
      </div>
    </div>
  )
}
export default Filter;