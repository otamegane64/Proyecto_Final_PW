const connection = require('../config/conecction');

function listarPeliculas(req,res)
{
    if(connection){
        let sql = 'select * from peliculas_Genero';
        connection.query(sql,(err,peliculas)=>{
            if(err){
                res.json(err);
            }else{
                res.json(peliculas);
            }
        })
    }
}
function obtenerUnaPelicula(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'select * from peliculas where id= ? '
        connection.query(sql,[id],(err,pelicula)=>{
            if(err){
                res.json(err);
            }else{
                let mensaje ="";
                if(pelicula === undefined || pelicula.length ===0)
                mensaje = "pelicula no encontrada"
                res.json({data: pelicula, mensaje:mensaje})
            }

        })
    }
}
function crearPelicula(req,res){
    if(connection){
        const pelicula = req.body;
        if(!pelicula.titulo){
            return res.status(400).send({error:true, mensaje:"El titulo de la pelicula es obligatorio!"})
        }
        if(!pelicula.director){
            return res.status(400).send({error:true, mensaje:"El nombre del director es obligatorio!"})
        }
        if(!pelicula.anio){
            return res.status(400).send({error:true, mensaje:"El año es obligatorio!"})
        }
        if(pelicula.anio && pelicula.anio.length !==4){
            return res.status(400).send({error:true, mensaje:"El año deben ser 4 digitos!"})
        }
        if(!pelicula.genero){
            return res.status(400).send({error:true, mensaje:"El genero es obligatorio!"})
        }
        let sql = 'insert into peliculas set ?';
        connection.query(sql,[pelicula],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                res.json({error:false, data: rows, mensaje:"Se agrego correctamente la pelicula"})
            }
        })
    }
}
function editarPelicula(req, res){
    if(connection){
        const { id } = req.params;
        const pelicula = req.body;
        let sql = 'update peliculas set ? where id = ?';
        connection.query(sql, [pelicula,id],(err,rows)=> {
            if(err){
                res.json(err);
            } else{
                let mensaje = "";
               if(rows.changedRows ===0)
                mensaje = "La información es la misma"
               else
                mensaje = "Pelicula modificada con exito"
                res.json({error:false,data: rows,mensaje:mensaje})
            }
        })
    }
}
function eliminarPelicula(req,res){
    if(connection){
        const {id} = req.params;
        let sql = 'delete from peliculas where id = ?';
        connection.query(sql,[id],(err,rows)=>{
            if(err){
                res.json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows ===0){
                    mensaje = "Pelicula no encontrada"
                }else{
                    mensaje = "Pelicula eliminado con exito"
                }
                res.json({error:false,data:rows,mensaje})
            }
        })
    }

}
module.exports ={
    listarPeliculas,
    obtenerUnaPelicula,
    crearPelicula,
    editarPelicula,
    eliminarPelicula
}