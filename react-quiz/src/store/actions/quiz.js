import axios from '../../axios/axios-quiz'
import {
        FETCH_QUIZES_START,
        FETCH_QUIZES_SUCCESS,
        FETCH_QUIZES_ERROR,
        FETCH_QUIZ_SUCCESS,
        QUIZ_SET_STATE,
        FINISH_QUIZ,
        QUIZ_NEXT_QUESTION,
        QUIZ_RETRY,
    } from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const response = await axios.get('/quizes.json')

            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}` 
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch (e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizSetState(results, answerCorrectness) {
    return {
        type: QUIZ_SET_STATE,
        results,
        answerCorrectness,
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}

export function quizNextQuestion(activeQuestionNumber) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestionNumber,
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerCorrectness) {
            const key = Object.keys(state.answerCorrectness)[0]
            if (state.answerCorrectness[key] === 'success') {
                return 
            }
        }

        console.log("Answer id: ", answerId)

        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (question.rightAnswerId === answerId) {
            
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState(results, {[answerId]: 'success'}))
            
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState(results, {[answerId]: 'error'}))
        }
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion === state.quiz.length - 1
}   

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error,
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY,
    }
}