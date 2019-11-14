import React, { useState } from 'react';

//redux
import { crearNuevoProductoAction } from '../actions/productosActions';
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacionActions';

//para acceder a los datos del store con hooks se hace uso 
//de useSelector
import { useDispatch, useSelector } from 'react-redux';

const NuevoProducto = ({history}) => {

    const  [nombre, setNombre] = useState('');
    const  [precio, setPrecio] = useState('');

    const dispatch = useDispatch();

    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto))
    const validarFormulario = (producto) => dispatch( validarFormularioAction())
    const exitoValidacion = (producto) => dispatch( validacionExito())
    const errorValidacion = (producto) => dispatch( validacionError())

    const errorData = useSelector(state => state.error.error)
    const submitNuewvoProducto = e => {
        e.preventDefault();

        validarFormulario();


        if( nombre.trim() === '' || precio.trim() === ''){
            errorValidacion();
            return;
        }
            exitoValidacion();

            agregarProducto({
                nombre,
                precio
            })        
            history.push('/')
    }
    console.log(errorData)
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
                        <form onSubmit={submitNuewvoProducto}>
                            <div className="form-group">
                                <label>Nombre Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Libro"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio Libro"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        {errorData ? <div className="font-weight-bold alert alert-danger text-center mt-4">Todos los campos son obligatorios</div> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;