import { SPageListProps } from 'servisofts-component'

const ServiceName = "roles_permisos";

import rol from './Components/rol';
const Pages: SPageListProps = {
    ...rol.Pages
}

const Reducers = {
    ...rol.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers,
};