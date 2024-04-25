# RaterHubHelper

RaterHubHelper is a user script designed to enhance your experience on the RaterHub website. It provides additional functionality and improvements to make your tasks more efficient.

## Installation

To use RaterHubHelper, you need a user script manager extension installed in your web browser. Here are the steps to install the script:

1. Install a user script manager extension such as [Tampermonkey](https://www.tampermonkey.net/) (recommended) or [Greasemonkey](https://www.greasespot.net/).
2. Once the user script manager is installed, click on the following link to install the RaterHubHelper script: [RaterHubHelper.user.js](https://tm.jamestgh.com/RaterHubHelper.user.js).
3. The user script manager should recognize the script and prompt you to install it. Click the "Install" button to proceed.

## Usage

RaterHubHelper works automatically when you visit the RaterHub website (https://www.raterhub.com/). It provides the following features:

### Task Page Enhancement

- If you are on a task webpage or the homepage, RaterHubHelper appends the start time of the task to the page title. This helps you track the time spent on tasks.
- When a task page is loaded, RaterHubHelper calculates the estimated time for the task based on the "ewok-estimated-task-weight" value displayed on the page.
- RaterHubHelper sets the start time for working on tasks and stores it in the browser's sessionStorage.
- If the start time is not already set, RaterHubHelper initializes it and sets the end time to the same value.
- RaterHubHelper calculates the end time for the task by adding the average estimated time for each task to the start time.
- The calculated end time is displayed in the page title and the submit button.
- RaterHubHelper calculates the total amount of time spent on tasks and displays it at the bottom of the page, along with the start time and the task ID.

### Time Indicator

- RaterHubHelper changes the background color of the page to indicate when you are within 10 seconds of the task's end time. This serves as a visual reminder.

## Updates

RaterHubHelper may receive updates to improve its functionality or compatibility. To ensure you have the latest version, the script checks for updates automatically.

## Contributions

RaterHubHelper is developed by James Ruddick. Contributions to the project are welcome. If you encounter any issues or have suggestions for improvements, please create an issue on the [GitHub repository](https://github.com/jamesbruddick/RaterHubHelper).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
