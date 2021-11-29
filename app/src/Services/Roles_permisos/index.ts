import { SPageListProps } from 'servisofts-component'

const ServiceName = "roles_permisos";

import usuarioPage from './Components/usuarioPage';
const Pages: SPageListProps = {
    ...usuarioPage.Pages
}

const Reducers = {
    ...usuarioPage.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers,
};