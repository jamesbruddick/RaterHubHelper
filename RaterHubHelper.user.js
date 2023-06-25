// ==UserScript==
// @name         RaterHubHelper
// @version      2.1.1
// @description  RaterHubHelper
// @author       JamesTGH
// @match        https://www.raterhub.com/*
// @updateURL    https://tm.jamestgh.com/RaterHubHelper.meta.js
// @downloadURL  https://tm.jamestgh.com/RaterHubHelper.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js#sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==
// ==/UserScript==

$(document).ready(function() {
    // check if your on a task webpage or homepage to append the start or end time on the title
    if (sessionStorage.getItem('starttaskTime') !== null && window.location.href.indexOf('?taskIds=') === -1) {
        $('title').append(' | ' + new Date(Number(sessionStorage.getItem('starttaskTime'))).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    if ($('span.ewok-estimated-task-weight').length) {
        // set the start time for working on tasks
        let starttaskTime = new Date(Math.round(new Date().getTime() / 6e4) * 6e4).getTime();
        // if start time doesn't exist reset sessionStorage starttaskTime and endtaskTime
        if (sessionStorage.getItem('starttaskTime') === null) {
            sessionStorage.setItem('starttaskTime', starttaskTime);
            sessionStorage.setItem('endtaskTime', starttaskTime);
        };
        // retrieve and parse the average estimated time into a usable variable
        let aetMinutes = $('span.ewok-estimated-task-weight').text().match(/\d+\.\d+|\d+/g).map(Number).pop();
        // calculate the endtaskTime by adding the average estimated time for each task to endtaskTime
        let endtaskTime = new Date(Math.round(new Date(Date.now() + aetMinutes*6e4).getTime() / 6e4) * 6e4);
        // push the calculated endtaskTime to sessionStorage endtaskTime
        sessionStorage.setItem('endtaskTime', endtaskTime.getTime());
        // input the endtaskTime into the title and submit button
        $('title').append(' | ' + endtaskTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        $('button#ewok-task-submit-button').text(endtaskTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        // calculate the number of minutes worked between starttaskTime and endtaskTime
        let workedMinutes = Math.abs(new Date(Number(sessionStorage.getItem('starttaskTime'))).getTime() - new Date(Number(sessionStorage.getItem('endtaskTime')))) / 6e4;
        // display the starttaskTime and the total amount of time doing tasks at the bottom next to the buttons
        $("div.button-group").append($('<div>')
            .append($('<b>').text('Started Working Time: ' + (new Date(Number(sessionStorage.getItem('starttaskTime'))).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).toString() + ' | '))
            .append($('<b>').text('Total Worked Time: ' + Math.floor(workedMinutes / 60) + ':' + (workedMinutes % 60).toString().padStart(2, '0') + ' (' + (workedMinutes / 60).toFixed(2) + ') | '))
            .append($('<b>').text('Task ID: ' + window.location.href.split('=')[1]))
        );
        // change the background color if you are within 10 seconds of the endtaskTime
        setInterval(function() {
            if (new Date().getTime() >= new Date(Number(sessionStorage.getItem('endtaskTime')) - 1e4)) {
                $('body, .container').css('background-color', '#A91B0D');
            };
        }, 1e3);
    };
});