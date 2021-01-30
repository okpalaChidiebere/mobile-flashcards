import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colorPrimary, icons } from '../utils/colors'
import QuizzItem from './QuizzItem'
import { CenterView, TextPrimary, TextSecondary,
    SubmitButton, ButtonText } from '../utils/styles'
import { colorAccent } from '../utils/colors'
import  { clearLocalNotification, setLocalNotification } from '../utils/notifications'


function QuizzPage(props) {

    const { questions } = props.route.params
    const [ score , setScore ] = useState(0)
    const [ currQuestion , setCurrQuestion ] = useState(0)

    const nextQuestion = (optionChosen) => {
        setCurrQuestion(currQuestion + 1 )
        if(optionChosen == "Correct"){
            setScore(score + 1)
        }

        if(questions.length !== currQuestion ){
            setUpNotification() //We set up a new one for tomorrow
        }
    }

    const setUpNotification = async () => {
        await clearLocalNotification() //we clear the local Notification
        setLocalNotification()
    }

    const resetQuizz = () => {
        setCurrQuestion(0)
        setScore(0)
    }

    return(
        <View style={styles.container}>
            { questions.length !== currQuestion 
            ? (<QuizzItem 
                question={questions[currQuestion].question} 
                answer={questions[currQuestion].answer} 
                totalKeys={questions.length} 
                currentKey={(currQuestion + 1)}
                handleNextQuestion={nextQuestion}/>)
            : (<CenterView style={{margin: 20}}>
                    <TextPrimary>{'Correct Answers Count'}</TextPrimary>
                    <TextSecondary fontSize={`${40}px`} color="#008000">{score}</TextSecondary>
                    <View style={{alignSelf: 'center'}}>
                        <SubmitButton
                        buttonColor={colorAccent}
                        onPress={() => resetQuizz()}
                        >
                            <ButtonText >Restart Quizz</ButtonText>
                        </SubmitButton>
                    </View>
                </CenterView>)
            }
        </View>
    )
}

export default QuizzPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});

export function QuizzPageNavigationOptions({ route }) { //we haveaccess to the route props. we can get any parameter we want like ids from this props

    return{
        //Styling the header for this Component
        headerTintColor: icons,
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        //End Etyling header for this Component
        title: "Quizz", 
    }
}