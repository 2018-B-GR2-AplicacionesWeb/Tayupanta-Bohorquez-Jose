var rxjs = require('rxjs');
var numeros$ = rxjs.of(1, 2, 3, 4, 5, 6);
numeros$.subscribe(function (ok) {
    console.log('en ok', ok);
}, function (error) {
    console.log('error', error);
}, function () {
    console.log('complete');
});
