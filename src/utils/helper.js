export const trimCharacter=(word,length=12)=> {
    return word.length> length ?`${word.slice(0,length)}...`: word;
}

export const showTooltipValue=(word,length=24)=> {
    return word.length > length? word:''
}