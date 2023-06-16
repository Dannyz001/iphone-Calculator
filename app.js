const time = document.querySelector('.time')
const buttons = document.querySelectorAll('.buttons')
let displayValue= document.getElementById('display-value')
const decimal = document.querySelector('.point')
const operators = document.querySelectorAll('.operators')
const equals = document.querySelector('.equals')
const clearBtn = document.querySelector('.clear-button')
const specialOpp = document.querySelectorAll('.s-operators')


const newTime=()=>{
    const date = new Date()
    const hours = date.getHours()
    let minutes;
    if(date.getMinutes() < 10){
         minutes =`0${date.getMinutes()}`
    }
    else{
        minutes = date.getMinutes()
    }
    let seconds;
    if(date.getSeconds() < 10){
         seconds =`0${date.getSeconds()}`
    }
    else{
        seconds = date.getSeconds()
    }


    time.innerHTML = `${hours}:${minutes}`
}
window.setInterval(newTime, 1000);


    
 let firstValue;
 let secondValue= '';
 let currOperator;
 let subOperator;
 let firstAns = 0;
 let decimalPoint ;




  const getValue=()=>{
    
    buttons.forEach(function(button){

    button.addEventListener('click', function(){


        displayControl(button)
        
  })
  })
}
getValue();



const displayControl =(button)=>{
   

    if(button.innerText === '.' && displayValue.textContent.includes('.') === true){
         return
    }
    
    if ( displayValue.textContent === '0' ){
        if (button.classList.contains('point') === true){  
            if (!currOperator) {
            firstValue = displayValue.textContent + button.textContent;
            displayValue.textContent = firstValue;
            } else {
            secondValue = displayValue.textContent + button.textContent;
            displayValue.textContent = secondValue;
            }
        }
        
        else if(!currOperator){
            firstValue = button.textContent;
            displayValue.textContent = firstValue;
            
           
        }
        
        
        else{
            secondValue = button.textContent;
            displayValue.textContent = secondValue;
        }
    }
    else{
         if(!currOperator ){
            if(firstValue.length < 9){
            firstValue += button.textContent;
            displayValue.textContent = firstValue;
            }
        }else{
            if(secondValue.length < 9){
            secondValue += button.textContent;
            displayValue.textContent = secondValue;}
        }
    }
    if(firstValue != undefined){
        clearBtn.textContent = 'C'
    }

    button.style.backgroundColor = '#b0aaa6'
    setTimeout(function(){
        button.style.backgroundColor = '#464444'
    }, 300)

    operators.forEach(function(operator){
        operator.classList.remove('active')
    })
            
        
    return displayValue.textContent;    
}


operators.forEach(function(operator){
    
    operator.addEventListener('click',(e)=>{
        
       operators.forEach(function(activeOpe){
        activeOpe.classList.remove('active')
       })
       operator.classList.add('active')
        
        if (currOperator == undefined){
            currOperator = e.target.id;
        } 
        else{
            
         evalution()
         currOperator = e.target.id;
        firstValue = firstAns
        secondValue = '';
        }
        
    
    
});
   
});


specialOpp.forEach(function(opertorSpec){
    opertorSpec.addEventListener('click', (e)=>{
        currOperator= e.currentTarget.id;
        
        if(currOperator == 'percentage'){
            firstAns= firstValue / 100
            
        }
        else if(currOperator == 'addSign'){
            if(!firstValue.includes('-')){
                firstValue = '-' + firstValue
                firstAns = firstValue
            }
            else {
             firstValue = firstValue.slice(1)
                firstAns = firstValue
            }

            
        }
        opertorSpec.style.backgroundColor = '#E8E2E2'
    setTimeout(function(){
        opertorSpec.style.backgroundColor = '#b0aaa6'
    }, 300)
        return displayValue.textContent = firstAns
        
    })
})


const evalution=()=>{

    let value1 = Number(firstValue)
    let value2 = Number(secondValue)

    if(currOperator === 'plus'){
        firstAns = value1 + value2
        
    }

    else if(currOperator === 'minus'){
        firstAns = value1 - value2
    }
    else if(currOperator === 'division'){
        firstAns = value1 / value2
    }
    else if(currOperator === 'times'){
        firstAns = value1 * value2
        
    }
    
    let getLength = firstAns.toString()
    if(getLength.length > 9){
     displayValue.textContent = firstAns.toExponential(2)
    }
    else{
     return    displayValue.textContent = firstAns
    }
    
    
     
}
    


 equals.onclick = function(){
    
    evalution()
    equals.style.backgroundColor = '#FFE2AD'
    setTimeout(function(){
        equals.style.backgroundColor = 'orange'
    }, 300)
    return displayValue.textContent

}


clearBtn.addEventListener('click', () => {
  firstValue = '';
  secondValue = '';
  currOperator = undefined;
  subOperator = undefined;
  firstAns = 0;
  decimalPoint = undefined;
  displayValue.textContent = '0';
  clearBtn.textContent = 'AC'
   clearBtn.style.backgroundColor = '#E8E2E2'
    setTimeout(function(){
        clearBtn.style.backgroundColor = '#b0aaa6'
    }, 300)

});


















