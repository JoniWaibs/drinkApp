//a partir de este nomento los datos ya no fluyen desde el app js hacia los componentes hijos
//sino que fluyen desde este componente hacia cualquier otro lado
import React , { createContext , useState , useEffect} from 'react'

//crear el context y almacenarlo en la fconstante
export const CategoriasContext = createContext()

//siempre que se crea un contexto hay que crear un provider
//Desde el provider se van a ejecturar las funciiones


//crear el provider
const CategoriasProvider = ( {children} ) =>{

    //crear el state del context
    const [ categorias, saveCategorias ] = useState([])

    //consulto la api con useEffect para que se haga automaticamente
    useEffect(() => {

        const obtenerCategoria = async () =>{
            try{
                await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
                .then( res=>{
                    return res.json()
                })
                .then(data =>{
                    saveCategorias(data.drinks)
                }) 
    
            }catch(err){
                console.log('Error' , err)
            }

        }
        obtenerCategoria();
    },[])
   
    //lo importante
    //todos los componentes se van a almacenar en childeen
    //todo lo que va en value es lo que quiero msotrar en el resto de componentes por ejemplo estas categorias
    return(
        <CategoriasContext.Provider
        value={{//doble parentsis
           categorias,
        }}
        >
            { children }
        </CategoriasContext.Provider>
    )
}

//exportarlo
export default CategoriasProvider;
//importarlo en el app.js
// a partir de aqui este componente quedara como padre del app.js

//y en cada componente que yo quiera usar estos datos
//debo importar un hook useContext
//ver en componente form.js un ejemplo
//en un desarrollo normal este fichero se harian las consultas a las apis, 