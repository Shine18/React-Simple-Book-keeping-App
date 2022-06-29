import React from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header'
import Records from "./components/Records"

function App() {
    return (
        <>
            <Header />
            <Records />

            <ToastContainer />
        </>
    )
}

export default App