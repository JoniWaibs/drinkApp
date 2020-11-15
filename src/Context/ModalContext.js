import React , { useState , useEffect , createContext } from 'react'















//crear el context para compartir entre componentes
export const ModalContext = createContext()
//crear el provider
const ModalProvider = ({ children }) => {

    //crearle un state al provider
    const [ idReceta , searchIdReceta ] = useState(null)

    //crear un segundo state para almacenar las recetas
    const [descReceta , setDescReceta  ] = useState([])

    //consultar a la api con usseEfect
    useEffect(() => {


        const consultarRecetas = async () =>{
            //si no hay receta rebota
            if(!idReceta) return;

            try{
                await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`)
                .then( res => {
                    return res.json()
                })
                .then(data => {
                    const arr =  data.drinks[0]
                    setDescReceta(arr)
                })

            }catch(err){
                console.log(err)
            }


        }
        consultarRecetas()


    },[idReceta])


    //retornar lo importante con su value
        return (
            <ModalContext.Provider 
            value={{
                searchIdReceta,
                descReceta,
                setDescReceta
            }}
            >
            { children }  
            </ModalContext.Provider>
        )
}

export default ModalProvider;
