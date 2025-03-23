import React, { useState, useEffect } from 'react';
import db from '../firebase/firebaseConfig';
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

export const ListaContactos = () => {
    const [contactos, setContactos] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [contactoActual, setContactoActual] = useState({
        id: '',
        nombre: '',
        correo: '',
    });

    useEffect(() => {
        const obtenerContactos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'usuarios'));
                const docs = [];
                querySnapshot.forEach(docSnap => {
                    docs.push({ id: docSnap.id, ...docSnap.data() });
                });
                setContactos(docs);
            } catch (error) {
                console.error('Error al obtener contactos:', error);
            }
        };

        obtenerContactos();
    }, []);

    const handleEditar = contacto => {
        setModoEdicion(true);
        setContactoActual(contacto);
    };

    const handleEliminar = async id => {
        if (!confirm('¿Estás seguro de eliminar este contacto?')) return;

        try {
            await deleteDoc(doc(db, 'usuarios', id));
            const contactosActualizados = contactos.filter(
                contacto => contacto.id !== id
            );
            setContactos(contactosActualizados);
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
        }
    };

    const handleSubmitEdicion = async e => {
        e.preventDefault();
        try {
            const contactoRef = doc(db, 'usuarios', contactoActual.id);
            await updateDoc(contactoRef, {
                nombre: contactoActual.nombre,
                correo: contactoActual.correo,
            });

            const contactosActualizados = contactos.map(contacto =>
                contacto.id === contactoActual.id ? contactoActual : contacto
            );
            setContactos(contactosActualizados);

            setModoEdicion(false);
            setContactoActual({ id: '', nombre: '', correo: '' });
        } catch (error) {
            console.error('Error al actualizar contacto:', error);
        }
    };

    return (
        <div className="container py-5">
            <h2>Lista de contactos</h2>

            <ul className="list-group">
                {contactos.length > 0 ? (
                    contactos.map(contacto => (
                        <li
                            key={contacto.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                {contacto.nombre} - {contacto.correo}
                            </span>
                            <div>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditar(contacto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminar(contacto.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No hay contactos.</li>
                )}
            </ul>

            {modoEdicion && (
                <>
                    <h3 className="mt-4">Editar contacto</h3>
                    <form onSubmit={handleSubmitEdicion}>
                        <input
                            className="form-control"
                            type="text"
                            value={contactoActual.nombre}
                            onChange={e =>
                                setContactoActual({
                                    ...contactoActual,
                                    nombre: e.target.value,
                                })
                            }
                            placeholder="Nombre"
                        />
                        <input
                            className="form-control mt-2"
                            type="email"
                            value={contactoActual.correo}
                            onChange={e =>
                                setContactoActual({
                                    ...contactoActual,
                                    correo: e.target.value,
                                })
                            }
                            placeholder="Correo"
                        />
                        <button className="btn btn-success mt-2" type="submit">
                            Guardar cambios
                        </button>
                        <button
                            className="btn btn-secondary mt-2 ms-2"
                            onClick={() => {
                                setModoEdicion(false);
                                setContactoActual({
                                    id: '',
                                    nombre: '',
                                    correo: '',
                                });
                            }}
                            type="button"
                        >
                            Cancelar
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};
