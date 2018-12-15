import { createContext } from 'react';
import Banana from 'banana-i18n';

const BananaContext = createContext( new Banana() );

export default BananaContext;
