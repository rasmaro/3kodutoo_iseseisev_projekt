function createGraphs(data) {
	let oWords = {};
	let oLetters = {
	    "a": 0,
	    "b": 0,
	    "c": 0,
	    "d": 0,
	    "e": 0,
	    "f": 0,
	    "g": 0,
	    "h": 0,
	    "i": 0,
	    "j": 0,
	    "k": 0,
	    "l": 0,
	    "m": 0,
	    "n": 0,
	    "o": 0,
	    "p": 0,
	    "q": 0,
	    "r": 0,
	    "s": 0,
	    "t": 0,
	    "u": 0,
	    "v": 0,
	    "w": 0,
	    "x": 0,
	    "y": 0,
	    "z": 0
	};

	let sTextToLower = data.toLowerCase();

	let aWords = sTextToLower.split(" ");
	let aChars = sTextToLower.split("");

	//Count the letters in text
	aChars.forEach(function (sChar) {
	    if(oLetters[sChar] !== undefined) {
		oLetters[sChar] += 1;
	    }
	});

	//Count the words in the text
	aWords.forEach(function (sWord) {
	    if (!oWords[sWord]) {
		oWords[sWord] = 1;
	    } else {
		oWords[sWord] += 1;
	    }
	});

	let aCharArray = [];
	let aWordArray = [];

	// Make object with key value pairs into array of objects
	Object.entries(oLetters).forEach(([key, value]) => {
	    let oItem = {Letter: key, Amount: value};
	    aCharArray.push(oItem);
	});

	Object.entries(oWords).forEach(([key, value]) => {
	    let oItem = {Word: key, Amount: value};
	    aWordArray.push(oItem);
	});

	// sort by value
	aWordArray.sort(function (a, b) {
	    return a.Amount - b.Amount;
	});

	console.log(aWordArray);
	//Get top 5 words by amount

	let iArrayLength = aWordArray.length;

	let aTopWords = [];

	for (let i=0; i<5; i++) {
	    aTopWords.push(aWordArray[iArrayLength - (i + 1)]);
	};

        let lettersInWord = [];


        aWordArray.forEach(function(element){
          lettersInWord.push(element.Word.length);
        });

	let counts = {};
	let countsCounts = [];

	for (let i = 0; i < lettersInWord.length; i++) {
	  let num = lettersInWord[i];
	  counts[num] = counts[num] ? counts[num] + 1 : 1;
	}
	for (let [key, value] of Object.entries(counts)) {
	  countsCounts.push(value);
	}

	let uniqueLettersInWord = lettersInWord.filter((v, i, a) => a.indexOf(v) === i);
	let uniqueLettersInWordSorted = uniqueLettersInWord.sort(function(a, b){return a - b});

	let barChartLabels = [];
	let barChartData = [];

        aCharArray.forEach(function(element){
          barChartLabels.push(element.Letter);
	  barChartData.push(element.Amount);
        });

	let pieChartLabels = [];
	let pieChartData = [];

        aTopWords.forEach(function(element){
          pieChartLabels.push(element.Word);
	  pieChartData.push(element.Amount);
        });

        console.log(aTopWords);
console.log(countsCounts);
        console.log(aCharArray);
        console.log(lettersInWord);

  var ctx = document.getElementById('myChart').getContext('2d');
  var cty = document.getElementById('myChart2').getContext('2d');
  var ctz = document.getElementById('myChart3').getContext('2d');

  var myBarchart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
	labels: barChartLabels,
      datasets: [{
        label: 'Amount of Letters in a text',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
	data: barChartData,
      }]
    },

    // Configuration options go here
    options: {}
  });
  var myPieChart = new Chart(cty, {
type: 'pie',
data:{
	labels: pieChartLabels,
  datasets: [{
    label: 'Popular Words',
    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    borderColor: 'rgb(192, 192, 192)',
	data: pieChartData,
    }]
  },
    layout: {
        padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        }

});
var myLinechart = new Chart(ctz, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
	labels: uniqueLettersInWord,
      datasets: [{
        label: 'Word lenghts',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
	data: countsCounts,
      }]
    },

    // Configuration options go here
    options: {}
  });

}


let openFile = function(event) {
	let that = this;
	let input = event.target;

	let reader = new FileReader();

	reader.onload = function(){
	    that.createGraphs(reader.result);
	};
	reader.readAsText(input.files[0]);
};
