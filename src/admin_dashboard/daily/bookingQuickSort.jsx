/* eslint-disable no-plusplus */
const swap = function swapElements(array, left, right) {
  const temp = array[left];
  array[left] = array[right];
  array[right] = temp;
};

const partition = function swapElementsAroundPivotPoint(array, leftIndex, rightIndex, pivot) {
  let left = leftIndex;
  let right = rightIndex;
  while (left <= right) {
    while (array[left].startTime < pivot) {
      left++;
    }
    while (array[right].startTime > pivot) {
      right--;
    }
    if (left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }
  return left;
};

const sort = function implementQuickSort(array, left, right) {
  if (left >= right) {
    return;
  }

  const pivot = array[Math.floor((left + right) / 2)].startTime;
  const partitionPoint = partition(array, left, right, pivot);
  sort(array, left, partitionPoint - 1);
  sort(array, partitionPoint, right);
};

const quicksort = function quickSortBookingsByStartTime(bookings) {
  sort(bookings, 0, bookings.length - 1);
};

export default quicksort;
