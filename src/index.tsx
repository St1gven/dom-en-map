import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Map from "./Map";
import {StyledEngineProvider} from "@mui/material";
import FirstLevel from "./first_level/FirstLevel";


const mapDiv = document.getElementById('map') as HTMLElement
if (mapDiv) {
    const root = ReactDOM.createRoot(mapDiv);

    root.render(
        <React.StrictMode>
            <StyledEngineProvider injectFirst>
                <Map/>
            </StyledEngineProvider>
        </React.StrictMode>
    );
} else {
    const yesno = document.getElementById('yesno') as HTMLElement
    if (yesno) {
        const root = ReactDOM.createRoot(yesno);
        root.render(<React.StrictMode>
            <FirstLevel/>
        </React.StrictMode>)
    }
}
