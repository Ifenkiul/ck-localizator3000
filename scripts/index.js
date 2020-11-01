let properties = {}
let values = [];
const colors = {
    0:'red',
    2:'yellow',
    3:'blue',
    4:'orange',
    5: 'purple'
}

function checkProperties(textValue) {
    properties = {};
    const props = [[], []];;
    const textInput = textValue;
    const repeatsArray = [];
    const lineRepeats = document.querySelector('.screen-repeats');
    lineRepeats.innerText = "Repeats in propertie's key names: \n"

    if(textInput === '') {
        alert("You didn't input any text...");
    } else {
        textInput.trim().split('\n').forEach((element) => {
            if(element !== '' && element.includes('=')){
                let a, b;
                [a, ...b] = element.split('=');
                b = b.join('=');
                const transit = [a,b];

                if( props[0].includes(transit[0])){
                    repeatsArray.push(transit[0]);
                }
                props[0].push(transit[0]);
                props[1].push(transit[1]);
            }
        });

        if(repeatsArray.length > 0){
            for(let i = 0; i < repeatsArray.length; i++){
                lineRepeats.innerText += repeatsArray[i] + '\n';
            }

        }else{
            if(props[0].length > 0){
                for(let i = 0; i < props[0].length; i++){
                    if(properties[props[1][i]]) {
                        properties[props[1][i]].push(props[0][i]);
                    } else {
                        properties[props[1][i]] = [];
                        properties[props[1][i]].push(props[0][i]);
                    }
                }
                console.log(properties);
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

                    case valuesTH[i] === "":
                        checkedArray.push([5, valuesEN[i], valuesTH[i] ])
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
    return [cloneArrayEN.map((element) =>{
        return element.trim();
    }), cloneArrayTH.map((element) => {
        return element.trim();
    })];
}

function localizeProperties() {

    const notFoundLine = document.querySelector('.results_properties_notfound');
    notFoundLine.innerHTML = '';
    const localizedProperties = [];
    const lostValues =[];
    const screenAfter = document.querySelector('.results_properties_after');
    screenAfter.innerText = '';

    if(Object.keys(properties).length > 0){
       for(let i = 0; i < values[0].length; i++){
           if(properties[values[0][i]]){
            properties[values[0][i]].forEach((element) => {
                localizedProperties.push(element + '=' + values[1][i]);
            });
           }else{
            lostValues.push(values[0][i] + '=' + values[1][i]);
            notFoundLine.innerHTML+= `<tr><td>${values[0][i]}</td><td>${values[1][i]}</td></tr>`;
           }
    }
}
    
    if( localizedProperties.length > 0){
        localizedProperties.sort();
        for(let i = 0; i < localizedProperties.length; i++){
            screenAfter.innerText += localizedProperties[i] + '\n';
        }
    }


}

function testResults(textToTest, textToCompare){
    const arrayToTest = textToTest.trim().split('\n');
    const arrayToCompare = textToCompare.trim().split('\n');
    const arrayMismatches = [];
    const lineTestResult = document.querySelector('.test_props_results');
    const lineMissMatches = document.querySelector('.test_props_mismatches');
    lineMissMatches.innerText = '';
    lineTestResult.innerText = '';
    
    for(let i = 0; i < arrayToCompare.length; i++){
        if(arrayToCompare[i] !==''){
            const index = arrayToTest.indexOf(arrayToCompare[i]);
        if( index >= 0){
            lineTestResult.innerText +=`${arrayToCompare[i]} -> ${arrayToTest[index]}\n`;
        }else{
            arrayMismatches.push(arrayToCompare[i]);
        }
        }
    }
    
    for(let i = 0; i < arrayMismatches.length; i++){
        lineMissMatches.innerText += arrayMismatches + '\n';
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
   console.log(values);
   console.log(properties);
   if(values.length > 0 && Object.keys(properties).length > 0){
       document.querySelector('.localization_results').classList.remove('d-none');
       const linePropertiesBefore = document.querySelector('.results_properties_before');
       linePropertiesBefore.innerText = '';

       for(let key in properties){
           properties[key].forEach((element) => {
                linePropertiesBefore.innerText += `${element}=${key}\n`;
           });
       }
   } else {
    document.querySelector('.localization_results').classList.add('d-none');
   }
});

document.querySelector('.btn_modify_properties').addEventListener('click', () => {
    localizeProperties();
});

$('.btn_toggle').on('click', function (event) {
    $(event.currentTarget).next().toggle();
})

$('.btn_test_props').on('click', () => {
    testResults($('.props_to_test').val(), $('.props_to_compare').val());
});