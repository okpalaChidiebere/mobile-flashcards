import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'
import { TextPrimary, SubmitButton, ButtonText } from '../utils/styles'



function  QuizzItem(props){

    const bounceValue = useRef(new Animated.Value(1)).current;
    const [ checkAnswer, setCheckAnswer ] = useState(false)

    const flipCard = () => {
        Animated.sequence([
            Animated.timing(bounceValue, { useNativeDriver: true, duration: 200, toValue: 0}), //fade our text out
            Animated.spring(bounceValue, { useNativeDriver: true, toValue: 1, friction: 4 }) //we will have our text bounce out while revealing the text
        ]).start() //always call .start on your animations
        setCheckAnswer(!checkAnswer)
      
    }

    const { question, answer, totalKeys, currentKey } = props
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}><Text style={{padding: 10, fontSize: 20}}>{`${currentKey}/${totalKeys}`}</Text></View>
            <View style={{flex: 2}}>
                    {/* How do i have pass the bounceValue into styled COmponent???
                    <TextPrimary fontSize="45px">{`${question}?`}</TextPrimary> */}
                    <Animated.Text style={{fontSize: 45, textAlign: 'center', transform: [{scale: bounceValue}]}}>{`${!checkAnswer ? question : answer}`}</Animated.Text>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <SubmitButton
                        buttonColor="transparent"
                        paddingRightLeft="0px"
                        padding="10px"
                        onPress={() => flipCard()}
                        >
                            <ButtonText color="#ff0000" fontSize="20px">{!checkAnswer? 'Answer' : 'Question'}</ButtonText>
                        </SubmitButton>
                    </View>
            </View>
            <View style={{flex: 1, alignItems: 'stretch', marginLeft: 40, marginRight: 40}}>
                <SubmitButton
                buttonColor="#008000"
                paddingRightLeft="70px"
                padding="10px"
                >
                    <ButtonText >Correct</ButtonText>
                </SubmitButton>
                <View style={{height: 10}}/>
                <SubmitButton
                buttonColor="#ff0000"
                paddingRightLeft="70px"
                padding="10px"
                >
                    <ButtonText >Incorrect</ButtonText>
                </SubmitButton>
            </View>
        </View>
    )
}


export default QuizzItem

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 15,
    },

});