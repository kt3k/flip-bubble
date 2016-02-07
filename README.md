# multiflip-bubble v1.1.0

> Animating speech bubble component, appears and disappears flipping its sections.

***NOTE***: This library depends on jquery, class-component and [multiflip](https://github.com/kt3k/multiflip)

# Install

via npm

    npm install multiflip-bubble

# Usage

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/patapata.js"></script>
<script src="path/to/flip-bubble.js"></script>

<script>
$(function () {
    var chr = $('#char');
    var sb = chr.flipBubble($('<p />').text('Hello, world!'));

    chr.one('click', function () {

        sb.show().then(function (sb) {

            chr.one('click', function () {

                sb.hide().then(init);

            });

        });

    });

});
</script>

<div id="char">Click!</div>
```

### [demo](http://kt3k.github.io/speech-bubble/test.html) (chrome)
