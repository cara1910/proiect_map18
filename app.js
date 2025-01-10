// Clasa pentru nodul din arbore
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Functie pentru a crea un nou nod
function newNode(data) {
    return new Node(data);
}

// Inserare in BST
function insert(root, data) {
    if (root === null) {
        console.log(`Inserare nod nou: ${data}`);
        return new Node(data);
    }

    if (data < root.data) {
        console.log(`Inserare ${data} în stânga lui ${root.data}`);
        root.left = insert(root.left, data);
    } else if (data > root.data) {
        console.log(`Inserare ${data} în dreapta lui ${root.data}`);
        root.right = insert(root.right, data);
    }

    return root;
}

// Cautare in BST
function search(root, key) {
    if (root === null) return false;
    if (root.data === key) return true;
    if (key < root.data) return search(root.left, key);
    return search(root.right, key);
}

// Gasirea celui mai mic nod
function minValueNode(node) {
    let current = node;
    while (current && current.left !== null) {
        current = current.left;
    }
    return current;
}

// Stergerea unui nod
function deleteNode(root, key) {
    if (root === null) return root;

    if (key < root.data) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.data) {
        root.right = deleteNode(root.right, key);
    } else {
        if (root.left === null) {
            let temp = root.right;
            root = null;
            return temp;
        } else if (root.right === null) {
            let temp = root.left;
            root = null;
            return temp;
        }
        let temp = minValueNode(root.right);
        root.data = temp.data;
        root.right = deleteNode(root.right, temp.data);
    }
    return root;
}

// Functie pentru a transforma un șir de stringuri într-un array de numere
function parseInput(input) {
    return input.split(',').map(item => parseInt(item.trim()));
}

// Masurare timp
function measurePerformance(arr, n, tip) {
    let root = null;
    let start, end;

    // Măsurare timp inserare
    root = null; // Resetare arbore
    start = performance.now();
    for (let i = 0; i < n; i++) {
        root = insert(root, arr[i]);
        console.log(root);
    }
    end = performance.now();
    let insertTime = (end - start) / 1000;

    // Măsurare timp căutare
    start = performance.now();
    for (let i = 0; i < n; i++) {
        search(root, arr[i]);
    }
    end = performance.now();
    let searchTime = (end - start) / 1000;

    // Măsurare timp ștergere
    root = null; // Resetare arbore
    for (let i = 0; i < n; i++) {
        root = insert(root, arr[i]); // Reconstruim arborele
    }
    start = performance.now();
    for (let i = 0; i < n; i++) {
        root = deleteNode(root, arr[i]);
    }
    end = performance.now();
    let deleteTime = (end - start) / 1000;

    return { insertTime, searchTime, deleteTime };
}

// Afisare clasament final
function displayRanking(randomTimes, ascTimes, descTimes) {
    const categories = ["Inserare", "Cautare", "Stergere"];
    const times = [randomTimes, ascTimes, descTimes];
    const labels = ["Random", "Crescator", "Descrescator"];

    let rankingList = document.getElementById("rankingList");
    rankingList.innerHTML = '';  // Clear previous results

    for (let i = 0; i < 3; i++) {
        let categoryHeader = document.createElement("h3");
        categoryHeader.textContent = categories[i];
        rankingList.appendChild(categoryHeader);

        for (let j = 0; j < 3; j++) {
            for (let k = j + 1; k < 3; k++) {
                if (times[j][i] > times[k][i]) {
                    [times[j][i], times[k][i]] = [times[k][i], times[j][i]];
                    [labels[j], labels[k]] = [labels[k], labels[j]];
                }
            }
        }

        for (let j = 0; j < 3; j++) {
            let listItem = document.createElement("li");
            listItem.textContent = `${j + 1}. ${labels[j]}: ${times[j][i].toFixed(6)} secunde`;
            rankingList.appendChild(listItem);
        }
    }
}

// Functia principala
function main() {
    let randomInput = document.getElementById("randomInput").value;
    let ascendingInput = document.getElementById("ascendingInput").value;
    let descendingInput = document.getElementById("descendingInput").value;

    let randomArr = parseInput(randomInput);
    let ascArr = parseInput(ascendingInput);
    let descArr = parseInput(descendingInput);

    let randomResults = measurePerformance(randomArr, randomArr.length,"Random");
    let ascResults = measurePerformance(ascArr, ascArr.length, "Crescator");
    let descResults = measurePerformance(descArr, descArr.length, "Descrescator");

    let randomTimes = [randomResults.insertTime, randomResults.searchTime, randomResults.deleteTime];
  
    let ascTimes = [ascResults.insertTime, ascResults.searchTime, ascResults.deleteTime];

    let descTimes = [descResults.insertTime, descResults.searchTime, descResults.deleteTime];

    displayRanking(randomTimes, ascTimes, descTimes);
}

// Eveniment la apăsarea butonului Start
document.getElementById("startButton").addEventListener("click", main);