const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('../usuarios/controlador');

const router = express.Router();

router.get('/', consultar_datos_publicaciones);
router.get('/:id', consultar_un_dato_publicaciones);
router.post('/', agregar_una_publicacion);
router.put('/', eliminar_una_publicacion);

async function consultar_datos_publicaciones(req, res){
    try {
        const publicaciones = await controlador.consultar_datos_publicaciones();
        respuestas.success(req, res, publicaciones, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
};

async function consultar_un_dato_publicaciones (req, res){
    try {
        const publicaciones = await controlador.consultar_un_dato_publicaciones(req.params.id);
        respuestas.success(req, res, publicaciones, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    } 
};

async function agregar_una_publicacion (req, res){
    try {
        const publicaciones = await controlador.agregar_una_publicacion(req.body);
        if(req.body.id == 0){
            mensaje = 'publicación hecha con exito';
        }else{
            mensaje = 'publicación actualizada con exito';
        }
        respuestas.success(req, res, mensaje, 201);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    } 
};

async function eliminar_una_publicacion (req, res){
    try {
        const publicaciones = await controlador.eliminar_una_publicacion(req.body);
        respuestas.success(req, res, 'publicación eliminada correctamente', 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    } 
};



module.exports = router;