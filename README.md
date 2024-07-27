# Survey Form Application

## Description
A React-based survey form application that allows users to add, reorder, and remove questions dynamically. Users can also update question details and download their responses as a CSV file. The survey form now supports drag-and-drop reordering of questions for better organization.

## Contents
- [Survey Form Application](#survey-form-application)
  - [Description](#description)
  - [Contents](#contents)
  - [Features](#features)
  - [Screenshot](#screenshot)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)

## Features
- **Add Questions**: Add new questions to the survey form.
- **Reorder Questions**: Drag and drop questions to reorder them in the survey form.
- **Remove Questions**: Remove questions from the survey form.
- **Edit Questions**: Modify question text and options.
- **Submit and Download CSV**: Submit the form and download the responses as a CSV file.
- **Reset Form**: Reset the form to its initial state.

## Screenshot
Here is a screenshot of the survey form:
![Survey Form Screenshot](./src/assets/survey-form-screenshot.png)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/MikeMupararano/survey-form-app.git
    cd survey-form-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the application:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Add new questions by clicking "Add Question".
3. Reorder questions by dragging and dropping them into the desired position.
4. Edit question text and options as needed.
5. Click "Remove Question" to delete a question.
6. Click "Submit & Download CSV" to save the responses as a CSV file.
7. Click "Reset" to restore the form to its initial state.

## Credits
This project was developed using:
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [react-dnd](https://react-dnd.github.io/react-dnd/about) - Drag and Drop library for React.
- [react-dnd-html5-backend](https://github.com/react-dnd/react-dnd-html5-backend) - HTML5 backend for react-dnd.
- [PapaParse](https://www.papaparse.com/) - A powerful CSV library for JavaScript.
- [file-saver](https://github.com/eligrey/FileSaver.js) - File saving utility.

Developed by [Mike Thomas](https://github.com/Mikemupararano).
