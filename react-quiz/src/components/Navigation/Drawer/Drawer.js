import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import styles from './Drawer.module.css'

import Backdrop from '../../UI/Backdrop/Backdrop'


class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks (links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={styles.active}
                        onClick={this.clickHandler}
                    >
                         {link.label}
                    </NavLink> 
                </li>
            )
        })
    }

    render() {
        const cls = [styles.Drawer]

        if (!this.props.isOpen) {
            cls.push(styles.close)
        }

        const links = [
            {to: '/', label: 'List', exact: true},
        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create quiz', exact: true})
            links.push({to: '/logout', label: 'Logout', exact: true})
        } else {
            links.push({to: '/auth', label: 'Auth', exact: true})
        }
    
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </React.Fragment>
        )
    }
}

export default Drawer