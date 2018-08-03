# Neighbourhood map

Here is the eight and last project of Udacity FEND track.
The goal of this project was to design from scratch neighbourhood map.
The project shows 6 interesting locations in Wroclaw. You can:
- search place in filter bar
- click on the list/pin to see photo and short summary of given place (provieded by Wikipedia)

## How to run it?

Git clone or download zip on your computer. Run the terminal. Write npm install and then npm start. The project will launch and you can see it on your browser(at the address: localhost:3000).

## Structure
```
App.js
Folder components
- Folder data
-- data.js
SearchPlaces.js
WikiImage.js
WikiText.js

```

## Additional notes

- This project is written in REACT.
- The project uses Google Maps API (keep in mind to use your very own api key to run it).
- The project uses also MediaWikiAPI to fetch additional information such as photos or short text.
