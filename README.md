# Recoil

![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)
![apm](https://img.shields.io/badge/Node-10.2.1-brightgreen.svg?&style=flat-square)
![apm](https://img.shields.io/apm/l/vim-mode.svg?style=flat-square)

### Run demo

The `index.html` located in the root dir is a sample application using recoil.

```Bash
$npm start
```

### Features

Recoil is a light-weight library for building user interfaces using the concept of ReactJs virtual DOM. This implementation is not much effective as react. The main intenson of this lib is to understand how react's virtual DOM works and also a periodical approach to the core concepts of an efficient, declarative user interface library.

* Diffing
* Memoization
* Virtual DOM
* Supports expansion of custom elements.

### Understanding virtual DOM

* A virtual DOM object is a representation of a DOM object, like a clone.
* DOM manipulation is a slow process, at the same time virtual DOM is much faster to render UI elements.
* Each DOM nodes can be updated independently.
* Incredibly efficient
* Using virtual DOM with the latest version, We can figure out exactly which DOM objects have changed. This is called `diffing`.

### Virtual DOM elements

WIP
...

### Licence

##### The MIT License (MIT) See LICENSE

Copyright (c) 2018, Amal Shehu
