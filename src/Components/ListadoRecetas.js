import React, { useContext } from 'react'
import Receta from '../Components/Receta'
//importar el context con las recetas
import  { RecetasContext } from '../Context/RecetasContext'


const ListadoRecetas = () => {
    //extrae las recetas del usecontext
    const { recetas } = useContext( RecetasContext )




    return (
       <div className="clearfix">
           { recetas.length > 0
           ? recetas.map( receta => (
               <Receta
                    key={receta.idDrink}
                    receta={receta}
               />
           )) 
           :
           <p>No hay recetas para mostrar</p>
           }
    
       </div>
    )
}

export default ListadoRecetas
