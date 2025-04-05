const SortingLib = (() => {
    const logStats = (name, comparisons, swaps, undefinedCount) => {
        const message = `${name} — Порівнянь: ${comparisons}, Обмінів/Переміщень: ${swaps}`;
        console.log(message);
        if (undefinedCount > 0) {
            console.warn(`${name}: У масиві знайдено ${undefinedCount} undefined-елемент(ів)`);
        }
        const output = document.createElement('p');
        output.textContent = message;
        document.body.appendChild(output);
    };

    const compare = (a, b, ascending) => ascending ? a > b : a < b;

    const cleanArray = (arr) => {
        let undefinedCount = 0;
        const clean = arr.map((v) => {
            if (typeof v === 'undefined') {
                undefinedCount++;
                return Number.NaN; // Позначаємо undefined
            }
            return v;
        });
        return [clean, undefinedCount];
    };

    const bubbleSort = (arr, ascending = true) => {
        let [a, undefinedCount] = cleanArray([...arr]);
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                if (isNaN(a[j]) || isNaN(a[j + 1])) continue;
                comparisons++;
                if (compare(a[j], a[j + 1], ascending)) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    swaps++;
                }
            }
        }

        logStats("Bubble Sort", comparisons, swaps, undefinedCount);
        return a;
    };

    const selectionSort = (arr, ascending = true) => {
        let [a, undefinedCount] = cleanArray([...arr]);
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < a.length; i++) {
            if (isNaN(a[i])) continue;
            let minIdx = i;
            for (let j = i + 1; j < a.length; j++) {
                if (isNaN(a[j])) continue;
                comparisons++;
                if (compare(a[minIdx], a[j], ascending)) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [a[i], a[minIdx]] = [a[minIdx], a[i]];
                swaps++;
            }
        }

        logStats("Selection Sort", comparisons, swaps, undefinedCount);
        return a;
    };

    const insertionSort = (arr, ascending = true) => {
        let [a, undefinedCount] = cleanArray([...arr]);
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < a.length; i++) {
            let key = a[i];
            if (isNaN(key)) continue;
            let j = i - 1;
            while (j >= 0 && !isNaN(a[j]) && compare(a[j], key, ascending)) {
                a[j + 1] = a[j];
                comparisons++;
                swaps++;
                j--;
            }
            a[j + 1] = key;
            swaps++;
        }

        logStats("Insertion Sort", comparisons, swaps, undefinedCount);
        return a;
    };

    const shellSort = (arr, ascending = true) => {
        let [a, undefinedCount] = cleanArray([...arr]);
        let comparisons = 0, swaps = 0;

        for (let gap = Math.floor(a.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < a.length; i++) {
                let temp = a[i];
                if (isNaN(temp)) continue;
                let j;
                for (j = i; j >= gap && !isNaN(a[j - gap]) && compare(a[j - gap], temp, ascending); j -= gap) {
                    a[j] = a[j - gap];
                    comparisons++;
                    swaps++;
                }
                a[j] = temp;
                swaps++;
            }
        }

        logStats("Shell Sort", comparisons, swaps, undefinedCount);
        return a;
    };

    const quickSort = (arr, ascending = true) => {
        let [a, undefinedCount] = cleanArray([...arr]);
        let comparisons = 0, swaps = 0;

        function quicksortRecursive(a) {
            if (a.length < 2) return a;
            let pivot = a[0];
            let left = [], right = [];

            for (let i = 1; i < a.length; i++) {
                if (isNaN(a[i])) continue;
                comparisons++;
                if (compare(pivot, a[i], ascending)) {
                    left.push(a[i]);
                } else {
                    right.push(a[i]);
                }
            }
            swaps += a.length;
            return [...quicksortRecursive(left), pivot, ...quicksortRecursive(right)];
        }

        let sorted = quicksortRecursive(a.filter(x => !isNaN(x)));
        logStats("Quick Sort", comparisons, swaps, undefinedCount);
        return sorted;
    };

    return {
        bubbleSort,
        selectionSort,
        insertionSort,
        shellSort,
        quickSort
    };
})();

