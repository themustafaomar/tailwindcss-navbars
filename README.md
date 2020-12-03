## Getting started
Install the plugin via `npm` 

```bash
npm install tailwindcss-navbars
```

#### Register the plugin
Register the `tailwindcss-navbars` plugin by adding it within your `tailwind.config.js` as below.

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-navbars'),
  ]
}
```

## Options
The `tailwindcss-navbars` plugin comes with simple options to control the bundle size by removing unnecessary code blocks we don't want to add extra code in production without any benefits.

### Links
You may want to control the link color and hover color state as well, here is `links` object comes in.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      customizeNavbar: theme => ({
        options: {
          links: {
            color: '#000', // Tip: if you want to inherit color from the parent (may be the body) set color equals to `false`
            hoverColor: '#66f',
          },
        },
      })
    }
  }
}
```

### Expand breakpoints
This option makes the plugin create expand breakpoints for you for example:

By appling the below code it will create two breakpoint classes one for `.navbar-expand-sm` and one for `.navbar-expand-md` you can use one of them to expand the navbar in a certain screen.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      customizeNavbar: theme => ({
        options: {
          expandBreakpoints: {
            allow: ['sm', 'md'], // Default is ['sm', 'md']
            exclude: [], // default is []
          },
        },
      })
    }
  }
}
```

Another example: this will generate `.navbar-expand-sm`, `.navbar-expand-md` and `.navbar-expand-lg`
```js
module.exports = {
  // ...
  expandBreakpoints: {
    allow: '*', // You can use the wildcard `*` to create expand classes for all screens.
    // Notice that exclude has the priority over `allow`
    // This means in this case `xl` and `2xl` will be excluded
    exclude: ['xl', '2xl'],
  },
  // ...
}
```

### Dropdown options
There're two types of dropdown menus `hoverable` and `clickable`

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      customizeNavbar: theme => ({
        options: {
          dropdowns: {
            animation: true, // This enables the dropdown animation default is `false`
            defaultActiveClass: 'active', // Set the default active class, default is `active`
          },
        },
      })
    }
  }
}
```

#### Hoverable dropdowns
By default the dropdowns work with `hover`

```html
<nav class="navbar navbar-expand-md">
  <div class="container">
    <div class="navbar-brand">
      <h5>AwesomeLogo</h5>
    </div>
    <button class="navbar-toggler">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="navbar-collapse">
      <ul class="navbar-items ml-auto">
        <li><a href="#" class="nav-link">Link</a></li>
        <li class="dropdown">
          <a href="#" class="nav-link"></a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="">Dropdown link</a>
            <a class="dropdown-item" href="">Other dropdown link</a>
            <a class="dropdown-item" href="">Separated link</a>
            <a class="dropdown-divider" href="#"></a>
            <a class="dropdown-item" href="">One more</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

#### Clickable dropdowns
`Clickable` dropdowns needs some lines of Javascript to work and thankfully we've created this code for you, you just need to import this file in your project.

```js
// app.js for example.
import 'tailwindcss-navbars/src/client/navbar.js'

// ...
```