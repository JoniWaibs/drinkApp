import React , { useContext, useState } from 'react'
//improtar el modal context para usar su funcion que guara el id
import  { ModalContext } from '../Context/ModalContext'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


//estilos para la ventana modal
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));





const Receta = ({receta}) => {

    //traer values del context la funcion que ejecuta el usse efect que consulta la api y la desc de la receta
    const { searchIdReceta , descReceta , setDescReceta} = useContext( ModalContext )
    console.log(descReceta)
    //config modal
    const [ modalStyle ] = useState( getModalStyle )
    //cuando se abra el modal
    const  [ open , setOpen ] = useState(false)
    //clases para el modal
    const classes = useStyles()
    //abre el modal
    const handleOpen = () => {
        setOpen(true);
    };
    //cierra el modal
    const handleClose = () => {
        setOpen(false);
    };


    //funcon que se ejecuta automaticamente y muestr alos ingredientes
    const showIngredientes = receta =>{

       let ingredientes = []
       for( let i = 1 ; i < 16 ; i++ ){
           if(receta[`strIngredient${i}`]){
               ingredientes.push(
               <li>{receta[`strIngredient${i}`]}</li>
               )
           }
       }
       return ingredientes;
    }


    return (
        <div className="float-left col-md-4 mb-3" >
            <div className="card">
                <div className="card-header">
                    <h2>{receta.strDrink}</h2>
                </div>
                <div>
                    <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>
                </div>
                <div className="card-body">
                    <button
                    type="button" 
                    className="btn btn-primary btn-block" 
                    
                    onClick={ () => {
                        //paso el id para consultar
                        searchIdReceta(receta.idDrink);
                        //abro el mdal
                        handleOpen();
                    }}
                    >Ver receta</button>
                </div>

                <Modal
                    open={ open }
                    onClose={ ()=>{
                        //cirrra el modal
                        handleClose();
                        //y vuelve a null el state 
                        searchIdReceta(null);
                        setDescReceta([])
                    } } 
                >
                    <div style={ modalStyle } className={classes.paper}>
                        <h2>{descReceta.strDrink}</h2>
                        <h3 className="mt-t">Preparacion:</h3>
                        <p>{descReceta.strInstructions}</p>
                        <h3 className="mt-t">Ingredientes:</h3>
                        <ul>
                            { showIngredientes( descReceta )}
                        </ul>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Receta
