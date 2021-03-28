import React, {Component} from 'react'
import {connect} from 'react-redux'

import {auth} from "../../store/actions/auth";
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

import styles from './Auth.module.css'

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errMessage: 'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            },
        },
    }

    loginHandler =  () => {
        this.props.auth (
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler =  () => {
        this.props.auth (
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateControl (value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = this.validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid
        }

        return isValid
    } 

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value)

        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, 
            isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errMessage={control.errMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={styles.Auth}>
                <div>
                    <h1>Authentication</h1>

                    <form onSubmit={this.submitHandler} className={styles.AuthForm}>
                        
                        {this.renderInputs()}

                        <Button 
                            type="primary" 
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Login
                        </Button>

                        <Button 
                            type="success" 
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        auth: (email, password, isLogin) => {
            dispatch(auth(email, password, isLogin))
        }
    }
} 

export default connect(null, mapDispatchToProps) (Auth)