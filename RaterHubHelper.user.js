// ==UserScript==
// @name         RaterHubHelper
// @version      2.0.0
// @description  RaterHubHelper
// @author       JamesTGH
// @match        https://www.raterhub.com/*
// @updateURL    https://jamestgh.com/RaterHubHelper.meta.js
// @downloadURL  https://jamestgh.com/RaterHubHelper.user.js
// @require      https://code.jquery.com/jquery-3.6.4.min.js#sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=
// ==/UserScript==

$(document).ready(function() {
    // change the background colors and text colors for dark mode
    $('body, .container').css('background-color', '#888888');
    $('table.report th, table.details th, table.frame th, .ewok-buds-card h2').css({'background-color': '#666666', 'color': '#000000'});
    $('.ewok-editor-editable-columngroup.with-first-row-headers>tbody>tr:first-child, .ewok-buds-summary-section th, input[type="text"], textarea').css('background-color', '#777777');
    $('.ewok-buds-card, .ewok-buds-body #ewok-task-form>*:not(.ewok-buds):not(.clear):not(#hidden-fields):not(.not-ewok-buds-card)').css('background-color', '#666666');
    // check if your on a task webpage or homepage to append the start or end time on the title
    if (sessionStorage.getItem('starttaskTime') !== null && window.location.href.indexOf('?taskIds=') === -1) {
        $('title').append(' | ' + new Date(Number(sessionStorage.getItem('starttaskTime'))).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    $('span.ewok-estimated-task-weight').ready(function() {
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
            .append($('<b>').text('Start Task Time: ' + (new Date(Number(sessionStorage.getItem('starttaskTime'))).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).toString() + ' | '))
            .append($('<b>').text('Total Task Time: ' + Math.floor(workedMinutes / 60) + ':' + (workedMinutes % 60).toString().padStart(2, '0') + ' (' + (workedMinutes / 60).toFixed(2) + ')'))
        );
        // change the background color if you are within 10 seconds of the endtaskTime
        setInterval(function() {
            if (new Date().getTime() >= new Date(Number(sessionStorage.getItem('endtaskTime')) - 1e4)) {
                $('body, .container').css('background-color', '#A91B0D');
            };
        }, 1e3);
    });
});