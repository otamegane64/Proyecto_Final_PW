const connection = require('../config/conecction');

function listadoGeneros(req,res){
    if(connection){
    let sql = 'select * from generos';
    connection.query(sql,(err,generos)=>{
        if(err){
            res.json(err);
        }else{
            res.json(generos);
        }
    })
  }
}
function obtenerUnGenero(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'select * from generos where id= ? '
        connection.query(sql,[id],(err,genero)=>{
            if(err){
                res.json(err);
            }else{
                let mensaje ="";
                if(genero === undefined || genero.length ===0)
                mensaje = "Genero no encontrado"
                res.json({data: genero, mensaje:mensaje})
            }

        })
    }
}
function crearGenero(req,res){
    if(connection){
        const genero = req.body;
        if(!genero.genero){
            return res.status(400).send({error:true,mensaje:"El nombre del genero es obligatorio"})
        }
        let sql = 'insert into generos set ?';
        connection.query(sql,[genero],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                res.json({error:false, data: rows, mensaje:"Se agrego correctamente el genero"})
            }
        })
    }
}
function eliminarGenero(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'delete from generos where id = ?';
        connection.query(sql,[id],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows ===0){
                    mensaje = "Genero no encontrado"
                }else{
                    mensaje = "Genero eliminado con exito"
                }
                res.json({error:false,data:rows,mensaje})
            }
        })
    }

}
module.exports ={
    listadoGeneros,
    obtenerUnGenero,
    eliminarGenero,
    crearGenero
}