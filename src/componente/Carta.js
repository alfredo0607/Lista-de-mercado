import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  background: white;
  border-radius: 2rem;
  text-align: center;
  padding: 1rem;
`;

const Label = styled.label`
  color: black;
  padding: 2px;
`;

const Buton = styled.button`
  background: blue;
  color: white;
`;

export default function Carta({ producto, EliminarProducto }) {
  const { produt, cantidad, precio } = producto;
  return (
    <Contenedor>
      <Label>Producto : {produt}</Label>
      <Label>Cantidad :{cantidad}</Label>
      <Label>Precio : {precio}</Label>
      <Buton onClick={(() => EliminarProducto(producto.id))}>
        Eliminar &times;
      </Buton>
    </Contenedor>
  );
}
