import { SPageListProps } from 'servisofts-component'
import Services from '../Services';
import Home from './Home';
import Carga from './Carga';
import usuarioPage from '../Services/Roles_permisos/Components/usuarioPage/Pages/Lista';
import Ajustes from './Ajustes';
const Pages: SPageListProps = {
    "/": usuarioPage,
    "carga": Carga,
    "home":Home,
    "ajustes":Ajustes,
    ...Services.Pages,
}

export default Pages;