let operationsCount = 0;

function resetOperations() {
    operationsCount = 0;
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function getUserInput() {
    //extrag imputurile
    const randomInput = document.getElementById('randomInput').value;
    const ascendingInput = document.getElementById('ascendingInput').value;
    const descendingInput = document.getElementById('descendingInput').value;

    //convertesc imputurile din stringuri in vectori de numere
    const randomArr = randomInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const ascArr = ascendingInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    const descArr = descendingInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

}

document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('rankingList').innerHTML = "";
    getUserInput(); //sterg vechile rezultate
});