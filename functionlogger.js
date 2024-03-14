// ==UserScript==
// @name         Game Reversing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to trigger function interception in Unity online games
// @author       CE.OG
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function interceptFunctions(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'function') {
                let originalFunc = obj[key];
                obj[key] = function(...args) {
                    console.log(`Function called: ${key}`);
                    return originalFunc.apply(this, args);
                };
            }
        }
    }

    // Function to create the button and attach event listener
    function createButton() {
        const button = document.createElement('button');
        button.textContent = 'Get Functions';
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.addEventListener('click', function() {
            interceptFunctions(window); // Intercept functions when button is clicked
        });
        document.body.appendChild(button);
    }

    // Call the createButton function
    createButton();

})();
