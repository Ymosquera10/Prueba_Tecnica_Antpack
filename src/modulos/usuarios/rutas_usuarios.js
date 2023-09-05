const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', consultar_datos);
router.get('/:id', consultar_un_dato);
router.post('/', agregar);
router.put('/', eliminar);

async function consultar_datos(req, res){
    try {
        const usuarios = await controlador.consultar_datos();
        respuestas.success(req, res, usuarios, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
};

async function consultar_un_dato (req, res){
    try {
        const usuarios = await controlador.consultar_un_dato(req.params.id);
        respuestas.success(req, res, usuarios, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    } 
};

async function agregar (req, res){
    try {
        const usuarios = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'usuario guardado con exito';
        }else{
            mensaje = 'usuario actualizado correctamente';
        }
        respuestas.success(req, res, mensaje, 201);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    } 
};

async function eliminar (req, res){
    try {
        const usuarios = await controlador.eliminar(req.body);
        respuestas.success(req, res, 'usuario eliminado correctamente', 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    } 
};


module.exports = router;