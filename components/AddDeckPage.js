import React, { useState, useEffect, useContext } from 'react'
import { View, ToastAndroid, Platform } from 'react-native'
import { CenterView, TextPrimary, InputBoxCover, 
    StyledTextInput, SubmitButton, ButtonText } from '../utils/styles'
import Context from '../storage/DecksContext'
import { colorAccent } from '../utils/colors'
import { HOME_STACK, DECK_DETAILS_STACK } from '../utils/constants'
import { CommonActions } from '@react-navigation/native'


function AddDeckPage(props) {

    const { handleAddnewDeck } = useContext(Context)
    const [value, onChangeText] = useState('');

    const handleSubmit = async () => {

        if(value){
            await handleAddnewDeck(value)
            //routes the user to the Individual Deck view for the new deck.
            //More efficient way of coding this https://stackoverflow.com/questions/61170112/how-to-use-navigation-navigate-from-a-component-outside-the-stack-navigation
            Platform.OS == 'android' && (ToastAndroid.showWithGravityAndOffset(
                'Deck Successfully created',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
              ))
            props.navigation.dispatch({
                ...CommonActions.goBack(),
                source: HOME_STACK
            })
            props.navigation.dispatch({ 
                ...CommonActions.navigate({
                    name: DECK_DETAILS_STACK,
                    params: {
                        title: value,
                    },
                })
            })
            //End routing
        }

    }

    return (
        <CenterView>
            <TextPrimary>What is the title of your new deck?</TextPrimary>
            <InputBoxCover>
                <StyledTextInput
                placeholder="Deck Title"
                onChangeText={text => onChangeText(text)}
                value={value}
                />
            </InputBoxCover>
            <View style={{alignSelf: 'center'}}>
                <SubmitButton
                buttonColor={colorAccent}
                onPress={() => value !== '' && handleSubmit()}>
                    <ButtonText>Submit</ButtonText>
                </SubmitButton>
            </View>
        </CenterView>
    )
}

export default AddDeckPage