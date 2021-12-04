//  COMPONENT CONFIG
const component = "usuario"; // COMPONENT NAME 
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";
import RecuperarPass from "./Pages/RecuperarPass";
import TipoUsuario from "./Pages/TipoUsuario";
import Login from "./Pages/Login";

export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: Lista,
        [component + "/registro"]: Registro,
        [component + "/recuperarContrasena"]: RecuperarPass,
        "login":Login
    }
}