import React  from 'react'
import { CenterView, TextPrimary, TextSecondary,
     SubmitButton, ButtonText } from '../utils/styles'
import { View} from 'react-native'
import { colorPrimary, icons, colorAccent } from '../utils/colors'
import { CommonActions } from '@react-navigation/native'
import { ADD_CARD_STACK } from '../utils/constants'


function DeckDetails (props) {
    
    const { deck } = props.route.params
    return (
        <CenterView>
            <TextPrimary>{deck.title}</TextPrimary>
            <TextSecondary fontSize={`${30}px`} >{`${deck.questions.length} Cards`}</TextSecondary>
            <View style={{height: 150}}/>
            <View style={{alignSelf: 'center'}}>
                <SubmitButton
                buttonColor={"transparent"}
                onPress={() => props.navigation.dispatch(
                    CommonActions.navigate({
                      name: ADD_CARD_STACK,
                      params: {
                        title: deck.title,
                      },
                    })
                )}>
                    <ButtonText color={"#000"}>Add Card</ButtonText>
                </SubmitButton>
                <View style={{height: 20}}/>
                <SubmitButton
                buttonColor={colorAccent}
                >
                    <ButtonText >Start Quizz</ButtonText>
                </SubmitButton>
            </View>
        </CenterView>
    )
    
}

export default DeckDetails

export function DeckDetailsNavigationOptions({ route }) { //we haveaccess to the route props. we can get any parameter we want like ids from this props

    const { deck } = route.params

    return{
        //Styling the header for this Component
        headerTintColor: icons,
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        //End Etyling header for this Component
        title: deck.title, 
    }
}