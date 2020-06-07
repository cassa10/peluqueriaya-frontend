export const crearServicio = (_id, _nombre, _precio) => {
    const servicio = {
        id: _id,
        nombre: _nombre,
        precio: _precio,
    };
    return (servicio);
}
