import { SPageListProps } from 'servisofts-component'

const ServiceName = "condominio";

import sucursal from './Components/condominio';
import vivienda from './Components/vivienda';
import habitante from './Components/habitante';
import expensa from './Components/expensa';
import pago_expensa from './Components/pago_expensa';
import administrador from './Components/administrador';
const Pages: SPageListProps = {
    ...sucursal.Pages,
    ...vivienda.Pages,
    ...habitante.Pages,
    ...expensa.Pages,
    ...pago_expensa.Pages,
    ...administrador.Pages
}

const Reducers = {
    ...sucursal.Reducers,
    ...vivienda.Reducers,
    ...habitante.Reducers,
    ...expensa.Reducers,
    ...pago_expensa.Reducers,
    ...administrador.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers,
};