# 7guis - Timer (ReactJS + Mocha)

### Timer exercise
_from the [7guis wiki](https://github.com/eugenkiss/7guis/wiki#timer)_

> **Challenges**: working with concurrency, working with competing user/signal interactions, keeping the application responsive
> 
> ![alt text](https://raw.githubusercontent.com/wiki/eugenkiss/7guis/images/timer.png)
> 
> The task is to build a frame containing a gauge *G* for the elapsed time *e*, a label which shows the elapsed time as a numerical value, a slider *S* by which the duration *d* of the timer can be adjusted while the timer is running and a reset button *R*. Adjusting *S* must immediately reflect on *d* and not only when *S* is released. It follows that while moving *S* the filled amount of *G* will (usually) change immediately. When *e ≥ d* is true then the timer stops (and *G* will be full). If, thereafter, *d* is increased such that *d > e* will be true then the timer restarts to tick until *e ≥ d* is true again. Clicking *R* will reset *e* to zero.
> 
> Timer deals with concurrency in the sense that a timer process that updates the elapsed time runs concurrently to the user's interactions with the GUI application. This also means that the solution to competing user and signal interactions is tested. The fact that slider adjustments must be reflected immediately moreover tests the responsiveness of the solution. A good solution will make it clear that the signal is a timer tick and, as always, has not much scaffolding.
> 
> Timer is directly inspired by the timer example in the paper [Crossing State Lines: Adapting Object-Oriented Frameworks to Functional Reactive Languages](http://cs.brown.edu/~sk/Publications/Papers/Published/ick-adapt-oo-fwk-frp/paper.pdf).


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
