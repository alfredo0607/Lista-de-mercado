import React, { Fragment } from "react";
import { revisarPresupuesto } from "../Helpers";

export default function ControlPresupuesto({ presupuesto, restante }) {
  return (
    <Fragment>
      <div>Presupuesto : ${presupuesto}</div>

      <div className={revisarPresupuesto(presupuesto, restante)}>
        Presupuesto : ${restante}
      </div>
    </Fragment>
  );
}
