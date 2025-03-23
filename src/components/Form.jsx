import React from 'react';
import { Formulario } from './Formulario';
import { ListaContactos } from './ListaContactos';

export const Form = () => {
    return (
        <div className="container py-5">
            <h2 className="fw-bold">Lista de contactos</h2>
            <Formulario />

            <ListaContactos />
        </div>
    );
};
