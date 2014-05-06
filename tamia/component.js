// Tâmia © 2014 Artem Sapegin http://sapegin.me
// https://github.com/sapegin/tamia
// JS component base class

/*global DEBUG:false, tamia:false*/
;(function(window, jQuery, undefined) {
	'use strict';

	/**
	 * JS component base class.
	 *
	 * Elements: any HTML element with class name that follow a pattern `.js-name` where `name` is an element name.
	 *
	 * States: any class on component root HTML node that follow a pattern `.is-state` where `state` is a state name.
	 * After initialization all components will have `ok` state.
	 *
	 * Example:
	 *
	 *   var Pony = tamia.extend(tamia.Component, {
	 *     binded: 'toggle',
	 *     init: function() {
	 *       this.elem.on('click', '.js-toggle', this.toggle_);
	 *     },
	 *     toggle: function() {
	 *       this.toggleState('pink');
	 *     }
	 *   });
	 *
	 *   tamia.initComponents({pony: Pony});
	 *
	 *   <div class="pink-pony is-pink" data-component="pony">
	 *     <button class="pink-pony__button js-toggle">To pink or not to pink?</div>
	 *   </div>
	 */
	function Component(elem) {
		if (!elem || elem.nodeType !== 1) throw new ReferenceError('No DOM node passed to Component constructor.');

		// Bind methods to `this`
		if (this.binded) {
			if (typeof this.binded === 'string') this.binded = this.binded.split(' ');
			this.bindAll.apply(this, this.binded);
		}

		this.elemNode = elem;
		this.elem = $(elem);
		this.initializable = this.isInitializable();
		if (!this.initializable) return;

		this._fillStates();
		if (this.isSupported()) {
			this.handlers = {};
			this.init();
			this.addState('ok');
		}
		else {
			this.fallback();
			this.addState('unsupported');
		}
	}

	Component.prototype = {
		__tamia_cmpnt__: true,

		/**
		 * List of methods that should be binded to `this` (see `bindAll` method).
		 *
		 * @type {String|Array}
		 */
		binded: null,

		/**
		 * Put all your initialization code in this method.
		 */
		init: function() {
			// Should be implemented
		},

		/**
		 * You can implement this method to do destroy component.
		 */
		destroy: function() {
			// Could be implemented
		},

		/**
		 * Implement this method if you want to check whether browser is good for your component or not.
		 *
		 * @return {Boolean}
		 */
		isSupported: function() {
			return true;
		},

		/**
		 * Implement this method if you want to check whether component could be initialized.
		 *
		 * Example:
		 *
		 *   isInitializable: function() {
		 *     // Do not initialize component if it's not visible
		 *     return this.isVisible();
		 *   }
		 *
		 * @return {Boolean}
		 */
		isInitializable: function() {
			return true;
		},

		/**
		 * Implement this method to do some fallbacks. It will be called if isSupported() returns false.
		 */
		fallback: function() {
			// Could be implemented
		},

		/**
		 * Binds all specified methods to this. Binded method names have `_` at the end.
		 *
		 * Example:
		 *
		 *   this.bindAll('toggle');
		 *   this.elem.on('click', this.toggle_);
		 *
		 * @param {String} method1, [method2...] Method names
		 */
		bindAll: function() {
			if (arguments.length === 0) throw new tamia.Error('Component.bindAll: no method names passed.');
			for (var funcIdx = 0; funcIdx < arguments.length; funcIdx++) {
				var func = arguments[funcIdx];
				if (DEBUG && !this[func] || !$.isFunction(this[func])) throw new tamia.Error('Component.bindAll: method ' + func + ' not exists or not a function.');
				this[func + '_'] = this[func].bind(this);
			}
		},

		/**
		 * Returns whether component has specified state.
		 *
		 * @param {String} [name] State name.
		 *
		 * @return {Boolean}
		 */
		hasState: function(name) {
			return !!this.states[name];
		},

		/**
		 * Adds specified state.
		 *
		 * @param {String} [name] State name.
		 */
		addState: function(name) {
			this.toggleState(name, true);
		},

		/**
		 * Removes specified state.
		 *
		 * @param {String} [name] State name.
		 */
		removeState: function(name) {
			this.toggleState(name, false);
		},

		/**
		 * Toggles state.
		 *
		 * @param {String} [name] State name.
		 * @param {Boolean} [value] State value.
		 */
		toggleState: function(name, value) {
			if (value === undefined) value = !this.states[name];
			this.states[name] = value;
			this._updateStates();
		},

		/**
		 * Returns component visibility.
		 *
		 * @param {Boolean}
		 */
		isVisible: function() {
			return !!(this.elemNode.offsetWidth || this.elemNode.offsetHeight);
		},

		_fillStates: function() {
			var re = /^is-/;
			var states = {};
			var classes = this.elemNode.className.split(' ');
			for (var classIdx = 0; classIdx < classes.length; classIdx++) {
				var cls = classes[classIdx];
				if (re.test(cls)) {
					states[cls.replace(re, '')] = true;
				}
			}
			this.states = states;
		},

		_updateStates: function() {
			// @todo classList version
			// @todo Move to tamia.js
			var classes = this.elemNode.className;
			classes = $.trim(classes.replace(/\bis-[-\w]+/g, ''));
			classes = classes.split(/\s+/);
			for (var name in this.states) {
				if (this.states[name]) {
					classes.push('is-' + name);
				}
			}
			this.elemNode.className = classes.join(' ');
		}
	};

	tamia.Component = Component;

}(window, jQuery));