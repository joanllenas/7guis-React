# 7guis - CRUD (ReactJS + Redux + Mocha)

### CRUD exercise
_from the [7guis wiki](https://github.com/eugenkiss/7guis/wiki#crud)_

> **Challenges**: separating the domain and presentation logic, managing mutation, building a non-trivial layout
> 
> ![alt text](https://raw.githubusercontent.com/wiki/eugenkiss/7guis/images/crud.png)
> 
> The task is to build a frame containing the following elements: a textfield *T<sub>prefix</sub>*, a pair of textfields *T<sub>name</sub>* and *T<sub>surname</sub>*, a listbox *L*, buttons *B<sub>C</sub>*, *B<sub>U</sub>* and *B<sub>D</sub>* and the three labels as seen in the screenshot. *L* presents a view of the data in the database that consists of a list of names. At most one entry can be selected in *L* at a time. By entering a string into *T<sub>prefix</sub>* the user can filter the names whose surname start with the entered prefix — this should happen immediately without having to submit the prefix with enter. Clicking *B<sub>C</sub>* will append the resulting name from concatenating the strings in *T<sub>name</sub>* and *T<sub>surname</sub>* to *L*. *B<sub>U</sub>* and *B<sub>D</sub>* are enabled iff an entry in *L* is selected. In contrast to *B<sub>C</sub>*, *B<sub>U</sub>* will not append the resulting name but instead replace the selected entry with the new name. *B<sub>D</sub>* will remove the selected entry. The layout is to be done like suggested in the screenshot. In particular, *L* must occupy all the remaining space.
> 
> CRUD (Create, Read, Update and Delete) represents a typical graphical business application which arguably constitutes the lion's share of all GUI applications ever written. The primary challenge is the separation of domain and presentation logic in the source code that is more or less forced on the implementer due to the ability to filter the view by a prefix. Traditionally, some form of MVC pattern is used to achieve the separation of domain and presentation logic. Also, the approach to managing the mutation of the list of names is tested. A good solution will have a good separation between the domain and presentation logic without much overhead (e.g. in the form of toolkit specific concepts or language/paradigm concepts), a mutation management that is fast but not error-prone and a natural representation of the layout (layout builders are allowed, of course, but would increase the overhead).
> 
> CRUD is directly inspired by the crud example in the blog post [FRP - Three principles for GUI elements with bidirectional data flow](http://apfelmus.nfshost.com/blog/2012/03/29-frp-three-principles-bidirectional-gui.html).


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
