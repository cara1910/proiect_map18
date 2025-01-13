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

function insert(root, data) {
    operationsCount++; 
    if (root === null) {
        operationsCount++; 
        return new Node(data);
    }

    operationsCount++; 
    if (data < root.data) {
        root.left = insert(root.left, data);
    } else if (data > root.data) {
        operationsCount++; 
        root.right = insert(root.right, data);
    }
    return root;
}

function search(root, key) {
    operationsCount++; 
    if (root === null || root.data === key) {
        operationsCount++; 
        return root;
    }

    operationsCount++; 
    if (key < root.data) {
        return search(root.left, key);
    }

    return search(root.right, key);
}

function deleteNode(root, key) {
    operationsCount++; 
    if (root === null) {
        return root;
    }

    operationsCount++;
    if (key < root.data) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.data) {
        operationsCount++; 
        root.right = deleteNode(root.right, key);
    } else {
        operationsCount++; 
        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        }

        operationsCount++; 
        root.data = findMin(root.right);
        root.right = deleteNode(root.right, root.data);
    }
    return root;
}

function findMin(root) {
    let minValue = root.data;
    while (root.left !== null) {
        operationsCount++; 
        minValue = root.left.data;
        root = root.left;
    }
    return minValue;
}

function measurePerformance(arr, type) {
    let root = null;

    //masoara operatiunile de inserare
    resetOperations();
    for (let i = 0; i < arr.length; i++) {
        root = insert(root, arr[i]);
    }
    document.getElementById('rankingList').innerHTML += `<li>Performanță Inserare ${type}: ${operationsCount} operațiuni</li>`;

    //masoara operatiunile de cautare
    resetOperations();
    for (let i = 0; i < arr.length; i++) {
        search(root, arr[i]);
    }
    document.getElementById('rankingList').innerHTML += `<li>Performanță Căutare ${type}: ${operationsCount} operațiuni</li>`;

    //masoara operatiunile de stergere
    resetOperations();
    for (let i = 0; i < arr.length; i++) {
        root = deleteNode(root, arr[i]);
    }
    document.getElementById('rankingList').innerHTML += `<li>Performanță Ștergere ${type}: ${operationsCount} operațiuni</li>`;
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

    //testez perfomanta
    measurePerformance(randomArr, 'Random');
    measurePerformance(ascArr, 'Crescător');
    measurePerformance(descArr, 'Descrescător');
}

document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('rankingList').innerHTML = "";
    getUserInput(); //sterg vechile rezultate
});