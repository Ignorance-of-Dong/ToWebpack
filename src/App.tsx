import routerConfig from './router'
import * as React from 'react'
import RouterView from './router/routerView'
import './App.css'

function App(props: any) {
    return <>
        <RouterView routerList={routerConfig.config} />
        {/* 111 */}
    </>
}

export default App