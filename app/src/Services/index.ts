
import Usuario from './Usuario';
import Roles_permisos from './Roles_permisos';
import Condominio from './Condominio';
const Pages = {
    ...Usuario.Pages,
    ...Roles_permisos.Pages,
    ...Condominio.Pages,

}

const Reducers = {
    ...Usuario.Reducers,
    ...Roles_permisos.Reducers,
    ...Condominio.Reducers,
}

export default {
    Pages,
    Reducers
}