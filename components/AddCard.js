import React, { useState, useContext }  from 'react'
import { View, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native'
import { colorPrimary, icons, colorAccent } from '../utils/colors'
import { InputBoxCover, StyledTextInput, SubmitButton, ButtonText } from '../utils/styles'
import Context from '../storage/DecksContext'
import { CommonActions } from '@react-navigation/native';


function AddCard (props) {

    const [ state, setState ] = useState({
        question: '',
        answer: ''
      })
    const { handleAddCardToADeck } = useContext(Context)

    const handleSubmit = () => {

        const { title } = props.route.params
        const { question, answer } = state

        handleAddCardToADeck(title, question, answer)
        props.navigation.dispatch(CommonActions.goBack())
        Platform.OS == 'android' && (ToastAndroid.showWithGravityAndOffset(
            'Card Successfully added',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          ))
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <InputBoxCover>
                <StyledTextInput
                placeholder="Question"
                onChangeText={question => setState({...state, question})}
                value={state.question}
                />
            </InputBoxCover>
            <InputBoxCover>
                <StyledTextInput
                placeholder="Answer"
                onChangeText={answer => setState({...state, answer})}
                value={state.answer}
                />
            </InputBoxCover>
            <View style={{alignSelf: 'center'}}>
                <SubmitButton
                buttonColor={colorAccent}
                onPress={() => state.question !== '' && state.answer !== null && handleSubmit() }
                >
                    <ButtonText >Submit</ButtonText>
                </SubmitButton>
            </View>
        </KeyboardAvoidingView>
    )
    
}

export default AddCard

export function AddCardNavigationOptions({ route }) { //we haveaccess to the route props. we can get any parameter we want like ids from this props

    return{
        //Styling the header for this Component
        headerTintColor: icons,
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        //End Etyling header for this Component
        title: "Add Card", 
    }
}