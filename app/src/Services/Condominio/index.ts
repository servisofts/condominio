import { SPageListProps } from 'servisofts-component'

const ServiceName = "condominio";

import sucursal from './Components/condominio';
import vivienda from './Components/vivienda';
import habitante from './Components/habitante';
import expensa from './Components/expensa';
import pago_expensa from './Components/pago_expensa';
const Pages: SPageListProps = {
    ...sucursal.Pages,
    ...vivienda.Pages,
    ...habitante.Pages,
    ...expensa.Pages,
    ...pago_expensa.Pages
}

const Reducers = {
    ...sucursal.Reducers,
    ...vivienda.Reducers,
    ...habitante.Reducers,
    ...expensa.Reducers,
    ...pago_expensa.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers,
};