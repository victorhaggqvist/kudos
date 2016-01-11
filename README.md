# Kudos

_A fork of https://github.com/masukomi/kudos_

Visually, this is just like the other Kudos. The difference is that is has no dependencies and written in vanilla js.

## Screenshots
Start ->
![pre-kudo](https://github.com/masukomi/kudos/raw/master/screenshots/zero_kudos.jpg)
-> Funky Animation Here->
![post-kudo](https://github.com/masukomi/kudos/raw/master/screenshots/kudo_given.jpg)
-> Finish.

## Demo
[here](http://masukomi.github.com/kudos/)

# Basic Usage:
See the index.html example for information

```html
<figure class="kudo kudoable" data-id="1">
    <a class="kudobject">
        <div class="opening">
            <div class="circle">&nbsp;</div>
        </div>
    </a>
    <a href="#kudo" class="count">
        <span class="num">0</span>
        <span class="txt">Kudos</span>
    </a>
</figure>
```

```js
new Kudoable('figure.kudoable');

document.addEventListener('kudo:added', function(e) {
    var kudoId = e.srcElement.dataset.id;

    // send the data to your server...
}, true);
```

## Events & Callbacks
After kudoing an object it will emit the following events:

1. `kudo:active` is sent when you hover over the object (the circle is growing)
2. `kudo:inactive` is sent when you mouse-off the object
3. `kudo:added` is sent when you successfully kudo something
4. `kudo:removed` is sent when you un-kudo something

### Cookie note
This implementation stores one cookie for every Kudo given. If someone Kudos everything you put out there you'll eventually hit the maximum number of cookies you're allowed to give them. Because dynamic cookie handling is as unique to your back end as the solution to how you'll keep track of the Kudos given to a thing, this demo-code does not address this limitation. Again, it's trivial enough to do, you just have to decide how you want to do it.

## Improvements
Make some!  ;)
The animation of the text isn't bad but could use some love from a css wizard. Pull-requests will be happily applied.

## jQuery
Nope, just js.

## License
This code is distributed under the MIT license. Portions of the CSS code are from the [wordpress-svbtle](https://github.com/scavone/wordpress-svbtle) Wordpress theme.
