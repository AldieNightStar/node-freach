# ForEver ForEach FFreach
* Iterable Lib which also can `break`
* Iterates `object`'s keys and values
* Iterates `arrays` and `numbers`, and also `range` and `string` by each char
* No your special Iterator? Create one. Just make: `let iter = {isNext, next}` and call `foreach(iter, cb)`

# Install
```sh
npm install AldieNightStar/node-freach
```

# Usage | Samples
```js
// Import 
const { foreach, range, filterEach } = require("freach");

// =========================
// foreach(any, cb)
// =========================
// any - Any iterable object
// cb  - Callback(element, breakFunc)

// Iterable types
const arr = [1, 2, "Hello", 321, 444, 777, "Text", "Text2", "Text3"];
const rng = range(100, 200);
const obj = {a: 1, b: 2, c: 32, z: 1000};
const str = "This is my custom super-duper String"

// Iterator Object
// Will 10 times get number from 0 to 9
let inum = 0;

iter = {
	isNext: () => inum < 10,
	next: () => inum++
}

// Printer
// elem - Each element in iteration
// breakFunc - Function which breaks iteration
let out = (elem, breakFunc) => {
	console.log(elem);
}

// Calling forEach
foreach(arr, out)
foreach(rng, out)
foreach(str, out)
foreach(iter, out)

// Iterate over object
foreach(obj, o => {
	// o.key - is a KEY variable
	// o.val - is a VALUE function which returns value
	console.log(o.key, o.val())
})



// ======================
// What's about filter ?
// ---
// filterEach(any, fn, cb);
//    fn - filtering function. Returns boolean if value is right
//    cb - Callback(element, breakFunc)
// ======================

// Filter predicate
const onlyStrings = o => {
	return typeof o === "string"
}
const onlyNumbers = o => {
	return typeof o === "number"
}
const noSpaceBars = o => {
	return o !== " ";
}

// Filter call
filterEach(arr, onlyStrings, out)
filterEach(arr, onlyNumbers, out)
filterEach(str, noSpaceBars, out)

```