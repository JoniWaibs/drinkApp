import React, { createContext, useState, useEffect } from 'react'

//ya disponibilizo el hook a nivel global
export const RecetasContext = createContext()

//crear el provider
const RecetasProvider = ({children})=>{

    //crear un state para almacenar los datos de la bsuqeuda
    const [ busqueda , buscarRecetas ] = useState({
        ingrediente: "",
        categoria:""
    })
    const { ingrediente , categoria } = busqueda
    //otro stste que almacena los datos del resultado de la busqueda
    const [ recetas ,setRecetas ] = useState([])


    //consultar la api
    useEffect(()=>{
        const resultadoRecetas = async () =>{

            try{
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`
                await fetch(url)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    setRecetas(data.drinks)
                })

            }catch(err){
                console.log(err)
            }


        }
        resultadoRecetas()
    }, [busqueda])


    



    //retornar el provider con su value ( las recetas obtenidas de la api)
    return(

        <RecetasContext.Provider
            value={//doble parentsis
               {buscarRecetas,recetas}
            }
        >
            {children}
        </RecetasContext.Provider>
    )


}

export default RecetasProvider;
//importarlo en el app.js al provider
//usar el hook useCOntext en el Formulario que es donde quiero ahcer disponible los datos

