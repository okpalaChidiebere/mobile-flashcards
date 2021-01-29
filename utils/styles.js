import styled from 'styled-components/native'
import { colorAccent } from './colors'
import { Animated } from 'react-native'

export const StyledTextInput = styled.TextInput`
border-bottom-color: rgb(0,0,0);
border-bottom-width: 1px;
height: 50px;
fontSize: 20px;
padding: 1px 1px;
margin: 10px 5px;
text-decoration-line: none;
`
export const InputBoxCover = styled.View`
border-color: rgb(0,0,0);
border-radius: 10px;
border-width: 1px;
margin: 50px 20px;
`

export const CenterView = styled.View`
flex: 1;
background-color: #fff;
justify-content: center;
`

export const DeckItem = styled.View`
flex: 1;
background-color: #fff;
justify-content: center;
border-bottom-color: rgb(0,0,0);
border-bottom-width: 1px;
height: 200px;
`

export const SubmitButton = styled.TouchableOpacity`
background-color: ${props => props.buttonColor || '#000000'};
padding: ${props => props.padding || '20px'};
padding-left: ${props => props.paddingRightLeft || '50px'};
padding-right: ${props => props.paddingRightLeft || '50px'};
justify-content: center;
align-items: center;
border-radius: 15px;
border-color: ${props => props.colorAccent || colorAccent};
border-width: 1px;
`
export const ButtonText = styled.Text`
color: ${props => props.color || '#fff'};
fontSize: ${props => props.fontSize || '25px'};
`
export const TextPrimary = styled.Text`
font-size: ${props => props.fontSize || '50px'};
text-align: center;
`
export const AnimatedTextPrimary = Animated.createAnimatedComponent(TextPrimary)

export const TextSecondary = styled.Text`
font-size: ${props => props.fontSize || '20px'};
text-align: center;
color: gray;
`

export const InfiniteListContainer = styled.SafeAreaView`
flex: 1;
background-color: white;
padding: 2px 4px;
`