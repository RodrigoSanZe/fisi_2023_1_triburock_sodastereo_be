import { pool } from "../../db.js";

export const postAsignarEspecialidadesFavoritas = async (req, res) => { 
    const usuarioID = req.params.idUsuario;
    const 
    { 
        idespecialidad, 
    } = req.body;

    try {
        const query = `CALL AsignarEspecialidadesFavoritas(${usuarioID}, ${idespecialidad});`;

        const result = await pool.query(query);
        const citaID = result[0][0]['ID de la Cita'];

        console.log(‘Favorito registrado exitosamente.’);
    } catch (error) {
        console.error('Error al registrar favorito:’, error);
        res.status(500).json({ error: 'Error al registrar favorito’ });
    }
}

export const getConsultarFavoritos = async (req, res) => { 
    const { idUsuario }= req.params;
    try {
        const result = await pool.query(
          'CALL ObtenerFavoritos(?);’, [idUsuario]
        );
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
}
