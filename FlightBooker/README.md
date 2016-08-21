# 7guis - Flight Booker (ReactJS + Mocha)

### Flight Booker exercise
_from the [7guis wiki](https://github.com/eugenkiss/7guis/wiki#flight-booker)_

**Challenges**: working with constraints

> ![alt text](https://raw.githubusercontent.com/wiki/eugenkiss/7guis/images/bookflight.png)
> 
> The task is to build a frame containing a combobox *C* with the two options “one-way flight” and “return flight”, two textfields *T<sub>1</sub>* and *T<sub>2</sub>* representing the start and return date, respectively, and a button *B* for “submitting” the selected flight. *T<sub>2</sub>* is enabled iff *C*'s value is “return flight”. When *C* has the value “return flight” and *T<sub>2</sub>*'s date is strictly before *T<sub>1</sub>*'s then *B* is disabled. When a non-disabled textfield *T* has an ill-formatted date then *T* is colored red and *B* is disabled. When clicking *B* a message is displayed informing the user of his selection (e.g. “You have booked a one-way flight on 04.04.2014.”). Initially, *C* has the value “one-way flight” and *T<sub>1</sub>* as well as *T<sub>2</sub>* have the same (arbitrary) date (it is implied that *T<sub>2</sub>* is disabled).
> 
> The focus of Flight Booker lies on modelling constraints between widgets on the one hand and modelling constraints within a widget on the other hand. Such constraints are very common in everyday interactions with GUI applications. A good solution for Flight Booker will make the constraints clear, succinct and explicit in the source code and not hidden behind a lot of scaffolding.
> 
> Flight Booker is directly inspired by the [Flight Booking Java example in Sodium](http://blog.reactiveprogramming.org/?p=21) with the simplification of having textfields for date input instead of specialized date picking widgets as the focus of Flight Booker is not on specialized/custom widgets.


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
