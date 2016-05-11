'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function ($) {
    'use strict';

    var DEFAULT_WIDTH = 200;
    var DEFAULT_HEIGHT = 100;
    var DEFAULT_COLOR = '#115588';
    var DEFAULT_CHIP_HEIGHT = 12;
    var DEFAULT_CHIP_DISTANCE = 15;

    /**
     * MultiflipBubble is the component of the bubble which opens above the target element.
     *
     * @example
     *     <div class="multiflip-bubble" m="10" n="5" width="200" height="100" color="#115588" chip-distance="12" chip-height="15">
     *
     * The attributes means:
     * - attr {number} m The horizontal partition number
     * - attr {number} n The vertical partition number
     * - attr {number} width The width of the bubble
     * - attr {number} height The height of the bubble
     * - attr {string} color The color of the bubble
     * - attr {number} chip-distance The distance between the bottom of the chip and the top of the bubble target (speaker)
     * - attr {number} chip-height The height of the chip under the bubble
     */

    var MultiflipBubble = function (_$$cc$Coelement) {
        _inherits(MultiflipBubble, _$$cc$Coelement);

        function MultiflipBubble(elem) {
            _classCallCheck(this, MultiflipBubble);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MultiflipBubble).call(this, elem));

            var target = _this.target = _this.elem.data('target');

            _this.$parent = _this.elem.parent();

            _this.x = target.position().left + target.width() / 2;
            _this.y = target.position().top;

            _this.w = +_this.elem.attr('width') || DEFAULT_WIDTH; // component parameter
            _this.h = +_this.elem.attr('height') || DEFAULT_HEIGHT; // component parameter

            _this.color = _this.elem.attr('color') || DEFAULT_COLOR; // component parameter

            _this.chipHeight = _this.elem.attr('chip-height') || DEFAULT_CHIP_HEIGHT; // component paramter
            _this.distance = _this.elem.attr('chip-distance') || DEFAULT_CHIP_DISTANCE; // component parameter

            _this.init();

            return _this;
        }

        _createClass(MultiflipBubble, [{
            key: 'createChip',
            value: function createChip() {

                // The small chip under the bubble
                return $('<div />').css({

                    position: 'absolute',
                    bottom: '-' + this.chipHeight * 2 + 'px',
                    left: this.w / 2 - Math.floor(this.chipHeight / 1.5),
                    width: 0,
                    height: 0,
                    borderWidth: this.chipHeight + 'px ' + Math.floor(this.chipHeight / 1.5) + 'px',
                    borderColor: 'transparent',
                    borderStyle: 'solid',
                    borderTop: 'solid ' + this.chipHeight + 'px ' + this.color,
                    borderTopColor: this.color,
                    opacity: 0

                });
            }
        }, {
            key: 'init',
            value: function init() {

                this.elem.css({
                    position: 'absolute',
                    left: this.x - this.w / 2 + 'px',
                    top: this.y - this.h - this.chipHeight - this.distance + 'px'
                }).attr({
                    bgcolor: this.color
                }).width(this.w).height(this.h).append(this.createChip()).cc.init('multiflip');
            }
        }, {
            key: 'show',
            value: function show() {

                return this.elem.cc.get('multiflip').show();
            }
        }, {
            key: 'hide',
            value: function hide() {

                return this.elem.cc.get('multiflip').hide();
            }
        }]);

        return MultiflipBubble;
    }($.cc.Coelement);

    $.cc.component('multiflip-bubble')(MultiflipBubble);

    /**
     * @param {jQuery} content The content
     * @param {Object} opts The options
     * @param {number} opts.m The horizontal partition number
     * @param {number} opts.n The vertical partition number
     * @param {number} opts.width The width of the bubble
     * @param {number} opts.height The height of the bubble
     * @param {number} opts.chipHeight The height of the chip under the bubble
     * @param {number} opts.chipDistance The distance between the bottom of the chip and the top of the bubble target (speaker)
     * @param {string} opts.color The color of the bubble
     */
    $.fn.multiflipBubble = function (content, opts) {

        opts = opts || {};

        return $('<div />', {
            attr: {
                m: opts.m,
                n: opts.n,
                width: opts.width,
                height: opts.height,
                color: opts.color,
                'chip-height': opts.chipHeight,
                'chip-distance': opts.chipDistance
            },
            data: { target: this },
            insertAfter: this,
            append: content.css({ opacity: 0, position: 'relative' })

        }).cc.init('multiflip-bubble');
    };
})(jQuery);

