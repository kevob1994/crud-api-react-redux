import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    OBTENER_PRODUCTO_EXITO,
    OBTENER_PRODUCTO_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    EDICION_PRODUCTO_EXITO,
    EDICION_PRODUCTO_ERROR
} from './../types';

import clientAxios from "./../config/axios"

export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch( nuevoProducto() );


        clientAxios.post('/libros', producto)
            .then(respuesta => {
                console.log(respuesta)
                dispatch( agregarProductoExito(producto))
            })
            .catch(error => {
                console.log(error)
                dispatch( agregarProductoError())
            })
        
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload:producto
})

export const agregarProductoError = () => ({
    type: AGREGAR_PRODUCTO_ERROR
})


export function obtenerProductosAction() {
    return (dispatch) => {
        dispatch( comenzarDescarga() );


        clientAxios.get('/libros')
            .then(respuesta => {
                console.log(respuesta.data)
                dispatch( descargarProductoExito(respuesta.data))
            })
            .catch(error => {
                console.log(error)
                dispatch( descargarProductoError())
            })
        
    }
}

export const comenzarDescarga = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargarProductoExito = producto => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: producto
})

export const descargarProductoError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})


export function borrarProductoAction(id){
    return (dispatch) => {
        dispatch( obtenerProductoEliminar() );

        clientAxios.delete(`/libros/${id}`)
            .then( response => {
                console.log(response)
                dispatch( productoEliminarExito(id) );
            })
            .catch(err => {
                console.log(err)
                dispatch( productoEliminarError() );
            })
    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const productoEliminarExito = (id) => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const productoEliminarError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

export function obtenerProductoEditarAction(id) {
    // console.log(id)
    return (dispatch) => {

        dispatch(obtenerProductoAction());

        clientAxios.get(`libros/${id}`)
            .then( response =>{
                console.log(response)
                dispatch(obtenerProductoExito(response.data))
            })
            .catch(err => {
                dispatch(obtenerProductoError())
            })
    }
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR 
})

export const obtenerProductoExito = (producto) => ({
    type: OBTENER_PRODUCTO_EXITO,
    payload: producto
})

export const obtenerProductoError = () => ({
    type: OBTENER_PRODUCTO_ERROR 
})

export function editarProductoAction(producto){
    console.log("ENTROOOOOO")
    return (dispatch) => {
        dispatch( comenzarEdicionProducto() )

        clientAxios.put(`/libros/${producto.id}`, producto)
            .then(response => {
                editarProductoExito(response.data)
            })
            .catch(err =>{
                editarProductoError()
            })
    }
}

export const comenzarEdicionProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = (producto) =>({
    type: EDICION_PRODUCTO_EXITO,
    payload: producto
})

export const editarProductoError = () =>({
    type: EDICION_PRODUCTO_ERROR
})