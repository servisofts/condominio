//  COMPONENT CONFIG
const component = "vivienda"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";

import Select from "./Pages/Select";
import Card from "./Pages/Card";
//alvaro
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        //el component cuando paso un dato
        [component]: Lista,
        [component + "/registro"]: Registro,
        [component + "/lista"]: Lista,
        [component + "/card"]: Card,
        [component + "/select"]: Select,
    }
}