import React from 'react'
import {NavLink} from 'react-router-dom'

export const About = () => {
    return (
        <div className="card">
            <div className="card-header">
            Featured
            </div>
            <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <NavLink exact to="/" className="btn btn-primary">Main</NavLink>
            </div>
        </div>
    )
}