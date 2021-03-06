# MobileWebPcControl

Simulate a keyboard on the PC using a mobile web browser.

## Installation

- Install [Node](https://nodejs.org/).
- Clone this repository and then run:
```
npm install
```
- Copy the `configuration` directory into `build`, and customize it to your needs.

## Usage

Run `node build/server/web.js` or `npm start`.
Then, in the web browser, visit the site on port 3001.

The port can be changed by setting the environment variable `PORT`.

To type an accented letter, touch its base character for 200 milliseconds.

## Configuration

All screens and keyboards are in files named following the pattern **build/configuration/screen.*.html**.
Missing accented letters may be added by editing the file **build/configuration/screen.diacritics.html**.

Sounds and vibrations can be disabled by editing the file **build/configuration/configuration.js**.

Screen and touch animations can be customized, or entirely disabled, by editing the file **build/browser/index.css**.

When to enter full screen mode can be defined in **build/browser/index.js**.

## Screenshots

![The first screen: the lower case alphabet](README/alphabet-lowercase.png)

![Screen for typing Esperanto letters](README/alphabet-esperanto.png)

## TypeScript

To rebuild all files in the `build` directory:
```
npm run build
```
The `configuration` directory must be copied manually.

## uinput (Linux)

To discover the uinput keycodes, on the console, type `dumpkeys | grep ^keycode`.
