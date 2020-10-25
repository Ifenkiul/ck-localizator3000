let properties = null;

function checkProperties() {
    const repeatsElements = [];
    const propertiesDatabase = {};
    const inputProperties = document.querySelector('.input-properties');
    properties = {};
    document.querySelector('.screen-properties_checked').innerText = "";

    if (inputProperties.value !== "") {
        inputProperties.value.trim().split("\n").forEach((elem) => {
            if (elem !== "" && elem.includes("=")) {
                const tranzitArr = elem.split("=");

                if (tranzitArr[0] in properties) {
                    repeatsElements.push(tranzitArr[0]);

                }

                properties[tranzitArr[0]] = tranzitArr[1];
            }
        });

        document.querySelector('.screen-repeats').innerText = 'Repeats in properties key names:\n';
        for (let i = 0; i < repeatsElements.length; i++) {
            document.querySelector('.screen-repeats').innerText += repeatsElements[i] + '\n';
        }

        document.querySelector('.screen-properties_checked').innerText = 'Properties checked: \n';
        for (key in properties) {
            document.querySelector('.screen-properties_checked').innerText += key + "=" + properties[key] + '\n';
        }
        console.log(repeatsElements);
        if (Object.keys(properties).length === 0) {
            alert("Text you've iputed contains no properties...")
        } else {
            document.querySelector('.input-values_en').disabled = false;
            document.querySelector('.input-values_th').disabled = false;
            document.querySelector('.btn_modify_properties').disabled = false;
            document.querySelector('.btn_check_repeats').disabled = false;

        }
    } else {
        alert("You didn't input any properties yet....")
    }
}

function localizeProperties(propertiesData) {

    const inputEn = document.querySelector('.input-values_en');
    const inputTh = document.querySelector('.input-values_th');
    const notFoundLine = document.querySelector('.results_properties_notfound');
    const localizedProperties = {};

    if (!inputEn.value || !inputTh.value || !propertiesData) {
        alert('One ore both fields with values are empty or u didn"t input properties');
    } else {
        const valuesEN = inputEn.value.trim().split('\n');
        const valuesTH = inputTh.value.trim().split('\n');
        console.log(valuesEN);
        console.log(valuesTH);
        if (valuesEN.length !== valuesTH.length) {
            alert('there are different lengths in values arrays. Pls check');
            return;
        } else {
            const screenBefore = document.querySelector('.results_properties_before');
            const screenAfter = document.querySelector('.results_properties_after');
            for (let i = 0; i < valuesEN.length; i++) {
                if (valuesEN[i] !== "") {
                    let valueFound = 0;

                    for (key in propertiesData) {
                        if (propertiesData[key] === valuesEN[i]) {
                            if (valuesEN[i] !== valuesTH[i]) {
                                screenBefore.innerText += `${key}=${propertiesData[key]}\n`;
                                localizedProperties[key] = valuesTH[i];
                            }

                            valueFound = 1;
                            break;
                        }

                    }

                    if (valueFound === 0) {
                        notFoundLine.innerText += `${valuesEN[i]}\n`;
                    }

                }

            }

            const propertiesArray = [];
            for (key in localizedProperties) {
                propertiesArray.push(`${key}=${localizedProperties[key]}`);
            };
            propertiesArray.sort();
            for (let i = 0; i < propertiesArray.length; i++) {
                screenAfter.innerText += `${propertiesArray[i]}\n`;
            }
        }
    }
}

function findRepeatsValues(values) {
    const cloneArray = [];
    const repeatsArray = [];
    const resultsLine = document.querySelector('.results_repeats');

    resultsLine.innerText = "";
    for (let i = 0; i < values.length; i++) {
        if (values[i] !== "" && cloneArray.includes(values[i])) {
            repeatsArray.push(values[i]);
            resultsLine.innerText += `${values[i]}\n`;
        }
        cloneArray.push(values[i]);
    }
    alert(`English values have ${repeatsArray.length} repeats`)
}




document.querySelector('.btn-check_properties_doubles').addEventListener('click', checkProperties);
document.querySelector('.btn_modify_properties').addEventListener('click', () => {
    localizeProperties(properties);
});
document.querySelector('.btn_check_repeats').addEventListener('click', function () {
    findRepeatsValues(document.querySelector('.input-values_en').value.trim().split('\n'));
});
$('.btn_toggle').on('click', function (event) {
    $(event.currentTarget).next().toggle();
})