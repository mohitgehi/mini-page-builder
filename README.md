
# Mini Page Builder

## Description

This project is built using React, Vite, Tailwind CSS, and Zustand for state management.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/mohitgehi/mini-page-builder.git`

2. Navigate to the project directory: `cd mini-page-builder`

3. Install the dependencies: `npm install`

## Running the Project

To run the project, use the command: `npm run dev`

## Documentation

Main logic of the app exists in the Home component. Add, edit, deletiton and syncing of the blocks is handled with the help of Zustand which is a state management library (Syncing with localstorage is also handled with Zustand). After getting the current layout from localstorage it is being rendered on the home component based on the type.

There is a button to export the current layout in json format.

## Built With

- React
- Tailwind CSS
- Zustand
- Vite
  