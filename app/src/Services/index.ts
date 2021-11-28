
import Usuario from './Usuario';
import Kolping from './Kolping';
import Roles_permisos from './Roles_permisos';
const Pages = {
    ...Usuario.Pages,
    ...Kolping.Pages,
    ...Roles_permisos.Pages,

}

const Reducers = {
    ...Usuario.Reducers,
    ...Kolping.Reducers,
    ...Roles_permisos.Reducers,
}

export default {
    Pages,
    Reducers
}