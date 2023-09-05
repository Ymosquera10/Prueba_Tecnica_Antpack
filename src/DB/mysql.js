const mysql = require('mysql');
const config = require('../config');
const bcrypt = require('bcrypt');

// Configuración de la conexión a la base de datos
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,

}
let conexión;

function conmysql(){
  conexión = mysql.createConnection(dbconfig);

  conexión.connect((error) => {
    if(error){
      console.log(['db error'], error);
      setTimeout(conmysql, 200);
    }else{
      console.log('DB Conectada!!!')
    }
  });

  conexión.on('error', error => {
     console.log(['db error'], error);
     if(error.code === 'PROTOCOL_CONNECTION_LOST'){
          conmysql();
     }else{
      throw error;
     }
  })
}
conmysql();

//Hacer consultas a la bases de datos en las tablas.
function consultar_datos(usuarios){
  return new Promise( (resolve, reject) => {
    conexión.query(`SELECT * FROM usuarios ${usuarios}`, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });
}
//Hacer consultas a la bases de datos mediante el numero de id.
function consultar_un_dato(usuarios, id){
  return new Promise( (resolve, reject) => {
    conexión.query(`SELECT * FROM usuarios ${usuarios} WHERE id=${id}`, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });
}
//Crear un usuario
async function agregar(usuarios, data) {
  // Verificar si se proporcionó una contraseña
  if (data && data.id == 0 && data.contraseña) {
    // Encriptar la contraseña antes de guardarla
    const hashedcontraseña = await bcrypt.hash(data.contraseña, 10);

    // Reemplazar la contraseña original con la encriptada
    data.contraseña = hashedcontraseña;

    return insertar(usuarios, data);
  } else {
    return actualizar(usuarios, data);
  }
}
function insertar(usuarios, data) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${usuarios} SET ?`; // Usamos ? como marcador de posición
    conexión.query(sql, data, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}
//Actualizar un usuario.
function actualizar(usuarios, data) {
  return new Promise((resolve, reject) => {
    // Verificamos si la contraseña está presente en los datos
    if (data.contraseña) {
      // Encriptamos la contraseña antes de almacenarla en la base de datos
      bcrypt.hash(data.contraseña, 10, (error, hashedcontraseña) => {
        if (error) return reject(error);

        // Actualizamos los datos con la contraseña encriptada
        data.contraseña = hashedcontraseña;

        // Construimos la consulta SQL
        const sql = `UPDATE ${usuarios} SET ? WHERE id = ?`;

        // Ejecutamos la consulta SQL
        conexión.query(sql, [data, data.id], (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
      });
    } else {
      // Si la contraseña no está presente, simplemente actualizamos los datos
      const sql = `UPDATE ${usuarios} SET ? WHERE id = ?`;

      conexión.query(sql, [data, data.id], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    }
  });
}
//Eliminar un usuario mediante id.
function eliminar(usuarios, data){
  return new Promise( (resolve, reject) => {
    conexión.query(`DELETE FROM usuarios ${usuarios} WHERE id = ?`, data.id, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });

}
//Colsultar las publicaciones
function consultar_datos_publicaciones(condiciones) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM publicaciones INNER JOIN usuarios ON publicaciones.id_usuarios = usuarios.id`;
    conexión.query(sql, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}


//Hacer consultas a la bases de datos mediante el numero de id.
function consultar_un_dato_publicaciones(publicaciones, id){
  return new Promise( (resolve, reject) => {
    conexión.query(`SELECT * FROM publicaciones ${publicaciones} WHERE id=${id}`, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });
}

//Crear un usuario
function agregar_una_publicacion(publicaciones, data){
  if(data && data.id == 0){
    return insertar_una_publicacion(publicaciones, data);
  }else{
    return actualizar_una_publicacion(publicaciones, data);
  }
}
function insertar_una_publicacion(publicaciones, data) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${publicaciones} SET ?`; // Usamos ? como marcador de posición
    conexión.query(sql, data, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}
//Actualizar un usuario.
function actualizar_una_publicacion(publicaciones, data) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${publicaciones} SET ? WHERE id = ?`; // Usamos ? como marcadores de posición
    conexión.query(sql, [data, data.id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}
//Eliminar una publicación mediante id.
function eliminar_una_publicacion(publicaciones, data){
  return new Promise( (resolve, reject) => {
    conexión.query(`DELETE FROM publicaciones ${publicaciones} WHERE id = ?`, data.id, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });

}

//Hacer consultas a la bases de datos en las tablas.
function consultar_todas_las_empresa(empresas){
  return new Promise( (resolve, reject) => {
    conexión.query(`SELECT * FROM empresas ${empresas}`, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });
}
//Hacer consultas a la bases de datos mediante el numero de id.
function consultar_una_empresa(empresas, id){
  return new Promise( (resolve, reject) => {
    conexión.query(`SELECT * FROM empresas ${empresas} WHERE id=${id}`, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });
}
//Agregar una empresa
function agregar_una_empresa(empresas, data){
  if(data && data.id == 0){
    return insertar_una_empresa(empresas, data);
  }else{
    return actualizar_una_empresa(empresas, data);
  }
}
function insertar_una_empresa(empresas, data) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${empresas} SET ?`; // Usamos ? como marcador de posición
    conexión.query(sql, data, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}
//Actualizar una empresa
function actualizar_una_empresa(empresas, data) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${empresas} SET ? WHERE id = ?`; // Usamos ? como marcadores de posición
    conexión.query(sql, [data, data.id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}
//Eliminar una empresa mediante id.
function eliminar_una_empresa(empresas, data){
  return new Promise( (resolve, reject) => {
    conexión.query(`DELETE FROM empresas ${empresas} WHERE id = ?`, data.id, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    })
  });

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