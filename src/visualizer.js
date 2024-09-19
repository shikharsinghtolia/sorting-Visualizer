import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 100; i++) {
            newArray.push(Math.floor(Math.random() * 500) + 5);
        }
        setArray(newArray);
    };

    const bubbleSort = () => {
        const animations = [];
        const auxiliaryArray = array.slice();
        for (let i = 0; i < auxiliaryArray.length; i++) {
            for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
                if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                    [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
                    animations.push([j, j + 1]);
                }
            }
        }
        animateBubbleSort(animations);
    };

    const animateBubbleSort = (animations) => {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [barOneIdx, barTwoIdx] = animations[i];
                setArray(prevArray => {
                    const newArray = prevArray.slice();
                    [newArray[barOneIdx], newArray[barTwoIdx]] = [newArray[barTwoIdx], newArray[barOneIdx]];
                    return newArray;
                });
            }, i * 10);
        }
    };

    const mergeSort = () => {
        const animations = [];
        const auxiliaryArray = array.slice();
        mergeSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
        animateMergeSort(animations);
    };

    const mergeSortHelper = (auxiliaryArray, start, end, animations) => {
        if (start === end) return;
        const mid = Math.floor((start + end) / 2);
        mergeSortHelper(auxiliaryArray, start, mid, animations);
        mergeSortHelper(auxiliaryArray, mid + 1, end, animations);
        merge(auxiliaryArray, start, mid, end, animations);
    };

    const merge = (auxiliaryArray, start, mid, end, animations) => {
        let left = start, right = mid + 1;
        const sortedArray = [];
        while (left <= mid && right <= end) {
            if (auxiliaryArray[left] <= auxiliaryArray[right]) {
                sortedArray.push(auxiliaryArray[left++]);
            } else {
                sortedArray.push(auxiliaryArray[right++]);
            }
        }
        while (left <= mid) sortedArray.push(auxiliaryArray[left++]);
        while (right <= end) sortedArray.push(auxiliaryArray[right++]);

        for (let i = start; i <= end; i++) {
            animations.push([i, sortedArray[i - start]]);
            auxiliaryArray[i] = sortedArray[i - start];
        }
    };

    const animateMergeSort = (animations) => {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [barIdx, newHeight] = animations[i];
                setArray(prevArray => {
                    const newArray = prevArray.slice();
                    newArray[barIdx] = newHeight;
                    return newArray;
                });
            }, i * 10);
        }
    };

    const quickSort = () => {
        const animations = [];
        const auxiliaryArray = array.slice();
        quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
        animateQuickSort(animations);
    };

    const quickSortHelper = (auxiliaryArray, low, high, animations) => {
        if (low < high) {
            const pivotIndex = partition(auxiliaryArray, low, high, animations);
            quickSortHelper(auxiliaryArray, low, pivotIndex - 1, animations);
            quickSortHelper(auxiliaryArray, pivotIndex + 1, high, animations);
        }
    };

    const partition = (auxiliaryArray, low, high, animations) => {
        const pivot = auxiliaryArray[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (auxiliaryArray[j] < pivot) {
                i++;
                [auxiliaryArray[i], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[i]];
                animations.push([i, j]);
            }
        }
        [auxiliaryArray[i + 1], auxiliaryArray[high]] = [auxiliaryArray[high], auxiliaryArray[i + 1]];
        animations.push([i + 1, high]);
        return i + 1;
    };

    const animateQuickSort = (animations) => {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [barOneIdx, barTwoIdx] = animations[i];
                setArray(prevArray => {
                    const newArray = prevArray.slice();
                    [newArray[barOneIdx], newArray[barTwoIdx]] = [newArray[barTwoIdx], newArray[barOneIdx]];
                    return newArray;
                });
            }, i * 10);
        }
    };

    const insertionSort = () => {
        const animations = [];
        const auxiliaryArray = array.slice();
        for (let i = 1; i < auxiliaryArray.length; i++) {
            let j = i;
            while (j > 0 && auxiliaryArray[j] < auxiliaryArray[j - 1]) {
                [auxiliaryArray[j], auxiliaryArray[j - 1]] = [auxiliaryArray[j - 1], auxiliaryArray[j]];
                animations.push([j, j - 1]);
                j--;
            }
        }
        animateInsertionSort(animations);
    };

    const animateInsertionSort = (animations) => {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [barOneIdx, barTwoIdx] = animations[i];
                setArray(prevArray => {
                    const newArray = prevArray.slice();
                    [newArray[barOneIdx], newArray[barTwoIdx]] = [newArray[barTwoIdx], newArray[barOneIdx]];
                    return newArray;
                });
            }, i * 10);
        }
    };

    return (
        <div className="sorting-visualizer">
            <div className="controls">
                <button onClick={resetArray}>Generate New Array</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button onClick={mergeSort}>Merge Sort</button>
                <button onClick={quickSort}>Quick Sort</button>
                <button onClick={insertionSort}>Insertion Sort</button>
            </div>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx} 
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SortingVisualizer;  
// add the stop button in the above code with enhanced styling 