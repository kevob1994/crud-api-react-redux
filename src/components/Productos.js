import React, {useEffect} from 'react'
import Producto from './Producto';
import {useDispatch,useSelector} from 'react-redux';
import {obtenerProductosAction} from '../actions/productosActions'

const Productos = () => {
    const dispatch = useDispatch();
    const obtenerProduct = () => dispatch(obtenerProductosAction())

    useEffect(()=> {
        obtenerProduct()
    },[])

    const loading = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const libros = useSelector(state => state.productos.productos)
    console.log("loading")
    console.log(loading)
    return (
        <React.Fragment>
            { error 
            ?
                <div className="font-weight-bold alert alert-danger text-center mt-4">
                    Hubo un error
                </div>
            : null }
                    <h2 className="text-center my-5">Listado de Productos</h2>

                    <table className="table table-striped">
                        <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>   
                        </thead>
                        <tbody>
                            {libros.map( (libro,index) => (
                                <Producto
                                    key={index}
                                    producto={libro}
                                />
                            ))}
                        </tbody>
                    </table>
                    {loading ? 'Cargando...' : null}
            }
            
        </React.Fragment>
    );
}
 
export default Productos;