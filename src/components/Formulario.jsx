import React, { useState } from 'react';
import db from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if (!nombre || !correo) {
            alert('Por favor, completa ambos campos');
            return;
        }

        try {
            await addDoc(collection(db, 'usuarios'), {
                nombre,
                correo,
            });
            console.log('Contacto agregado con éxito');
        } catch (error) {
            console.error('Error al agregar contacto:', error);
        }

        // Limpiar inputs
        setNombre('');
        setCorreo('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="form-control"
                type="text"
                name="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre"
            />
            <input
                className="form-control mt-2"
                type="email"
                name="correo"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                placeholder="Correo"
            />

            <button className="btn btn-primary mt-2" type="submit">
                Agregar
            </button>
        </form>
    );
};
