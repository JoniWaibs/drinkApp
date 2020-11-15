//importrar el nuevo hook
import React , { useContext, useState } from 'react'
import {CategoriasContext} from '../Context/CategoriasContext'
import { RecetasContext } from '../Context/RecetasContext'






const Form = () => {

   //usar el context creado ( el toma un context, cual? el creado en la hoja categoriasContext) hay que importarlo primero
   //el destructuring se hace a los datos que estoy pasando como value ej categorias
    const { categorias } = useContext( CategoriasContext )
    //me traigo el segundo context en este caso es una funcion que la voy a ejeturar en el submit y que se va a llevar un argumento que es el ingredientes
    const { buscarRecetas } = useContext( RecetasContext )

    //ahora states locales, para guardar datos que selecciona el user
    const [  ingredientes , setIngredientes  ] = useState({
        ingrediente: "",
        categoria:""
    })
    //captura los datos dle input ingrediente
    const caputeData = e =>{
        setIngredientes({
            ...ingredientes,
            [e.target.name] : e.target.value,
        })
    }

    //enviar datos
    const consultarAPI = e =>{
        e.preventDefault()
        //uso el segundo context y le paso un argumento 
        buscarRecetas(ingredientes)
    } 

   


    return (
     <div className="container">
         <div className="text-center">
             <h2>Buscá bebidas por categoria o ingrediente</h2>
         </div>
         <form 
            className="mt-5" 
            onSubmit={ consultarAPI }             
         >
             <div className="row">
                 <div className="col-md-4 col-sm-12 my-3">
                    <input
                        type="text"
                        name="ingrediente"
                        placeholder="ej: Tequila"
                        className=" form-control"
                        onChange={ caputeData }
                    />
                 </div>
                 <div className="col-md-4 col-sm-12 my-3">
                  <select 
                    className="form-control"
                    name="categoria"
                    onChange={ caputeData }
                  >
                      <option val="">--Seleccione--</option>
                      {//creo las categorias aca adentro, vienen desde el usecontext que a su vez vienen del componente padre ctaegoriascontex que consume la api 
                        categorias.length > 0 
                            ?//itero con un mat y dentro retorno (...) nuevos options cada uno tiene un key individual ( esto es igualr al document.createlemente )
                            categorias.map( categ => (
                                <option 
                                key={categ.strCategory}
                                value={categ.strCategory}
                                >{categ.strCategory}</option>
                            ))
                            :
                            null
                      }
                  </select>
                 </div>
                 <div className="col-md-4 col-sm-12 my-3">
                    <input
                        type="submit"
                        value="Buscar Bebida"
                        className="btn btn-primary btn-block text-uppercase"

                    />
                 </div>
             </div>
         </form>
     </div>
       
    )
}

export default Form
