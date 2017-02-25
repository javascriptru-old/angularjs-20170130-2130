//-------------------------------------------
//----------------ng-show--------------------
//-------------------------------------------

let observerNgShow = [];
let configNgShow = { attributes: true };
let ngShowElem = document.querySelectorAll('[ng-show]');

ngShowElem.forEach((item, index) => {
	observerNgShow.push(
		new MutationObserver((mutations) => {
			mutations.forEach(function(mutation) {
				if(mutation.attributeName != 'ng-show') return;

			    let valueAttr = eval(mutation.target.getAttribute(mutation.attributeName));
			    if(valueAttr)       mutation.target.style.display = '';
			    else if(!valueAttr) mutation.target.style.display = 'none';
		  	});  
		})
	);
	observerNgShow[index].observe(item, configNgShow);
	item.setAttribute('ng-show', item.getAttribute('ng-show'));
});

//-------------------------------------------
//-------------example ng-show---------------
//-------------------------------------------

document.querySelectorAll('button[name="show"]').forEach( function(item) {
	item.onclick = () => {
		ngShowElem[0].setAttribute('ng-show', event.target.value);
	}
});

document.querySelectorAll('button[name="show2"]').forEach( function(item) {
	item.onclick = () => {
		ngShowElem[1].setAttribute('ng-show', event.target.value);
	}
});

//-------------------------------------------
//----------------ng-hide--------------------
//-------------------------------------------

let observerNgHide = [];

let configNgHide = { attributes: true };
let ngHide = document.querySelectorAll('[ng-hide]');

ngHide.forEach((item, index) => {
	observerNgHide.push(
		new MutationObserver((mutations) => {
			mutations.forEach(function(mutation) {
				if(mutation.attributeName != 'ng-hide') return;

			    let valueAttr = eval(mutation.target.getAttribute(mutation.attributeName));
			    if(!valueAttr)       mutation.target.style.display = '';
			    else if(valueAttr) mutation.target.style.display = 'none';
		  	});  
		})
	);
	observerNgHide[index].observe(item, configNgHide);
	item.setAttribute('ng-hide', item.getAttribute('ng-hide'));
});

//-------------------------------------------
//-------------example ng-hide---------------
//-------------------------------------------

document.querySelectorAll('button[name="hide"]').forEach( function(item) {
	item.onclick = () => {
		ngHide[0].setAttribute('ng-hide', event.target.value);
	}
});

document.querySelectorAll('button[name="hide2"]').forEach( function(item) {
	item.onclick = () => {
		ngHide[1].setAttribute('ng-hide', event.target.value);
	}
});

//-------------------------------------------
//----------------ng-click-------------------
//-------------------------------------------

document.body.addEventListener('click', () => {
	target = event.target;

	if(!target.getAttribute('ng-click')) return;

	(new Function('event', `$event = this.event; return ${target.getAttribute('ng-click')}`))();
});

//-------------------------------------------
//------------example ng-click---------------
//-------------------------------------------

var extAngle = 0;
function toFlip(event, angle) {
	extAngle += angle;
	event.target.style.transform = 'rotate(' + extAngle + 'deg)';
}

//-------------------------------------------
//-----------------ng-model------------------
//-------------------------------------------

document.body.addEventListener('input', function model() {
	let target = event.target;

	if(!target.getAttribute('ng-model')) return;

	$names[target.getAttribute('ng-model')] = target.value;
});

document.body.addEventListener('change', function model() {
	let target = event.target;

	if(!target.getAttribute('ng-model')) return;

	if(target.type == 'checkbox') $names[target.getAttribute('ng-model')] = target.checked;
});

//-------------------------------------------
//-----------------ng-change-----------------
//-------------------------------------------

document.body.addEventListener('input', function change() {
	let target = event.target;

	if(!target.getAttribute('ng-change')) return;
	if(!target.getAttribute('ng-model')) console.log('Использование "ng-change" без "ng-model" невозможно');

	(new Function('event, modelName', `$event = this.event; $modelName = target.getAttribute('ng-model'); return ${target.getAttribute('ng-change')}`))();
});


document.body.addEventListener('change', function change() {
	let target = event.target;

	if(!target.getAttribute('ng-change')) return;
	if(!target.getAttribute('ng-model')) console.log('Использование "ng-change" без "ng-model" невозможно');
	if(target.getAttribute('type') == 'text') return;

	(new Function('event, modelName', `$event = this.event; $modelName = target.getAttribute('ng-model'); return ${target.getAttribute('ng-change')}`))();
});

//-------------------------------------------
//------------example ng-change--------------
//-------------------------------------------

let timerTimeout;
function alertThrough1sec(name) {
	clearTimeout(timerTimeout);
	timerTimeout = setTimeout(() => {alert($names[name]);}, 1000);	
};

function alertCheck(modelname) {
	alert($names[modelname]);
}

//-------------------------------------------
//------------------$names-------------------
//-------------------------------------------

class $names {
}