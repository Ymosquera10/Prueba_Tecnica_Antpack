const db = require('../../DB/mysql');

const usuarios = 'usuarios';
const publicaciones = 'publicaciones';
const empresas = 'empresas';

function consultar_datos () {
    return db.consultar_datos(usuarios);
}
function consultar_un_dato (id) {
    return db.consultar_un_dato(usuarios, id);
}

function agregar(body) {
    return db.agregar(usuarios, body);
}

function eliminar(body) {
    return db.eliminar(usuarios, body);
}

function consultar_datos_publicaciones () {
    return db.consultar_datos_publicaciones(publicaciones);
}

function consultar_un_dato_publicaciones (id) {
    return db.consultar_un_dato_publicaciones(publicaciones,id);
}

function agregar_una_publicacion (body) {
    return db.agregar_una_publicacion(publicaciones, body);
}

function eliminar_una_publicacion(body) {
    return db.eliminar_una_publicacion(publicaciones, body);
}

function consultar_todas_las_empresa () {
    return db.consultar_todas_las_empresa(empresas);
}

function consultar_una_empresa (id) {
    return db.consultar_una_empresa(empresas, id);
}

function agregar_una_empresa (body) {
    return db.agregar_una_empresa(empresas, body);
}

function eliminar_una_empresa(body) {
    return db.eliminar_una_empresa(empresas, body);
}

module.exports = {
    consultar_datos,
    consultar_un_dato,
    agregar,
    eliminar,
    consultar_datos_publicaciones,
    consultar_un_dato_publicaciones,
    agregar_una_publicacion,
    eliminar_una_publicacion,
    consultar_todas_las_empresa,
    consultar_una_empresa,
    agregar_una_empresa,
    eliminar_una_empresa,
}