const start = document.querySelector(".start")
const [...td] = document.querySelectorAll('.field-cell')
const [...tr] = document.querySelectorAll('.field-row')

const startGameMessage = document.querySelector('.message-start')
const winGameMessage = document.querySelector('.message-win')
const loseGameMessage = document.querySelector('.message-lose')
const gameScore = document.querySelector('.game-score')
const bestScore = document.querySelector('.game-best')

start.addEventListener("click", ()  => {
    
    start.textContent = "Restart"
    start.classList.remove('start')
    start.classList.add('restart')

    startGameMessage.classList.add('hidden')
    loseGameMessage.classList.add('hidden')
    winGameMessage.classList.add('hidden')
    gameScore.textContent = 0

    td.forEach(elem => {
        elem.textContent = ''
        elem.className = 'field-cell'
    })

    addRandomField()
    addRandomField()

    document.addEventListener("keydown", keyDownEvent)
})

function keyDownEvent(event){    
    const first = []
    const vacantTd = td.filter(elem => elem.textContent === '')

    td.forEach(elem => {
        first.push({textContent: elem.textContent})
    })

    getScore(-1)

    switch(event.code){
        case "ArrowRight":
            pressArrowRight()
        break
        case "ArrowLeft":
            pressArrowLeft()
        break
        case "ArrowDown":
            pressArrowDown()
        break
        case "ArrowUp":
            pressArrowUp()
        break
    }

    for(let i = 0; i < td.length; i++){

        if(td[i].textContent === '2048'){
            winGameMessage.classList.remove('hidden')
        }

        if((first[i].textContent !== td[i].textContent) || vacantTd.length === 0){
            addRandomField()

            return
        }
    }

}

function pressArrowDown(){

    tr.forEach((elementTr, indexTr, arrayTr) => {
        const [...tdCurrenRow] = elementTr.querySelectorAll("td")

        if(arrayTr[indexTr - 1]){
            const [...tdPreviosRow] = arrayTr[indexTr - 1].querySelectorAll("td")

            tdCurrenRow.forEach((elem, index) => {

                const current = createColumn(index)
                moveField(current)
                current.reverse()

                fieldAddition(elem, tdPreviosRow[index])
                
                moveField(current)
                current.reverse()
            })
        }        
    })
}

function pressArrowUp(){

    tr.forEach((elementTr, indexTr, arrayTr) => {
        const [...tdCurrenRow] = elementTr.querySelectorAll("td")
         
        if(arrayTr[indexTr + 1]){
            const [...tdNextRow] = arrayTr[indexTr + 1].querySelectorAll("td")

            tdCurrenRow.forEach((elem, index, array) => {
                moveField(createColumn(index))
   
                fieldAddition(elem, tdNextRow[index])
    
                moveField(createColumn(index))
            })
        }
    })
}

function pressArrowLeft(){

    tr.forEach((elementTr) => {
        const [...tdCurrenRow] = elementTr.querySelectorAll("td")
        
        moveField(tdCurrenRow)
        
        tdCurrenRow.forEach((elem, index, array) => {
            if(array[index + 1]){
                fieldAddition(elem, array[index + 1])
            }
        })

        moveField(tdCurrenRow)
    })
}

function pressArrowRight(){
    tr.forEach((elementTr) => {
        const [...tdCurrenRow] = elementTr.querySelectorAll("td")
        
        moveField(tdCurrenRow)
        tdCurrenRow.reverse()

        for(let i = tdCurrenRow.length - 1; i > 0; i--){  
            if(tdCurrenRow[i - 1]){
                fieldAddition( tdCurrenRow[i-1], tdCurrenRow[i])
            }
        }

        moveField(tdCurrenRow)
        tdCurrenRow.reverse()
    })
}

function isHaveMove(){
    const elementsArray = []
    tr.forEach(elem => elementsArray.push([...elem.querySelectorAll('td')]))

    for (let i = 0; i < elementsArray.length; i++) {
        for (let j = 0; j < elementsArray[i].length; j++) {
            if(elementsArray[i + 1]){
                if(elementsArray[i][j].textContent === elementsArray[i + 1][j].textContent){
                    return false
                }
            }
    
            if(elementsArray[i][j + 1]){
                if(elementsArray[i][j].textContent === elementsArray[i][j + 1].textContent){
                    return false
                }
            }
        }
    }

    return true
}

function addRandomField(){
    const vacantTd = td.filter(elem => elem.textContent === '')
    const random = Math.floor(Math.random() * vacantTd.length)

    if(vacantTd.length === 0){
        if(isHaveMove()){
            loseGameMessage.classList.remove('hidden')
            document.removeEventListener("keydown", keyDownEvent);  
        }
        
        return
    }else{
        vacantTd[random].textContent = random % 9 ? 2 : 4
        vacantTd[random].classList.add(`field-cell--${vacantTd[random].textContent}`)
    }
}

function moveField(currentRow){
    const start = currentRow.filter(elem => elem.textContent !== '')
    currentRow.forEach((elem,index) => {

        if(start[index]){
            elem.textContent = start[index].textContent
            elem.className = start[index].className
        }else{
            elem.textContent = ''
            elem.className = 'field-cell'
        }
    })
}

function fieldAddition(firstField, secondFiels){
    if(firstField.textContent !== '' && firstField.textContent === secondFiels.textContent){

        firstField.classList.remove(`field-cell--${firstField.textContent}`)
        firstField.textContent = `${firstField.textContent * 2}`
        firstField.classList.add(`field-cell--${firstField.textContent}`)
        getScore(firstField.textContent)

        secondFiels.classList.remove(`field-cell--${secondFiels.textContent}`)
        secondFiels.textContent = ''
    }
}

function createColumn(index){
    const elementsArray = []
    tr.forEach(elem => elementsArray.push([...elem.querySelectorAll('td')]))
    
    return elementsArray.map(elem => elem[index])
}

function getScore(number){

    gameScore.textContent = parseInt(gameScore.textContent) + parseInt(number)
    if(parseInt(gameScore.textContent) < 0){
        gameScore.textContent = 0
    }
    if(+bestScore.textContent < +gameScore.textContent){
        bestScore.textContent = gameScore.textContent
    }
}
