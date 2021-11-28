import { SPageListProps } from 'servisofts-component'
import Services from '../Services';
import Home from './Home';
import Carga from './Carga';
import Test from './Test';
const Pages: SPageListProps = {
    "/": Home,
    "carga": Carga,
    "test":Test,
    ...Services.Pages,
}

export default Pages;