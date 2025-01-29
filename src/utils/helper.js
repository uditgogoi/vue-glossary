export const trimCharacter=(word,length=12)=> {
    return word.length> length ?`${word.slice(0,length)}...`: word;
}

export const showTooltipValue=(word,length=24)=> {
    return word.length > length? word:''
}

export const sortArrayByAlphabet=(array)=> {
    let newArray= array.sort((a,b)=> a.title[0].localeCompare(b.title[0]))
    return newArray
}