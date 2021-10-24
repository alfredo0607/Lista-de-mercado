import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Button = styled.button`
  background-color: rgb(248, 11, 130);
  width: 100%;
  color: white;
`;

const Label = styled.label`
  color: black;
  width: 100%;
`;

export default function Productos({ setgasto, setcreargasto }) {
  const [producto, setproducto] = useState({
    produt: "",
    cantidad: "",
  });
  const [error, seterror] = useState(false);
  const { produt, cantidad } = producto;
  const [precio, setprecio] = useState(0);

  const AgregarProductos = (e) => {
    setproducto({
      ...producto,
      produt: e.target.value,
    });
  };

  const Agregar = (e) => {
    setproducto({
      ...producto,
      cantidad: parseInt(e.target.value, 10),
    });
  };

  console.log(cantidad);
  const AgregarPrecio = (e) => {
    setprecio(parseInt(e.target.value, 10));
  };

  const EnviarProducto = (e) => {
    e.preventDefault();

    if (produt.trim() === "" || cantidad < 1 || isNaN(cantidad)) {
      seterror(true);
      return;
    }

    seterror(false);

    const GastoProducto = {
      produt,
      cantidad,
      precio,
      id: uuidv4(),
    };

    setgasto(GastoProducto);
    setcreargasto(true);

    setproducto({ produt: "", cantidad: "" });
    setprecio(0);
  };

  return (
    <Fragment>
      {error ? (
        <p className="alerta-error">Todos Los Campos No Estan Llenos</p>
      ) : null}

      <div>
        <form onSubmit={EnviarProducto}>
          <Label>Nombre de Producto :</Label>
          <input
            type="text"
            name="produt"
            className="u-full-width"
            placeholder="Producto"
            value={produt}
            onChange={AgregarProductos}
          />

          <Label>Cantidad :</Label>
          <input
            type="number"
            className="u-full-width"
            name="cantidad"
            placeholder="Cantidad"
            value={cantidad}
            onChange={Agregar}
          />

          <Label>Precio :</Label>
          <input
            type="number"
            className="u-full-width"
            placeholder="Precio"
            value={precio}
            onChange={AgregarPrecio}
          />
          <br />
          <Button type="submit">Agregar Producto</Button>
        </form>
      </div>
    </Fragment>
  );
}
