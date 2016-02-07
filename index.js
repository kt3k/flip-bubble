
(function ($) {
    'use strict'

    var DEFAULT_WIDTH = 200
    var DEFAULT_HEIGHT = 100
    var DEFAULT_COLOR = '#115588'
    var DEFAULT_CHIP_HEIGHT = 12
    var DEFAULT_CHIP_DISTANCE = 15

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
    var MultiflipBubble = $.cc.subclass($.cc.Coelement, function (pt, parent) {

        pt.constructor = function (elem) {

            parent.constructor.call(this, elem)

            var target = this.target = this.elem.data('target')

            this.$parent = this.elem.parent()

            this.x = target.position().left + target.width() / 2
            this.y = target.position().top

            this.w = +this.elem.attr('width') || DEFAULT_WIDTH // component parameter
            this.h = +this.elem.attr('height') || DEFAULT_HEIGHT // component parameter

            this.color = this.elem.attr('color') || DEFAULT_COLOR // component parameter

            this.chipHeight = this.elem.attr('chip-height') || DEFAULT_CHIP_HEIGHT // component paramter
            this.distance = this.elem.attr('chip-distance') || DEFAULT_CHIP_DISTANCE // component parameter

            this.init()

        }

        pt.createChip = function () {

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

            })

        }

        pt.init = function () {

            this.elem.css({
                position: 'absolute',
                left: (this.x - this.w / 2) + 'px',
                top: (this.y - this.h - this.chipHeight - this.distance) + 'px'
            })
            .attr({
                bgcolor: this.color
            })
            .width(this.w)
            .height(this.h)
            .append(this.createChip())
            .cc.init('multiflip')

        }

        pt.show = function () {

            return this.elem.cc.get('multiflip').show()

        }

        pt.hide = function () {

            return this.elem.cc.get('multiflip').hide()

        }

    })

    $.cc.component('multiflip-bubble')(MultiflipBubble)

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

        opts = opts || {}

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
            data: {target: this},
            insertAfter: this,
            append: content.css({opacity: 0, position: 'relative'})

        }).cc.init('multiflip-bubble')

    }

}(jQuery))
