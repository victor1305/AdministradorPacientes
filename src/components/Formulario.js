import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {

    // Crear state de citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:  ''
    })

    // State para errores

    const [ error, actualizarError ] = useState(false)

    // Función que se ejecuta cuando el user escribe en el input

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores

    const { mascota, propietario, fecha, hora, sintomas } = cita

    // Cuando el usuario presiona agregar cita

    const submitCita = e => {
        e.preventDefault()

        // Validar trim() quita los espacios en blanco por delante y por detrás

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ) {
            
            actualizarError(true)
            return
        }

        // Eliminar el mensaje de error

        actualizarError(false)

        // Asigno un ID

        cita.id  = uuidv4()
        
        // Crear la cita

        crearCita(cita)

        // Reiniciar el form

        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas:  ''
        })

    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error && <p className = 'alerta-error'>Todos los campos son obligatorios</p>}

            <form
                onSubmit = {submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type = "text"
                    name = "mascota"
                    className = "u-full-width"
                    placeholder = "Nombre Mascota"
                    onChange = {actualizarState}
                    value = {mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type = "text"
                    name = "propietario"
                    className = "u-full-width"
                    placeholder = "Nombre dueño de la Mascota"
                    onChange = {actualizarState}
                    value = {propietario}
                />
                <label>Fecha</label>
                <input
                    type = "date"
                    name = "fecha"
                    className = "u-full-width"
                    onChange = {actualizarState}
                    value = {fecha}
                />
                <label>Hora</label>
                <input
                    type = "time"
                    name = "hora"
                    className = "u-full-width"
                    onChange = {actualizarState}
                    value = {hora}
                />
                <label>Síntomas</label>
                <textarea
                    name = "sintomas"
                    className = "u-full-width"
                    onChange = {actualizarState}
                    value = {sintomas}
                    ></textarea>

                <button
                type = "submit"
                className = "u-full-width button-primary">
                    Agregar cita
                </button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;