'use strict';

var langs = [ 'en', 'ru', 'ua' ];
var pages = [ 'home', 'goals', 'diag', 'treatment', 'patient', 'contacts' ];

var ulang = (navigator.language || navigator.browserLanguage).split('-')[0];
if (langs.indexOf(ulang) == -1) ulang = 'ua';

var translations = {
	ru: [ 'Начало', 'Цели', 'Диагностика', 'Лечение', 'Памятка', 'Контакты' ],
	ua: [ 'Головна', 'Мета', 'Діагностика', 'Лікування', "Пам'ятка", 'Контакти' ],
	en: [ 'Home', 'Aims', 'Diagnostic', 'Treatment', 'Memo', 'Contacts' ]
};

var app = angular.module('mainApp', ['ngRoute']);

app.config(function ($routeProvider) {
	var llen = langs.length, plen = pages.length;
	for (var i = 0; i < llen; i++) {
		var lang = langs[i], path = '/' + lang, page = 'pages/' + lang;

		for (var j = 0; j < plen; j++) {
			$routeProvider.when(path + '/' + pages[j], { templateUrl: page + '/' + pages[j] +'.html', controller: 'mainCtrl' });
		}
	}

	$routeProvider.otherwise({ redirectTo: '/' + ulang + '/home' });
});

function translate(lang) {
	var names = translations[lang];
	return [
	        { id: 'home', name: names[0]},
	        { id: 'goals', name: names[1]},
	        { id: 'diag', name: names[2]},
	        { id: 'treatment', name: names[3]},
	        { id: 'patient', name: names[4]},
	        { id: 'contacts', name: names[5]}
	        ];
}

app.controller('mainCtrl', function($scope, $location) {
	var path = $location.path();

	$scope.langs = langs;
	$scope.currentLang = path == "" ? ulang : path.substr(1, path.indexOf('/', 1) - 1);
	$scope.onLangSelected = function(lang) {
		$scope.currentLang = lang;
		$scope.pages = translate(lang);
	}

	$scope.pages = translate($scope.currentLang);

	$scope.currentPage = $scope.pages[path == "" ? 0 : pages.indexOf(path.substr(path.indexOf('/', 1) + 1))].id;
	$scope.onPageSelected = function(page) {
		$scope.currentPage = page.id;
	}
});