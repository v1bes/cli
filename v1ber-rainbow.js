'use strict'
const chalk = require('chalk')
const ignoreChars = /[^!-~]/g

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

//settings
const theLimit = 9000000 // time it will run
let variance = 360

// set default visual mode
let visualMode =  'rainbow-single' // 'rainbow'// 'random-rainbow' 'rainbow-single' 'random-single-rainbow'

// TEXT
var inputText = 'v1ber fire v1ber fire v1ber fire v1ber fire v1ber fire1 v1ber vire v1ber wire v1ber fire'


function rainbow(string, offset) {
	if (!string || string.length === 0) {
		return string
	}

	const hueStep = 10 / string.replace(ignoreChars, '').length

	let hue = offset % 360;

	const characters = [];
	for (const character of string) {
		if (character.match(ignoreChars)) {
			characters.push(character)
		} else {
			// saturation
			characters.push(chalk.hsl(hue, 100, 50)(character))
			//characters.push(chalk.hsl(hue, 70, 30)(character));

			hue = (hue + hueStep) %  variance
		}
	}

	return characters.join('')
}


function mixWords(string){
	let arrBuffer = inputText.split(" ")
	let buffer =  shuffle(arrBuffer).join(' ');

	// if current terminal width > string length
	while ( process.stdout.columns > buffer.length+5) {
		buffer = buffer.concat(` ${arrBuffer[1]}`)
	}

 	return buffer
}


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1;
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}
	return array;
}


async function animateString(string, theLimit) {
	console.log()
	for (let i = 0; i < (1000 * theLimit); i++) {
		let text = string
		if (visualMode == 'rainbow') console.log(rainbow(string, i))
		if (visualMode == 'rainbow-single') console.log('\u001B[1F\u001B[G', rainbow(string,i))
		
		if (visualMode == 'rainbow-single-random') console.log('\u001B[1F\u001B[G', rainbow(mixWords(string),i))
		if (visualMode == 'rainbow-random') console.log(rainbow(mixWords(string), i))

		await delay(10);
	}
}

// catch bash arguments
if(process.argv[2]){
	visualMode = process.argv[2]
}
if(process.argv[3]){
	inputText = process.argv[3]
}


(async () => {
	console.log()
	await animateString(inputText, theLimit)
	console.log()
})();

