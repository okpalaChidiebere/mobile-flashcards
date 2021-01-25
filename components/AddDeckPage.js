import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { CenterView, TextPrimary, InputBoxCover, 
    StyledTextInput, SubmitButton, ButtonText } from '../utils/styles'


function AddDeckPage({ handleAddnewDeck }) {

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