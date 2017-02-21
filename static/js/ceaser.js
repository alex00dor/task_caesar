'use strict';

// Define the `phonecatApp` module
var ceaserApp = angular.module('ceaserApp', ['googlechart']);

ceaserApp.controller("MainController", function ($scope, $http) {
    $scope.ErrorText = "";
    $scope.showErrorMessage = false;
    $scope.showMessage = false;
    $scope.enterText = "";
    $scope.resultText = "";
    $scope.crackStep = 0;
    $scope.rot = '';
    $scope.Encrypt = function Encrypt(str, rot) {
        if (isFinite(rot) && str != '' && rot != '') {
            $http({
                method: 'GET',
                url: '/api/encrypt/?string=' + str + '&rot=' + rot
            }).then(function (response) {
                $scope.showErrorMessage = false;
                $scope.resultText = response.data.encrypt;
            }, function (response) {
                $scope.ErrorText = "We have problems with internet. Check your internet connection, please.";
                $scope.showErrorMessage = true;
            });
        }else{
            $scope.ErrorText = "Step can only be number and cannot be empty. Enter text cannot be empty.";
            $scope.showErrorMessage = true;
        }
    };

    $scope.Decrypt = function Decrypt(str, rot) {
        if (isFinite(rot) && str != '') {
            $http({
              method: 'GET',
              url: '/api/decrypt/?string='+str+'&rot='+rot
            }).then(function (response){
                $scope.showErrorMessage = false;
                $scope.resultText = response.data.decrypt;
            },function (response){
                $scope.ErrorText = "We have problems with internet. Check your internet connection, please.";
                $scope.showErrorMessage = true;
            });
        }else{
            $scope.ErrorText = "Step can only be number and cannot be empty. Enter text cannot be empty.";
            $scope.showErrorMessage = true;
        }
    };

    $scope.ChangeChart = function ChangeChart(enterText) {
        $scope.LettersChart.data = {"cols": [
        {id: "t", label: "Latter", type: "string"},
        {id: "s", label: "Frequency", type: "number"}
    ], "rows": $scope.geChartRows(enterText)
    };
    };

    $scope.geChartRows = function geChartRows(enterText)
    {
        enterText = enterText.toLowerCase();
        var len_freq = 0;
        var alphabet = 'abcdefghijklmnopqrstuvwxyz';
        var countLetters = [];
        for (var i = 0; i<alphabet.length; i++){
            countLetters.push(0);
        }

        for (i = 0; i<enterText.length; i++){
            if (alphabet.indexOf(enterText[i]) != -1){
                countLetters[alphabet.indexOf(enterText[i])]++;
                len_freq++;
            }
        }

        var rows = [];
        for (i = 0; i<alphabet.length; i++){
            rows.push({
                c: [
                    {v: alphabet[i]},
                    {v: countLetters[i]/len_freq}
                ]
            })
        }
        return rows
    };
    $scope.LettersChart = {};
    $scope.LettersChart.type = "ColumnChart";
    $scope.LettersChart.data = {"cols": [
        {id: "t", label: "Latter", type: "string"},
        {id: "s", label: "Frequency", type: "number"}
    ], "rows": $scope.geChartRows($scope.enterText)
    };

    $scope.LettersChart.options = {
        'title': 'The frequency of letters'
    };

    $scope.crackCipher = function crackCipher(str) {
        str = str.toLowerCase();
        var max = 0;
        var alphabet = 'abcdefghijklmnopqrstuvwxyz';
        var weight = [6.51, 1.89, 3.06, 5.08, 17.4,
                      1.66, 3.01, 4.76, 7.55, 0.27,
                      1.21, 3.44, 2.53, 9.78, 2.51,
                      0.29, 0.02, 7.00, 7.27, 6.15,
                      4.35, 0.67, 1.89, 0.03, 0.04, 1.13];

        var countLetters = [];
        var sLetters = [];

        for (var i = 0; i< alphabet.length; i++){
            countLetters.push(0);
            sLetters.push(0);
        }

        for (i = 0; i<str.length; i++){
            if (alphabet.indexOf(str[i]) != -1){
                countLetters[alphabet.indexOf(str[i])]++;
            }
        }

        for (i = 0; i<alphabet.length; i++) {
            for (var j = 0; j<alphabet.length; j++) {
                sLetters[i] += 0.01 * countLetters[j] * weight[(j + i) % 26];
                if (max < sLetters[i]){
                    max = sLetters[i];
                }
            }
        }

        $scope.crackStep = (26 - sLetters.indexOf(max)) % 26;
        $scope.showMessage = true;
    };

    $scope.swap = function swap() {
        var temp = $scope.enterText;
        $scope.enterText = $scope.resultText;
        $scope.resultText = temp;
    };
});