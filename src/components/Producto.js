import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from './../actions/productosActions'

const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const confirmarEliminarProducto = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            dispatch( borrarProductoAction(id) )
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'El libro se elimino correctamente.',
                'success'
              )
            }
          })
        // dispatch( borrarProductoAction() )
    }
    return (

            <tr>
                <td>
                    {producto.nombre}
                </td>
                <td>
                    <span className="font-weight-bold">
                        {producto.precio}
                    </span>
                </td>
                <td className="acciones">
                    <Link to={`/productos/editar/${producto.id}`} className="btn btn-primary mr-2">
                        Editar
                    </Link>
                    <button className="btn btn-danger"
                        onClick={() => confirmarEliminarProducto(producto.id)}
                    >
                        Eliminar
                    </button>
                </td>
            </tr>

    );
}
 
export default Producto;