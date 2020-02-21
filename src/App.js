import React from 'react';
import Routes from './routes';
import { SnackbarProvider } from 'notistack';

import './App.css';

export default () => 
<SnackbarProvider 
    maxSnack={2} 
    autoHideDuration={1300} 
    dense={false}
    preventDuplicate={true}
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
>
    <Routes />
</SnackbarProvider>

