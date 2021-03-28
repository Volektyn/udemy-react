import React from 'react'
import styles from './ActiveQuiz.module.css'

import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
    return (
    <div className={styles.ActiveQuiz}>
        <p className={styles.Question}>
            <span>
                <strong>{props.answerNum}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.answerNum}/{props.quizLength}</small>
        </p>

        <AnswersList
            answerCorrectness={props.answerCorrectness}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)
}
export default ActiveQuiz

