let properties = {};
let values = [];
const colors = {
    0:'red',
    2:'yellow',
    3:'blue',
    4:'orange'
}

function checkProperties(textValue) {
    properties = {};
    const textInput = textValue;
    const repeatsArray = [];
    const lineRepeats = document.querySelector('.screen-repeats');
    lineRepeats.innerText = "Repeats in propertie's key names: \n"

    if(textInput === '') {
        alert("You didn't input any text...");
    } else {
        textInput.trim().split('\n').forEach((element) => {
            if(element !== '' && element.includes('=')){
                const transit = element.split('=');
                if(transit[0] in properties){
                    repeatsArray.push(transit[0]);
                }
                properties[transit[0]] = transit[1];
            }
        });

        if(repeatsArray.length > 0){
            for(let i = 0; i < repeatsArray.length; i++){
                lineRepeats.innerText += repeatsArray[i] + '\n';
            }

        }else{
            if(Object.keys(properties).length > 0){
                return true;
            }

        }
    }
    return false;
}

function toggleValuesBlock(param) {
    switch(param) {
        case 0:
            document.querySelector('.values').classList.add('d-none');
            document.querySelector('.results_properties_before').innerText = '';
            document.querySelector('.localization_results').classList.add('d-none');
        break;
        case 1:
            document.querySelector('.values').classList.remove('d-none');
            
        break;
    }
}

function findRepeatsValues(valuesEN, valuesTH) {
    const cloneArrayEN = [];
    const cloneArrayTH = [];
    const checkedArray = [];
    const repeatsTable = document.querySelector('.results_repeats');
    repeatsTable.innerHTML = '';
    if(valuesEN.length !== valuesTH.length){
        alert("Value lists have different lengths, pls check...")
    }else{
        for (let i = 0; i < valuesEN.length; i++) {
            if(valuesEN[i]!==""){
                const repeatIndex = cloneArrayEN.indexOf(valuesEN[i]);
                switch(true){
                    case valuesEN[i] === valuesTH[i]:
                        checkedArray.push([3,valuesEN[i], valuesTH[i]]);
                    break;

                    case repeatIndex >= 0:
                        if(cloneArrayTH[repeatIndex] === valuesTH[i]){
                            checkedArray.push([2, valuesEN[i], valuesTH[i]]);
                        } else {
                            checkedArray.push([4, valuesEN[i], valuesTH[i]]);
                        }
                    break;

                    default:
                        cloneArrayEN.push(valuesEN[i]);
                        cloneArrayTH.push(valuesTH[i]);
                }
            }
        }
    }

    if(checkedArray.length > 0){

        repeatsTable.innerHTML = '';
        for(let i = 0; i < checkedArray.length; i++){
            repeatsTable.innerHTML += `<tr style='background-color: ${colors[checkedArray[i][0]]}'><td>${checkedArray[i][0]}</td><td>${checkedArray[i][1]}</td><td>${checkedArray[i][2]}</td></tr>`
        }
        return [];
    }
    return [cloneArrayEN, cloneArrayTH];
}

function localizeProperties(propertiesData) {

    const notFoundLine = document.querySelector('.results_properties_notfound');
    notFoundLine.innerText = '';
    const localizedProperties = {};
    const lostValues =[];
    const screenAfter = document.querySelector('.results_properties_after');
    screenAfter.innerText = '';

        for (let i = 0; i < values[0].length; i++) {
            let found = false;
            for(let key in properties){
                if(properties[key] === values[0][i]){
                    localizedProperties[key] =  values[1][i];
                    found = true;
                }
            }
            if(found === false) {
                lostValues.push([values[0][i], values[1][i]]);
            }
        }
        if(Object.keys(localizedProperties).length > 0){
            for(let key in localizeProperties){
                screenAfter.innerText += `${key}=${localizedProperties[key]}\n`;
            }
        }

        if(lostValues.length > 0){
            for(let i = 0; i < lostValues.length; i++){
                notFoundLine.innerText += `${lostValues[i][0]}:${lostValues[i][1]}\n`;
            }
        }
        

        
}

document.querySelector('.btn-check_properties_doubles').addEventListener('click', () => {
    if(checkProperties(document.querySelector('.input-properties').value) === true){
        toggleValuesBlock(1);
    }else{
        toggleValuesBlock(0);
    }

});

document.querySelector('.btn_check_repeats').addEventListener('click', function () {
   values = findRepeatsValues(document.querySelector('.input-values_en').value.trim().split('\n'),document.querySelector('.input-values_th').value.trim().split('\n'));
   if(values.length > 0 && Object.keys(properties).length > 0){
       document.querySelector('.localization_results').classList.remove('d-none');
       const linePropertiesBefore = document.querySelector('.results_properties_before');
       linePropertiesBefore.innerText = '';
       for (let key in properties){
           linePropertiesBefore.innerText += `${key}=${properties[key]}\n`;
       }
   } else {
    document.querySelector('.localization_results').classList.add('d-none');
   }
});

document.querySelector('.btn_modify_properties').addEventListener('click', () => {
    localizeProperties(properties);
});

$('.btn_toggle').on('click', function (event) {
    $(event.currentTarget).next().toggle();
})