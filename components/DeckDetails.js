import React, { useContext }  from 'react'
import { CenterView, TextPrimary, TextSecondary,
     SubmitButton, ButtonText } from '../utils/styles'
import { View} from 'react-native'
import { colorPrimary, icons, colorAccent } from '../utils/colors'
import { CommonActions } from '@react-navigation/native'
import { ADD_CARD_STACK } from '../utils/constants'
import Context from '../storage/DecksContext'


function DeckDetails (props) {
    
    const { decks } = useContext(Context)
    const { title } = props.route.params
    return (
        <CenterView>
            <TextPrimary>{decks[title].title}</TextPrimary>
            <TextSecondary fontSize={`${30}px`} >{`${decks[title].questions.length} Cards`}</TextSecondary>
            <View style={{height: 150}}/>
            <View style={{alignSelf: 'center'}}>
                <SubmitButton
                buttonColor={"transparent"}
                onPress={() => props.navigation.dispatch(
                    CommonActions.navigate({
                      name: ADD_CARD_STACK,
                      params: {
                        title: decks[title].title,
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

    const { title } = route.params

    return{
        //Styling the header for this Component
        headerTintColor: icons,
        headerStyle: {
            backgroundColor: colorPrimary,
        },
        //End Etyling header for this Component
        title, 
    }
}