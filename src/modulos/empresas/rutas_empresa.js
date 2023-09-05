const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('../usuarios/controlador');


const router = express.Router();

router.get('/', consultar_todas_las_empresa);
router.get('/:id', consultar_una_empresa);
router.post('/', agregar_una_empresa);
router.put('/', eliminar_una_empresa);

async function consultar_todas_las_empresa(req, res){
   try {
       const empresas = await controlador.consultar_todas_las_empresa();
       respuestas.success(req, res, empresas, 200);
   } catch (error) {
       respuestas.error(req, res, error, 500);
   }
};

async function consultar_una_empresa (req, res){
   try {
       const empresas = await controlador.consultar_una_empresa(req.params.id);
       respuestas.success(req, res, empresas, 200);
   } catch (error) {
       respuestas.error(req, res, error, 500);
   } 
};

async function agregar_una_empresa (req, res){
   try {
       const empresas = await controlador.agregar_una_empresa(req.body);
       if(req.body.id == 0){
           mensaje = 'empresa agregada con exito';
       }else{
           mensaje = 'empresa actualizada con exito';
       }
       respuestas.success(req, res, mensaje, 201);
   } catch (error) {
       respuestas.error(req, res, error, 500);
   } 
};

async function eliminar_una_empresa (req, res){
   try {
       const empresas = await controlador.eliminar_una_empresa(req.body);
       respuestas.success(req, res, 'empresa eliminada correctamente', 200);
   } catch (error) {
       respuestas.error(req, res, error, 500);
   } 
};




module.exports = router;