import React  from 'react'
import {Header} from './Components/Header'
import Form from './Components/Form'
import ListadoRecetas from './Components/ListadoRecetas'
//importar el context
import CategoriasProvider from './Context/CategoriasContext'
//importar el segundo context no immporta el orden mientras esten ordenados jaja
import  RecetasProvider from './Context/RecetasContext'
//importar el ercer contxt
import ModalProvider from './Context/ModalContext'


//y envolver todo la app en el context para que los datos que estan dentro esten disponibles para todos los componentes hijos al mismo tiempo
function App() {
  return ( 
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          <Header/>
          <div className="container mt-5">
            <div className="row">
              <Form/>
            </div>
            <div className="row mt-5 ">
              <ListadoRecetas/>
            </div>
          </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
