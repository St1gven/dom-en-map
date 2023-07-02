import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from "./Map";
import {StyledEngineProvider} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('map') as HTMLElement
);


root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Map/>
        </StyledEngineProvider>
    </React.StrictMode>
);