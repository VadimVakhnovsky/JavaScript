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
