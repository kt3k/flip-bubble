
(function ($) {
    'use strict';

    var defaultWidth = 200;
    var defaultHeight = 100;
    var defaultColor = '#9BA3AB';
    var defaultChipHeight = 12;
    var defaultPartitionX = 5;
    var defaultPartitionY = 3;
    var defaultDistance = 25;

    var SpeechBubble = $.cc.subclass(function (pt) {

        pt.constructor = function ($parent, $content, x, y, w, h, color, chipHeight, partitionX, partitionY, distance, cssClass, duration) {

            this.$parent = $parent;
            this.$content = $content.css({position: 'absolute', opacity: 0});
            this.x = x;
            this.y = y;
            this.w = w || defaultWidth;
            this.h = h || defaultHeight;
            this.color = color || defaultColor;
            this.chipHeight = chipHeight || defaultChipHeight;
            this.partitionX = partitionX || defaultPartitionX;
            this.partitionY = partitionY || defaultPartitionY;
            this.distance = distance || defaultDistance;
            this.cssClass = cssClass || '';
            this.duration = duration;

        }

        pt.createInfoPane = function () {
            this.$dom = $('<div />')
                .css({
                    position: 'absolute',
                    left: (this.x - this.w / 2) + 'px',
                    top: (this.y - this.h - this.chipHeight - this.distance) + 'px'
                })
                .addClass(this.cssClass)
                .width(this.w).height(this.h).append(this.$content).appendTo(this.$parent);

            // The small chip under the bubble
            this.$chip = $('<div />')
                .css({
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
                }).appendTo(this.$dom);

            this.ip = this.$dom.infoPane(this.partitionX, this.partitionY, {
                bgcolor: this.color,
                unitDur: this.duration / 2
            });

            return this.ip;
        };

        pt.show = function () {
            var that = this;

            return this.createInfoPane().show().then(function () {
                return that;
            });
        };

        pt.hide = function () {
            var that = this;

            return this.ip.hide().then(function () {
                that.$dom.remove();
            });
        };

    });

    /**
     *
     */
    $.fn.speechBubble = function ($content, opts) {

        opts = opts || {};

        var pos = this.position();

        return new SpeechBubble(this.parent(), $content, pos.left + this.width() / 2, pos.top, opts.width, opts.height, opts.color, opts.chipHeight, opts.partitionX, opts.partitionY, opts.distance, opts.cssClass, opts.duration);

    };

    $.fn.flipBubble = $.fn.speechBubble;

}(jQuery));
