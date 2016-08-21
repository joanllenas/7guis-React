# 7guis - Temperature Converter (ReactJS + Mocha)

### Temperature Converter exercise
_from the [7guis wiki](https://github.com/eugenkiss/7guis/wiki#temperature-converter)_

> **Challenges**: working with bidirectional dataflow, working with user-provided text input
> 
> ![alt text](https://raw.githubusercontent.com/wiki/eugenkiss/7guis/images/tempconv.png)
> 
> The task is to build a frame containing two textfields *T<sub>C</sub>* and *T<sub>F</sub>* representing the temperature in Celsius and Fahrenheit, respectively. Initially, both *T<sub>C</sub>* and *T<sub>F</sub>* are empty. When the user enters a numerical value into *T<sub>C</sub>* the corresponding value in *T<sub>F</sub>* is automatically updated and vice versa. When the user enters a non-numerical string into *T<sub>C</sub>* the value in *T<sub>F</sub>* is *not* updated and vice versa. The formula for converting a temperature *C* in Celsius into a temperature *F* in Fahrenheit is `C = (F - 32) * (5/9)` and the dual direction is `F = C * (9/5) + 32`.
> 
> Temperature Converter increases the complexity of Counter by having a bidirectional dataflow between the Celsius and Fahrenheit value and the need to check the user input for validity. A good solution will make the bidirectional dependency very clear with minimal boilerplate code for the event-based connection of the two textfields.
> 
> Temperature Converter is inspired by the [Celsius/Fahrenheit converter from the book “Programming in Scala”](https://www.artima.com/pins1ed/gui-programming.html#32.4) but it is such a widespread example — sometimes also in the form of a currency converter — that one could give a thousand references if one liked to. The same is true for the Counter task.


### Install
Make sure you have node and npm installed, then run:

```bash
npm install
```

to install all dependencies.

### Run
You can build the project:

```bash
npm run build
```

which will generate the dist/bundle.js file, 
or run the development server:

```bash
npm run serve
```

which will create a server listening on [localhost port 8080](http://localhost:8080)

### Tests
You can run tests once:

```bash
npm test
```

or watch for all js, jsx file changes:

```bash
npm test:watch
```
