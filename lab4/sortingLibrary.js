const SortingLib = (() => {
    function logStats(name, comparisons, swaps, sparseFound) {
        console.log(`${name}: порівнянь = ${comparisons}, обмінів/переміщень = ${swaps}`);
        if (sparseFound) {
            console.warn(`${name}: У масиві були undefined-елементи`);
        }
    }

    function handleSparse(array) {
        let sparseFound = false;
        const cleanArray = array.map((v) => {
            if (v === undefined) {
                sparseFound = true;
                return Infinity; // або -Infinity залежно від напрямку сортування
            }
            return v;
        });
        return { cleanArray, sparseFound };
    }

    function bubbleSort(array, ascending = true) {
        let comparisons = 0, swaps = 0;
        const { cleanArray, sparseFound } = handleSparse(array);
        const len = cleanArray.length;

        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                comparisons++;
                if ((ascending && cleanArray[j] > cleanArray[j + 1]) ||
                    (!ascending && cleanArray[j] < cleanArray[j + 1])) {
                    [cleanArray[j], cleanArray[j + 1]] = [cleanArray[j + 1], cleanArray[j]];
                    swaps++;
                }
            }
        }

        logStats("Bubble Sort", comparisons, swaps, sparseFound);
        return cleanArray;
    }

    function selectionSort(array, ascending = true) {
        let comparisons = 0, swaps = 0;
        const { cleanArray, sparseFound } = handleSparse(array);
        const len = cleanArray.length;

        for (let i = 0; i < len - 1; i++) {
            let idx = i;
            for (let j = i + 1; j < len; j++) {
                comparisons++;
                if ((ascending && cleanArray[j] < cleanArray[idx]) ||
                    (!ascending && cleanArray[j] > cleanArray[idx])) {
                    idx = j;
                }
            }
            if (i !== idx) {
                [cleanArray[i], cleanArray[idx]] = [cleanArray[idx], cleanArray[i]];
                swaps++;
            }
        }

        logStats("Selection Sort", comparisons, swaps, sparseFound);
        return cleanArray;
    }

    function insertionSort(array, ascending = true) {
        let comparisons = 0, swaps = 0;
        const { cleanArray, sparseFound } = handleSparse(array);
        const len = cleanArray.length;

        for (let i = 1; i < len; i++) {
            let key = cleanArray[i];
            let j = i - 1;

            while (j >= 0 && ((ascending && cleanArray[j] > key) || (!ascending && cleanArray[j] < key))) {
                comparisons++;
                cleanArray[j + 1] = cleanArray[j];
                swaps++;
                j--;
            }
            comparisons++;
            cleanArray[j + 1] = key;
            swaps++;
        }

        logStats("Insertion Sort", comparisons, swaps, sparseFound);
        return cleanArray;
    }

    function shellSort(array, ascending = true) {
        let comparisons = 0, swaps = 0;
        const { cleanArray, sparseFound } = handleSparse(array);
        const len = cleanArray.length;

        let gap = Math.floor(len / 2);
        while (gap > 0) {
            for (let i = gap; i < len; i++) {
                let temp = cleanArray[i];
                let j = i;
                while (j >= gap && ((ascending && cleanArray[j - gap] > temp) || (!ascending && cleanArray[j - gap] < temp))) {
                    comparisons++;
                    cleanArray[j] = cleanArray[j - gap];
                    swaps++;
                    j -= gap;
                }
                comparisons++;
                cleanArray[j] = temp;
                swaps++;
            }
            gap = Math.floor(gap / 2);
        }

        logStats("Shell Sort", comparisons, swaps, sparseFound);
        return cleanArray;
    }

    function quickSort(array, ascending = true) {
        let comparisons = 0, swaps = 0;
        const { cleanArray, sparseFound } = handleSparse(array);

        function partition(arr, low, high) {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                comparisons++;
                if ((ascending && arr[j] < pivot) || (!ascending && arr[j] > pivot)) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps++;
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            swaps++;
            return i + 1;
        }

        function quickSortRecursive(arr, low, high) {
            if (low < high) {
                let pi = partition(arr, low, high);
                quickSortRecursive(arr, low, pi - 1);
                quickSortRecursive(arr, pi + 1, high);
            }
        }

        quickSortRecursive(cleanArray, 0, cleanArray.length - 1);
        logStats("Quick Sort", comparisons, swaps, sparseFound);
        return cleanArray;
    }

    return {
        bubbleSort,
        selectionSort,
        insertionSort,
        shellSort,
        quickSort
    };
})();

