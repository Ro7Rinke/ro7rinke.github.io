let allCardsDefault = {}
let urlCards = 'https://raw.githubusercontent.com/Ro7Rinke/rr_ygo_deck_generator/main/data/RND_Cards.json'


const getAllCardsDefault = () => {
    $.get(urlCards, (data) => {
        allCardsDefault = JSON.parse(data)
    }, 'text')
}

const between = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addCard = (allCards, cardTypeKey, deckCards, isUnique) => {
    const cardIndex = between(0, allCards[cardTypeKey].length - 1)
    
    deckCards.push(allCards[cardTypeKey][cardIndex])
    if(isUnique)
        allCards[cardTypeKey].splice(cardIndex, 1)
}

const writeDeck = (deckCards) => {
    let deckData = `#created by RR_YGO_DECK_GENERATOR\n#main\n${deckCards.join('\n')}\n#extra\n!side\n`
    
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(deckData));
    element.setAttribute('download', 'RND_Deck.ydk');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
const getDeck = (deckAmount, isUnique) => {
    for(let amount = 0; amount < deckAmount; amount++){
        let allCards = allCardsDefault
        let deckCards = []
        const deckStructure = {
            effect_ultra: 3,
            effect_high: 4,
            effect_low: 12,
            normal_ultra: 1,
            normal_high: 2,
            normal_low: 10,
            spell: 11,
            trap: 7
        }

        for( const key of Object.keys(deckStructure)){
            for( let index = 0; index < deckStructure[key]; index++){
                addCard(allCards, key, deckCards, isUnique)
            }
        }
        deckCards.sort()
        writeDeck(deckCards)
    }
}

