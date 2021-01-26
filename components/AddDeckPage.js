import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { CenterView, TextPrimary, InputBoxCover, 
    StyledTextInput, SubmitButton, ButtonText } from '../utils/styles'
import Context from '../storage/DecksContext'



function AddDeckPage(props) {

    const { handleAddnewDeck } = useContext(Context)
    const [value, onChangeText] = useState('');

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
                onPress={() => handleAddnewDeck(value)}>
                    <ButtonText>Submit</ButtonText>
                </SubmitButton>
            </View>
        </CenterView>
    )
}

export default AddDeckPage