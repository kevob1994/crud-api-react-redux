import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import { obtenerProductoEditarAction, editarProductoAction } from './../actions/productosActions';
import { validarFormularioAction, validacionExito, validacionError } from './../actions/validacionActions'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const EditarProducto = ({ history, match}) => {
    const nombreRef = useRef('')
    const precioRef = useRef('')
    const {id} = match.params;

    const dispatch = useDispatch();

    const obtenerProducto = () => dispatch(obtenerProductoEditarAction(id))
    const editarProducto = (producto) => dispatch(editarProductoAction(producto))
    const validarFormulario = (producto) => dispatch( validarFormularioAction())
    const exitoValidacion = (producto) => dispatch( validacionExito())
    const errorValidacion = (producto) => dispatch( validacionError())

    const producto = useSelector(state => state.productos.producto)
    const error = useSelector(state => state.productos.error)

    useEffect(()=> {
        obtenerProducto()
    },[dispatch,id])

    const submitEditarProducto = e => {
        e.preventDefault();
        
        const obj = {
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        }

        validarFormulario();

        if(nombreRef.current.value.trim() === "" || precioRef.current.value.trim() === ""){
            errorValidacion();
            return;
        }

        exitoValidacion();

        editarProducto(obj);

        Swal.fire(
            'Almacenado',
            'El producto se actualizo correctamente',
            'success'
        )
        history.push('/')
    }

    return (
        <div className="row justify-content-center mt-5">
            {/* {producto.nombre} */}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit ={ submitEditarProducto }>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                    ref={nombreRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio" 
                                    defaultValue={producto.precio}
                                    ref={precioRef}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
                        { error 
                            ?
                                <div className="font-weight-bold alert alert-danger text-center mt-4">
                                    Hubo un error
                                </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;