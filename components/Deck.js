import React from 'react'
import { DeckItem, DeckTextPrimary, DeckTextSecondary } from '../utils/styles'

function Deck ({ title, numberOfCards }){

    return(
        <DeckItem>
            <DeckTextPrimary>{title}</DeckTextPrimary>
            <DeckTextSecondary>{`${numberOfCards} Cards`}</DeckTextSecondary>
        </DeckItem>
    )
}

export default Deck