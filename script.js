//const n = 20;
const array = [];
let sign = prompt("What size would you like your array to be?");

const n = sign;
init();

let audioCtx = null;

function playNote(freq){
    if(audioCtx==null){
        audioCtx = new (
            AudioContext ||
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function arraysize(){
    return array.length;
}


function init(){
// Filling the array with random numbered elements
    for(let i =0; i<n; i++){
        array[i] = Math.random();
    }
    showBars();
}

function bubblePlay(){
    const copy = [...array];
    const swaps = bubbleSort(copy);
    //showBars();
    animate(swaps);
}

function selectionPlay(){
    const copy = [...array];
    const swaps = selectionSort(copy);
    //showBars();
    animate(swaps);
}

function insertionPlay(){
    const copy = [...array];
    const swaps = insertionSort(copy);
    //showBars();
    animate(swaps);
}

function combPlay(){
    const copy = [...array];
    const swaps = combSort(copy);
    //showBars();
    animate(swaps);
}

function animate(swaps){
    if(swaps.length == 0){
        return;
    }
    //takes first element out of swap
    const [i,j] = swaps.shift();
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    //linear interpolation to play frequency
    playNote(200 + array[i]*500)
    showBars([i,j]);
    setTimeout(function(){
        animate(swaps);
        }, 75);
}

//BUBBLE SORT
function bubbleSort(array){
    const swaps = [];
    do {
        var swapped = false;
        for(let i =0; i< array.length; i++){
            if(array[i-1] > array[i]){
                swapped = true;
                swaps.push([i-1, i]);
                var temp = array[i-1];
                array[i-1] = array[i];
                array[i] = temp;
            }
        }
    }while(swapped)
    return swaps;
}

function selectionSort(array){
    const swaps = [];
    //to find min

    for(let i =0; i<array.length; i++){
        let min = array[i];
        let min_index = i;

        for(let j = i+1; j<array.length; j++){
            if(array[j] < min){
                min = array[j];
                min_index = j;
            }
        }
        if(min_index !== i){
            swaps.push([min_index, i])
            let temp = array[i];
            array[i] = array[min_index];
            array[min_index] = temp;
        }
    }
    return swaps;
}

function insertionSort(array){
    const swaps = [];
    for (let i = 1; i < array.length; i++) {
      let j = i;
      while (j > 0 && array[j] < array[j - 1]) {
        swaps.push([j, j - 1]);
        let temp = array[j];
        array[j] = array[j - 1];
        array[j - 1] = temp;
        j--;
      }
    }
    return swaps;
  }

  function combSort(array) {
    const swaps = [];
    let gap = array.length;
    let swapped = true;
  
    while (gap > 1 || swapped) {
      gap = Math.floor(gap / 1.3);
      if (gap < 1) {
        gap = 1;
      }
  
      let i = 0;
      swapped = false;
  
      while (i + gap < array.length) {
        if (array[i] > array[i + gap]) {
          swaps.push([i, i + gap]);
          let temp = array[i];
          array[i] = array[i + gap];
          array[i + gap] = temp;
          swapped = true;
        }
        i++;
      }
    }
    return swaps;
  }

// console.log(array);
// Making the array as bars dependent on value.
function showBars(indices){
    container.innerHTML = "";
    for(let i =0; i<array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        // bar.style.width = "10px";
        // bar.style.backgroundColor = "black";
        //Instead of top 2, we can just do BELOW
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}