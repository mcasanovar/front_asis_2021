import React, { FunctionComponent } from 'react'

type NotFoundProps = any

const NotFoundView: FunctionComponent<NotFoundProps> = ({}) => {
    return (
        <div className="container-notfound">
            <h1>No tiene permisos para visualizar esta sección</h1>
        </div>
    )
}

export default NotFoundView
