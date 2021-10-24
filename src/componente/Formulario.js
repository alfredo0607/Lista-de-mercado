import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Label = styled.label`
  color: black;
  width: 100%;
`;

const Button = styled.button`
  background-color: rgb(248, 11, 130);
  width: 100%;
  color: white;
`;

export default function Formulario({
  crearUsuario,
  setdatos,
  setpresupuesto,
  setrestante,
}) {
  const [usuario, setusuario] = useState({
    nombre: "",
    fecha: "",
  });

  const [cantidad, setcantidad] = useState(0);
  const [error, seterror] = useState(false);
  const { nombre, fecha } = usuario;

  const AgregarDatos = (e) => {
    setusuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const AgregarPresupuesto = (e) => {
    setcantidad(parseInt(e.target.value, 10));
  };

  const EnviarDatos = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      fecha.trim() === "" ||
      cantidad < 1 ||
      isNaN(cantidad)
    ) {
      seterror(true);
      return;
    }

    seterror(false);

    usuario.id = uuidv4();

    crearUsuario(usuario);
    setpresupuesto(cantidad);
    setrestante(cantidad);
    setdatos(false);

    setusuario({
      nombre: "",
      fecha: "",
    });
  };
  return (
    <Fragment>
      <div>
        {error ? (
          <p className="alerta-error">No todo los campos estan llenos</p>
        ) : null}
        <form onSubmit={EnviarDatos}>
          <Label>Nombre :</Label>
          <input
            type="text"
            name="nombre"
            className="u-full-width"
            placeholder="Nombre"
            value={nombre}
            onChange={AgregarDatos}
          />

          <Label>Fecha :</Label>
          <input
            type="date"
            name="fecha"
            className="u-full-width"
            placeholder="Fecha"
            value={fecha}
            onChange={AgregarDatos}
          />

          <Label>Presupuesto :</Label>
          <input
            type="number"
            name="presupuesto"
            className="u-full-width"
            placeholder="Presupuesto"
            onChange={AgregarPresupuesto}
          />
          <br />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </Fragment>
  );
}
