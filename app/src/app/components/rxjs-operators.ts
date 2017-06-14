// adds ALL RxJS statics & operators to Observable
// we don't want to do this due to insane load times, instead, we pick and choose what we need.
// import 'rxjs/Rx';

// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators needed for THIS app.

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';
