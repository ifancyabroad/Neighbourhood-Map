# Felixstowe Food
## About
### Description
This is an app showing a **map of my local neighbourhood** with markers to display all the **food venues** within a thousand metres from the centre. Information on each venue is displayed in the form of an infowindow when the marker is selected, from here the user can see the **name, address and any available photos** of the venue. Venues can all be **filtered** from the search box in the UI.

### Origins
The app was created as part of the _Udacity_ Front-End Nanodegree course. It was created from scratch using the _Google Maps_ API and collecting data from the _Foursquare_ API. Any functions that originated from other sources have been credited in the comments of `app.js`.

### Process
Some the **challenges** faced while developing the application are as follows:
- Using the _Google Maps_ API to create an interactive map
- Collecting data from a third party API and displaying it to the user
- Using the _Knockout_ library to effectively separate the DOM from the model
- Creating a search function that updates instantly
- Handling errors from **AJAX** requests

### Dependencies
- [Google Maps API](https://developers.google.com/maps/)
- [Foursquare API](https://developer.foursquare.com/)
- [Knockout JS](http://knockoutjs.com/)
- [Font Awesome](http://fontawesome.io/)
- [Google Fonts](https://fonts.google.com/)

## Installation
To install the app simply clone/download this repository and open index.html in your browser or alternatively it can be accessed at the following [GitHub page](https://ifancyabroad.github.io/Neighbourhood-Map/).

## Instructions
### UI
The UI will be open by default, it includes a search box and a list of all the available food venues in the local area. In order to use the search function simply begin typing into the input box, the venues will be automatically filtered to only the ones whose name include what is typed in the search field. To close the UI simply click on the hamburger/menu icon.

### Map
The map is centred on the town of _Felixstowe_ in the UK and displays markers for food venues within 1000 metres of the centre which correspond to the venues listed in the UI. Selecting a marker will highlight it and display it's name, address and a photo (if available). Only one marker may be highlighted at a time and selecting another will automatically close the previous one. Markers will also be hidden if they are filtered out by the search in the UI.

## Licence
### MIT License

Copyright (c) 2017 Edgar Nightingale

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.