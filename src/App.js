import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Carta from "./componente/Carta";
import ControlPresupuesto from "./componente/ControlPresupuesto";
import Formulario from "./componente/Formulario";
import Productos from "./componente/Productos";

const Contnedor = styled.div`
  margin: 3 auto;
  padding: 3rem;
`;

const PrimerContnedor = styled.div`
  background: white;
  color: black;
  padding: 3rem;
`;

const SegundoContnedor = styled.div`
  background: white;
  color: black;
  padding: 3rem;
`;

const TercerContenedor = styled.div`
  background-color: white;
  border-radius: 2rem;
  background-color: rgb(248, 11, 130);
  border: blue;
`;

const Label = styled.label`
  float: left;
  margin: 0px 1px;
  padding: 1rem;
  padding-left: 13%;
  text-align: justify;
  color: white;
`;

export default function App() {
  const [usuarios, setusuarios] = useState([]);
  const [datos, setdatos] = useState(true);
  const [presupuesto, setpresupuesto] = useState(0);
  const [restante, setrestante] = useState(0);
  const [productos, setproductos] = useState([]);
  const [gasto, setgasto] = useState({});
  const [creargasto, setcreargasto] = useState(false);
  const [regresar, setregresar] = useState(false);
  const [eliminado, seteliminado] = useState({});
  const [ok, setok] = useState([]);

  const crearUsuario = (usuario) => {
    setusuarios([...usuarios, usuario]);
  };

  const EliminarProducto = (id) => {
    const productoeliminar = productos.filter((producto) => producto.id === id);
    seteliminado(productoeliminar);
    setregresar(true);
    const NoEliminado = productos.filter((producto) => producto.id !== id);
    setproductos(NoEliminado);
  };

  useEffect(() => {
    if (creargasto) {
      setproductos([...productos, gasto]);

      const op = gasto.precio * gasto.cantidad;
      const resultado = restante - op;
      setrestante(resultado);

      setcreargasto(false);
    }
  }, [creargasto, eliminado, gasto, productos, regresar, restante]);

  useEffect(() => {
    if (regresar) {
      setok([...ok, eliminado]);
      eliminado.map((s) => setrestante(restante + s.precio * s.cantidad));
    }
    setregresar(false);
  }, [eliminado, eliminado.precio, ok, regresar, restante]);

  return (
    <Fragment>
      <h1>Administrador De Listas Para El Mercado</h1>
      {usuarios.map((usuario) => (
        <TercerContenedor className="container">
          <div className="row">
            <Label>Nombre : {usuario.nombre}</Label>
            <Label>Fecha : {usuario.fecha}</Label>
            <Label>
              <ControlPresupuesto
                presupuesto={presupuesto}
                restante={restante}
              />
            </Label>
          </div>
        </TercerContenedor>
      ))}

      <Contnedor className="container">
        <div className="row">
          {datos ? (
            <PrimerContnedor>
              <Formulario
                crearUsuario={crearUsuario}
                setdatos={setdatos}
                setpresupuesto={setpresupuesto}
                setrestante={setrestante}
              />
            </PrimerContnedor>
          ) : (
            <SegundoContnedor className="one-half column">
              <Productos setgasto={setgasto} setcreargasto={setcreargasto} />
            </SegundoContnedor>
          )}
          <div className="one-half column">
            {productos.map((producto) => (
              <Carta
                producto={producto}
                key={producto.id}
                EliminarProducto={EliminarProducto}
                setregresar={setregresar}
              />
            ))}
          </div>
        </div>
      </Contnedor>
    </Fragment>
  );
}
