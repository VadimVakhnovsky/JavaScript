// sortingLibrary.js

function bubbleSort(arr, ascending=true) {
    let comparisons = 0, swaps = 0;
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            if ((ascending && arr[j] > arr[j + 1]) || (!ascending && arr[j] < arr[j + 1])) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++;
            }
        }
    }
    console.log(`Bubble Sort: Comparisons: ${comparisons}, Swaps: ${swaps}`);
}

function selectionSort(arr, ascending=true) {
    let comparisons = 0, swaps = 0;
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if ((ascending && arr[j] < arr[minIdx]) || (!ascending && arr[j] > arr[minIdx])) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            swaps++;
        }
    }
    console.log(`Selection Sort: Comparisons: ${comparisons}, Swaps: ${swaps}`);
}

function insertionSort(arr, ascending=true) {
    let comparisons = 0, swaps = 0;
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && ((ascending && arr[j] > key) || (!ascending && arr[j] < key))) {
            comparisons++;
            arr[j + 1] = arr[j];
            j--;
            swaps++;
        }
        arr[j + 1] = key;
    }
    console.log(`Insertion Sort: Comparisons: ${comparisons}, Swaps: ${swaps}`);
}

function shellSort(arr, ascending=true) {
    let comparisons = 0, swaps = 0;
    let n = arr.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && ((ascending && arr[j - gap] > temp) || (!ascending && arr[j - gap] < temp))) {
                comparisons++;
                arr[j] = arr[j - gap];
                j -= gap;
                swaps++;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    console.log(`Shell Sort: Comparisons: ${comparisons}, Swaps: ${swaps}`);
}

function quickSort(arr, low = 0, high = arr.length - 1, ascending=true) {
    let comparisons = 0, swaps = 0;
    if (low < high) {
        let pi = partition(arr, low, high, ascending);
        comparisons += pi.comparisons;
        swaps += pi.swaps;
        quickSort(arr, low, pi.index - 1, ascending);
        quickSort(arr, pi.index + 1, high, ascending);
    }
    console.log(`Quick Sort: Comparisons: ${comparisons}, Swaps: ${swaps}`);
}

function partition(arr, low, high, ascending) {
    let pivot = arr[high];
    let i = low - 1;
    let comparisons = 0, swaps = 0;
    for (let j = low; j < high; j++) {
        comparisons++;
        if ((ascending && arr[j] <= pivot) || (!ascending && arr[j] >= pivot)) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps++;
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    return {index: i + 1, comparisons, swaps};
}
