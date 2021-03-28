import React from 'react'
import styles from './AnswersItem.module.css'

const AnswersItem = props => {

    const classes = [styles.AnswersItem]

    if (props.answerCorrectness) {
        classes.push(styles[props.answerCorrectness])
    }

    return (
        <li 
            className={classes.join(' ')}
            onClick={ () => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnswersItem