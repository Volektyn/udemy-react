import React from 'react'
import {Link} from 'react-router-dom'

import Button from '../UI/Button/Button'

import styles from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        return props.results[key] === 'success' ? ++total : total
    }, 0) 

    return (
        <div className={styles.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
                        styles[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
            </ul>

            <p>Correct {successCount}/{props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Retry</Button>
                <Link to='/'>
                    <Button type="success">Go to test list</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz