
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	/** @returns {void} */
	function noop() {}

	/**
	 * @template T
	 * @template S
	 * @param {T} tar
	 * @param {S} src
	 * @returns {T & S}
	 */
	function assign(tar, src) {
		// @ts-ignore
		for (const k in src) tar[k] = src[k];
		return /** @type {T & S} */ (tar);
	}

	/** @returns {void} */
	function add_location(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	/**
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function run_all(fns) {
		fns.forEach(run);
	}

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	/** @returns {boolean} */
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
	}

	let src_url_equal_anchor;

	/**
	 * @param {string} element_src
	 * @param {string} url
	 * @returns {boolean}
	 */
	function src_url_equal(element_src, url) {
		if (element_src === url) return true;
		if (!src_url_equal_anchor) {
			src_url_equal_anchor = document.createElement('a');
		}
		// This is actually faster than doing URL(..).href
		src_url_equal_anchor.href = url;
		return element_src === src_url_equal_anchor.href;
	}

	/** @returns {boolean} */
	function is_empty(obj) {
		return Object.keys(obj).length === 0;
	}

	function create_slot(definition, ctx, $$scope, fn) {
		if (definition) {
			const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
			return definition[0](slot_ctx);
		}
	}

	function get_slot_context(definition, ctx, $$scope, fn) {
		return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
	}

	function get_slot_changes(definition, $$scope, dirty, fn) {
		if (definition[2] && fn) {
			const lets = definition[2](fn(dirty));
			if ($$scope.dirty === undefined) {
				return lets;
			}
			if (typeof lets === 'object') {
				const merged = [];
				const len = Math.max($$scope.dirty.length, lets.length);
				for (let i = 0; i < len; i += 1) {
					merged[i] = $$scope.dirty[i] | lets[i];
				}
				return merged;
			}
			return $$scope.dirty | lets;
		}
		return $$scope.dirty;
	}

	/** @returns {void} */
	function update_slot_base(
		slot,
		slot_definition,
		ctx,
		$$scope,
		slot_changes,
		get_slot_context_fn
	) {
		if (slot_changes) {
			const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
			slot.p(slot_context, slot_changes);
		}
	}

	/** @returns {any[] | -1} */
	function get_all_dirty_from_scope($$scope) {
		if ($$scope.ctx.length > 32) {
			const dirty = [];
			const length = $$scope.ctx.length / 32;
			for (let i = 0; i < length; i++) {
				dirty[i] = -1;
			}
			return dirty;
		}
		return -1;
	}

	function null_to_empty(value) {
		return value == null ? '' : value;
	}

	/** @type {typeof globalThis} */
	const globals =
		typeof window !== 'undefined'
			? window
			: typeof globalThis !== 'undefined'
			? globalThis
			: // @ts-ignore Node typings have this
			  global;

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append(target, node) {
		target.appendChild(node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert(target, node, anchor) {
		target.insertBefore(node, anchor || null);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	/**
	 * @template {keyof HTMLElementTagNameMap} K
	 * @param {K} name
	 * @returns {HTMLElementTagNameMap[K]}
	 */
	function element(name) {
		return document.createElement(name);
	}

	/**
	 * @param {string} data
	 * @returns {Text}
	 */
	function text(data) {
		return document.createTextNode(data);
	}

	/**
	 * @returns {Text} */
	function space() {
		return text(' ');
	}

	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @returns {() => void}
	 */
	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	/**
	 * @param {Element} element
	 * @returns {ChildNode[]}
	 */
	function children(element) {
		return Array.from(element.childNodes);
	}

	/**
	 * @returns {void} */
	function set_style(node, key, value, important) {
		if (value == null) {
			node.style.removeProperty(key);
		} else {
			node.style.setProperty(key, value, important ? 'important' : '');
		}
	}

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
	 * @returns {CustomEvent<T>}
	 */
	function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
		return new CustomEvent(type, { detail, bubbles, cancelable });
	}

	/**
	 * @typedef {Node & {
	 * 	claim_order?: number;
	 * 	hydrate_init?: true;
	 * 	actual_end_child?: NodeEx;
	 * 	childNodes: NodeListOf<NodeEx>;
	 * }} NodeEx
	 */

	/** @typedef {ChildNode & NodeEx} ChildNodeEx */

	/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

	/**
	 * @typedef {ChildNodeEx[] & {
	 * 	claim_info?: {
	 * 		last_index: number;
	 * 		total_claimed: number;
	 * 	};
	 * }} ChildNodeArray
	 */

	let current_component;

	/** @returns {void} */
	function set_current_component(component) {
		current_component = component;
	}

	const dirty_components = [];
	const binding_callbacks = [];

	let render_callbacks = [];

	const flush_callbacks = [];

	const resolved_promise = /* @__PURE__ */ Promise.resolve();

	let update_scheduled = false;

	/** @returns {void} */
	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	/** @returns {void} */
	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	// flush() calls callbacks in this order:
	// 1. All beforeUpdate callbacks, in order: parents before children
	// 2. All bind:this callbacks, in reverse order: children before parents.
	// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
	//    for afterUpdates called during the initial onMount, which are called in
	//    reverse order: children before parents.
	// Since callbacks might update component values, which could trigger another
	// call to flush(), the following steps guard against this:
	// 1. During beforeUpdate, any updated components will be added to the
	//    dirty_components array and will cause a reentrant call to flush(). Because
	//    the flush index is kept outside the function, the reentrant call will pick
	//    up where the earlier call left off and go through all dirty components. The
	//    current_component value is saved and restored so that the reentrant call will
	//    not interfere with the "parent" flush() call.
	// 2. bind:this callbacks cannot trigger new flush() calls.
	// 3. During afterUpdate, any updated components will NOT have their afterUpdate
	//    callback called a second time; the seen_callbacks set, outside the flush()
	//    function, guarantees this behavior.
	const seen_callbacks = new Set();

	let flushidx = 0; // Do *not* move this inside the flush() function

	/** @returns {void} */
	function flush() {
		// Do not reenter flush while dirty components are updated, as this can
		// result in an infinite loop. Instead, let the inner flush handle it.
		// Reentrancy is ok afterwards for bindings etc.
		if (flushidx !== 0) {
			return;
		}
		const saved_component = current_component;
		do {
			// first, call beforeUpdate functions
			// and update components
			try {
				while (flushidx < dirty_components.length) {
					const component = dirty_components[flushidx];
					flushidx++;
					set_current_component(component);
					update(component.$$);
				}
			} catch (e) {
				// reset dirty state to not end up in a deadlocked state and then rethrow
				dirty_components.length = 0;
				flushidx = 0;
				throw e;
			}
			set_current_component(null);
			dirty_components.length = 0;
			flushidx = 0;
			while (binding_callbacks.length) binding_callbacks.pop()();
			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			for (let i = 0; i < render_callbacks.length; i += 1) {
				const callback = render_callbacks[i];
				if (!seen_callbacks.has(callback)) {
					// ...so guard against infinite loops
					seen_callbacks.add(callback);
					callback();
				}
			}
			render_callbacks.length = 0;
		} while (dirty_components.length);
		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}
		update_scheduled = false;
		seen_callbacks.clear();
		set_current_component(saved_component);
	}

	/** @returns {void} */
	function update($$) {
		if ($$.fragment !== null) {
			$$.update();
			run_all($$.before_update);
			const dirty = $$.dirty;
			$$.dirty = [-1];
			$$.fragment && $$.fragment.p($$.ctx, dirty);
			$$.after_update.forEach(add_render_callback);
		}
	}

	/**
	 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function flush_render_callbacks(fns) {
		const filtered = [];
		const targets = [];
		render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
		targets.forEach((c) => c());
		render_callbacks = filtered;
	}

	const outroing = new Set();

	/**
	 * @type {Outro}
	 */
	let outros;

	/**
	 * @returns {void} */
	function group_outros() {
		outros = {
			r: 0,
			c: [],
			p: outros // parent group
		};
	}

	/**
	 * @returns {void} */
	function check_outros() {
		if (!outros.r) {
			run_all(outros.c);
		}
		outros = outros.p;
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} [local]
	 * @returns {void}
	 */
	function transition_in(block, local) {
		if (block && block.i) {
			outroing.delete(block);
			block.i(local);
		}
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} local
	 * @param {0 | 1} [detach]
	 * @param {() => void} [callback]
	 * @returns {void}
	 */
	function transition_out(block, local, detach, callback) {
		if (block && block.o) {
			if (outroing.has(block)) return;
			outroing.add(block);
			outros.c.push(() => {
				outroing.delete(block);
				if (callback) {
					if (detach) block.d(1);
					callback();
				}
			});
			block.o(local);
		} else if (callback) {
			callback();
		}
	}

	/** @typedef {1} INTRO */
	/** @typedef {0} OUTRO */
	/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
	/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

	/**
	 * @typedef {Object} Outro
	 * @property {number} r
	 * @property {Function[]} c
	 * @property {Object} p
	 */

	/**
	 * @typedef {Object} PendingProgram
	 * @property {number} start
	 * @property {INTRO|OUTRO} b
	 * @property {Outro} [group]
	 */

	/**
	 * @typedef {Object} Program
	 * @property {number} a
	 * @property {INTRO|OUTRO} b
	 * @property {1|-1} d
	 * @property {number} duration
	 * @property {number} start
	 * @property {number} end
	 * @property {Outro} [group]
	 */

	/** @returns {void} */
	function create_component(block) {
		block && block.c();
	}

	/** @returns {void} */
	function mount_component(component, target, anchor) {
		const { fragment, after_update } = component.$$;
		fragment && fragment.m(target, anchor);
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {
			const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
			// if the component was destroyed immediately
			// it will update the `$$.on_destroy` reference to `null`.
			// the destructured on_destroy may still reference to the old array
			if (component.$$.on_destroy) {
				component.$$.on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
		after_update.forEach(add_render_callback);
	}

	/** @returns {void} */
	function destroy_component(component, detaching) {
		const $$ = component.$$;
		if ($$.fragment !== null) {
			flush_render_callbacks($$.after_update);
			run_all($$.on_destroy);
			$$.fragment && $$.fragment.d(detaching);
			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			$$.on_destroy = $$.fragment = null;
			$$.ctx = [];
		}
	}

	/** @returns {void} */
	function make_dirty(component, i) {
		if (component.$$.dirty[0] === -1) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty.fill(0);
		}
		component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
	}

	// TODO: Document the other params
	/**
	 * @param {SvelteComponent} component
	 * @param {import('./public.js').ComponentConstructorOptions} options
	 *
	 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
	 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
	 * This will be the `add_css` function from the compiled component.
	 *
	 * @returns {void}
	 */
	function init(
		component,
		options,
		instance,
		create_fragment,
		not_equal,
		props,
		append_styles = null,
		dirty = [-1]
	) {
		const parent_component = current_component;
		set_current_component(component);
		/** @type {import('./private.js').T$$} */
		const $$ = (component.$$ = {
			fragment: null,
			ctx: [],
			// state
			props,
			update: noop,
			not_equal,
			bound: blank_object(),
			// lifecycle
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
			// everything else
			callbacks: blank_object(),
			dirty,
			skip_bound: false,
			root: options.target || parent_component.$$.root
		});
		append_styles && append_styles($$.root);
		let ready = false;
		$$.ctx = instance
			? instance(component, options.props || {}, (i, ret, ...rest) => {
					const value = rest.length ? rest[0] : ret;
					if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
						if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
						if (ready) make_dirty(component, i);
					}
					return ret;
			  })
			: [];
		$$.update();
		ready = true;
		run_all($$.before_update);
		// `false` as a special case of no DOM component
		$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
		if (options.target) {
			if (options.hydrate) {
				// TODO: what is the correct type here?
				// @ts-expect-error
				const nodes = children(options.target);
				$$.fragment && $$.fragment.l(nodes);
				nodes.forEach(detach);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				$$.fragment && $$.fragment.c();
			}
			if (options.intro) transition_in(component.$$.fragment);
			mount_component(component, options.target, options.anchor);
			flush();
		}
		set_current_component(parent_component);
	}

	/**
	 * Base class for Svelte components. Used when dev=false.
	 *
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 */
	class SvelteComponent {
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$ = undefined;
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$set = undefined;

		/** @returns {void} */
		$destroy() {
			destroy_component(this, 1);
			this.$destroy = noop;
		}

		/**
		 * @template {Extract<keyof Events, string>} K
		 * @param {K} type
		 * @param {((e: Events[K]) => void) | null | undefined} callback
		 * @returns {() => void}
		 */
		$on(type, callback) {
			if (!is_function(callback)) {
				return noop;
			}
			const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
			callbacks.push(callback);
			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		/**
		 * @param {Partial<Props>} props
		 * @returns {void}
		 */
		$set(props) {
			if (this.$$set && !is_empty(props)) {
				this.$$.skip_bound = true;
				this.$$set(props);
				this.$$.skip_bound = false;
			}
		}
	}

	/**
	 * @typedef {Object} CustomElementPropDefinition
	 * @property {string} [attribute]
	 * @property {boolean} [reflect]
	 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
	 */

	// generated during release, do not modify

	/**
	 * The current version, as set in package.json.
	 *
	 * https://svelte.dev/docs/svelte-compiler#svelte-version
	 * @type {string}
	 */
	const VERSION = '4.2.8';
	const PUBLIC_VERSION = '4';

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @returns {void}
	 */
	function dispatch_dev(type, detail) {
		document.dispatchEvent(custom_event(type, { version: VERSION, ...detail }, { bubbles: true }));
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append_dev(target, node) {
		dispatch_dev('SvelteDOMInsert', { target, node });
		append(target, node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert_dev(target, node, anchor) {
		dispatch_dev('SvelteDOMInsert', { target, node, anchor });
		insert(target, node, anchor);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach_dev(node) {
		dispatch_dev('SvelteDOMRemove', { node });
		detach(node);
	}

	/**
	 * @param {Node} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @param {boolean} [has_prevent_default]
	 * @param {boolean} [has_stop_propagation]
	 * @param {boolean} [has_stop_immediate_propagation]
	 * @returns {() => void}
	 */
	function listen_dev(
		node,
		event,
		handler,
		options,
		has_prevent_default,
		has_stop_propagation,
		has_stop_immediate_propagation
	) {
		const modifiers =
			options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
		if (has_prevent_default) modifiers.push('preventDefault');
		if (has_stop_propagation) modifiers.push('stopPropagation');
		if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
		dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
		const dispose = listen(node, event, handler, options);
		return () => {
			dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
			dispose();
		};
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr_dev(node, attribute, value) {
		attr(node, attribute, value);
		if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
		else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	}

	/**
	 * @returns {void} */
	function validate_slots(name, slot, keys) {
		for (const slot_key of Object.keys(slot)) {
			if (!~keys.indexOf(slot_key)) {
				console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
			}
		}
	}

	/**
	 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	 *
	 * Can be used to create strongly typed Svelte components.
	 *
	 * #### Example:
	 *
	 * You have component library on npm called `component-library`, from which
	 * you export a component called `MyComponent`. For Svelte+TypeScript users,
	 * you want to provide typings. Therefore you create a `index.d.ts`:
	 * ```ts
	 * import { SvelteComponent } from "svelte";
	 * export class MyComponent extends SvelteComponent<{foo: string}> {}
	 * ```
	 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
	 * to provide intellisense and to use the component like this in a Svelte file
	 * with TypeScript:
	 * ```svelte
	 * <script lang="ts">
	 * 	import { MyComponent } from "component-library";
	 * </script>
	 * <MyComponent foo={'bar'} />
	 * ```
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 * @template {Record<string, any>} [Slots=any]
	 * @extends {SvelteComponent<Props, Events>}
	 */
	class SvelteComponentDev extends SvelteComponent {
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Props}
		 */
		$$prop_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Events}
		 */
		$$events_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Slots}
		 */
		$$slot_def;

		/** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
		constructor(options) {
			if (!options || (!options.target && !options.$$inline)) {
				throw new Error("'target' is a required option");
			}
			super();
		}

		/** @returns {void} */
		$destroy() {
			super.$destroy();
			this.$destroy = () => {
				console.warn('Component was already destroyed'); // eslint-disable-line no-console
			};
		}

		/** @returns {void} */
		$capture_state() {}

		/** @returns {void} */
		$inject_state() {}
	}

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

	/** @returns {void} */
	function onMount() {}

	/* src\components\Button.svelte generated by Svelte v4.2.8 */
	const file$3 = "src\\components\\Button.svelte";

	function create_fragment$3(ctx) {
		let button;
		let button_class_value;
		let current;
		let mounted;
		let dispose;
		const default_slot_template = /*#slots*/ ctx[5].default;
		const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

		const block = {
			c: function create() {
				button = element("button");
				if (default_slot) default_slot.c();
				attr_dev(button, "type", "button");
				attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*fluid*/ ctx[1] ? 'fluid' : '') + " svelte-s49364"));
				set_style(button, "margin", /*center*/ ctx[0] ? '0 auto 0 auto' : '0');
				add_location(button, file$3, 21, 0, 441);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);

				if (default_slot) {
					default_slot.m(button, null);
				}

				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*onClick*/ ctx[2], false, false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (default_slot) {
					if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
						update_slot_base(
							default_slot,
							default_slot_template,
							ctx,
							/*$$scope*/ ctx[4],
							!current
							? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
							: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
							null
						);
					}
				}

				if (!current || dirty & /*fluid*/ 2 && button_class_value !== (button_class_value = "" + (null_to_empty(/*fluid*/ ctx[1] ? 'fluid' : '') + " svelte-s49364"))) {
					attr_dev(button, "class", button_class_value);
				}

				if (!current || dirty & /*center*/ 1) {
					set_style(button, "margin", /*center*/ ctx[0] ? '0 auto 0 auto' : '0');
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(default_slot, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(default_slot, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				if (default_slot) default_slot.d(detaching);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Button', slots, ['default']);
		let { click } = $$props;
		let { center = false } = $$props;
		let { fluid = false } = $$props;

		function onClick() {
			if (typeof click === "string") {
				const link = click;

				if (link.startsWith('http://') || link.startsWith('https://')) {
					window.open(link);
				} else {
					window.location.href = link;
				}
			} else {
				const action = click;
				action();
			}
		}

		$$self.$$.on_mount.push(function () {
			if (click === undefined && !('click' in $$props || $$self.$$.bound[$$self.$$.props['click']])) {
				console.warn("<Button> was created without expected prop 'click'");
			}
		});

		const writable_props = ['click', 'center', 'fluid'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('click' in $$props) $$invalidate(3, click = $$props.click);
			if ('center' in $$props) $$invalidate(0, center = $$props.center);
			if ('fluid' in $$props) $$invalidate(1, fluid = $$props.fluid);
			if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
		};

		$$self.$capture_state = () => ({ click, center, fluid, onClick });

		$$self.$inject_state = $$props => {
			if ('click' in $$props) $$invalidate(3, click = $$props.click);
			if ('center' in $$props) $$invalidate(0, center = $$props.center);
			if ('fluid' in $$props) $$invalidate(1, fluid = $$props.fluid);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [center, fluid, onClick, click, $$scope, slots];
	}

	class Button extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, { click: 3, center: 0, fluid: 1 });

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Button",
				options,
				id: create_fragment$3.name
			});
		}

		get click() {
			throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set click(value) {
			throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get center() {
			throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set center(value) {
			throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get fluid() {
			throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set fluid(value) {
			throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src\routes\Home.svelte generated by Svelte v4.2.8 */
	const file$2 = "src\\routes\\Home.svelte";

	// (75:2) <Button click="bronnen">
	function create_default_slot_2(ctx) {
		let t;

		const block = {
			c: function create() {
				t = text("Bekijk volledige bronnenlijst");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t, anchor);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot_2.name,
			type: "slot",
			source: "(75:2) <Button click=\\\"bronnen\\\">",
			ctx
		});

		return block;
	}

	// (247:4) <Button click="mailto:info@baskakes.nl?subject=Biesbosch film"        >
	function create_default_slot_1(ctx) {
		let t;

		const block = {
			c: function create() {
				t = text("Mail Bas");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t, anchor);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot_1.name,
			type: "slot",
			source: "(247:4) <Button click=\\\"mailto:info@baskakes.nl?subject=Biesbosch film\\\"        >",
			ctx
		});

		return block;
	}

	// (250:4) <Button click="https://www.linkedin.com/in/bas-kakes/">
	function create_default_slot$1(ctx) {
		let t;

		const block = {
			c: function create() {
				t = text("LinkedIn");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t, anchor);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot$1.name,
			type: "slot",
			source: "(250:4) <Button click=\\\"https://www.linkedin.com/in/bas-kakes/\\\">",
			ctx
		});

		return block;
	}

	function create_fragment$2(ctx) {
		let div0;
		let p0;
		let t1;
		let p1;
		let t3;
		let section0;
		let h20;
		let t5;
		let p2;
		let t6;
		let a0;
		let t8;
		let t9;
		let p3;
		let t11;
		let figure0;
		let img0;
		let img0_src_value;
		let t12;
		let figcaption0;
		let t14;
		let section1;
		let h21;
		let t16;
		let p4;
		let t18;
		let ul0;
		let li0;
		let a1;
		let t20;
		let t21;
		let li1;
		let a2;
		let t23;
		let t24;
		let li2;
		let a3;
		let t26;
		let t27;
		let li3;
		let a4;
		let t29;
		let t30;
		let p5;
		let t31;
		let em0;
		let t33;
		let t34;
		let p6;
		let t35;
		let a5;
		let t37;
		let a6;
		let t39;
		let a7;
		let img1;
		let img1_src_value;
		let t40;
		let figure1;
		let img2;
		let img2_src_value;
		let t41;
		let figcaption1;
		let t43;
		let figure2;
		let img3;
		let img3_src_value;
		let t44;
		let figcaption2;
		let t46;
		let figure3;
		let img4;
		let img4_src_value;
		let t47;
		let figcaption3;
		let t49;
		let section2;
		let h22;
		let t51;
		let p7;
		let t53;
		let button0;
		let t54;
		let section3;
		let h23;
		let t56;
		let p8;
		let t57;
		let a8;
		let t59;
		let t60;
		let section4;
		let h24;
		let t62;
		let p9;
		let t63;
		let a9;
		let t65;
		let t66;
		let p10;
		let t67;
		let em1;
		let t69;
		let a10;
		let t71;
		let p11;
		let t72;
		let a11;
		let t74;
		let t75;
		let p12;
		let t76;
		let a12;
		let t78;
		let figure4;
		let img5;
		let img5_src_value;
		let t79;
		let figcaption4;
		let t81;
		let section5;
		let h25;
		let t83;
		let p13;
		let t85;
		let p14;
		let t87;
		let figure5;
		let img6;
		let img6_src_value;
		let t88;
		let figcaption5;
		let t90;
		let figure6;
		let img7;
		let img7_src_value;
		let t91;
		let figcaption6;
		let t93;
		let figure7;
		let img8;
		let img8_src_value;
		let t94;
		let figcaption7;
		let t96;
		let figure8;
		let img9;
		let img9_src_value;
		let t97;
		let figcaption8;
		let t99;
		let figure9;
		let img10;
		let img10_src_value;
		let t100;
		let figcaption9;
		let t102;
		let section6;
		let h26;
		let t104;
		let p15;
		let t106;
		let figure10;
		let img11;
		let img11_src_value;
		let t107;
		let figcaption10;
		let a13;
		let t109;
		let ul1;
		let li4;
		let a14;
		let t111;
		let li5;
		let a15;
		let t113;
		let li6;
		let a16;
		let t115;
		let li7;
		let a17;
		let t117;
		let li8;
		let a18;
		let t119;
		let li9;
		let a19;
		let t121;
		let li10;
		let a20;
		let t123;
		let li11;
		let a21;
		let t125;
		let li12;
		let a22;
		let t127;
		let li13;
		let a23;
		let t129;
		let li14;
		let a24;
		let t131;
		let section7;
		let h27;
		let t133;
		let p16;
		let t135;
		let div1;
		let button1;
		let t136;
		let button2;
		let current;

		button0 = new Button({
				props: {
					click: "bronnen",
					$$slots: { default: [create_default_slot_2] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		button1 = new Button({
				props: {
					click: "mailto:info@baskakes.nl?subject=Biesbosch film",
					$$slots: { default: [create_default_slot_1] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		button2 = new Button({
				props: {
					click: "https://www.linkedin.com/in/bas-kakes/",
					$$slots: { default: [create_default_slot$1] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		const block = {
			c: function create() {
				div0 = element("div");
				p0 = element("p");
				p0.textContent = "In De Biesbosch: Natuur in beweging krijgt u een kijkje in het leven van de dieren die in de Biesbosch voorkomen. Ook krijgt u het verhaal en de geschiedenis van dit gebied te horen; er is in de loop der jaren veel veranderd.  De aangewezen persoon om ons te helpen dit in beeld te brengen is oud-boswachter Jacques van der Neut. Dankzij zijn tientallen jaren Biesbosch-ervaring en kennis weten we precies wat belangrijk is om te vertellen en te laten zien.";
				t1 = space();
				p1 = element("p");
				p1.textContent = "De Biesbosch is een zoetwatergetijdengebied, dat is uniek op wereldschaal. Na honderden jaren gebruikt te zijn voor industriële doeleinden is het sinds 1994 een nationaal park geworden. Sindsdien is de natuur echt tot bloei gekomen. Als je in de Biesbosch bent voel je meteen de rust en ga je op in de natuur. Wij vinden dit een groot goed en laten mensen graag zien en voelen hoe mooi het is, zowel in de bioscoop als thuis.";
				t3 = space();
				section0 = element("section");
				h20 = element("h2");
				h20.textContent = "Waarom een film over de Biesbosch?";
				t5 = space();
				p2 = element("p");
				t6 = text("Na het maken van onze vorige film, ");
				a0 = element("a");
				a0.textContent = "Dordrecht door de jaren heen";
				t8 = text(", hebben we onze passie ontdekt voor het maken van documentaires en zijn onze ogen geopend voor de prachtige natuur van de Biesbosch. De aangewezen persoon om ons te helpen dit in beeld te brengen is oud-boswachter Jacques van der Neut. Dankzij zijn tientallen jaren Biesbosch-ervaring en kennis weten we precies wat belangrijk is om te vertellen en te laten zien.");
				t9 = space();
				p3 = element("p");
				p3.textContent = "De Biesbosch is een zoetwatergetijdengebied, dat is uniek op wereldschaal. Na honderden jaren gebruikt te zijn voor industriële doeleinden is het sinds 1994 een nationaal park geworden. Sindsdien is de natuur echt tot bloei gekomen. Als je in de Biesbosch bent voel je meteen de rust en ga je op in de natuur. Wij vinden dit een groot goed en laten mensen graag zien en voelen hoe mooi het is, zowel in de bioscoop als thuis.";
				t11 = space();
				figure0 = element("figure");
				img0 = element("img");
				t12 = space();
				figcaption0 = element("figcaption");
				figcaption0.textContent = "Van zonsopkomst tot zonsondergang: Bas en Jacques zijn op allerlei momenten in de Biesbosch te vinden.";
				t14 = space();
				section1 = element("section");
				h21 = element("h2");
				h21.textContent = "Wie zijn wij?";
				t16 = space();
				p4 = element("p");
				p4.textContent = "Ons team bestaat uit:";
				t18 = space();
				ul0 = element("ul");
				li0 = element("li");
				a1 = element("a");
				a1.textContent = "Bas Kakes";
				t20 = text("\r\n      - filmregisseur, cameraman, en video-editor. Hij is een geboren Dordtenaar en ziet de Biesbosch als zijn verlengde achtertuin.");
				t21 = space();
				li1 = element("li");
				a2 = element("a");
				a2.textContent = "Jacques van der Neut";
				t23 = text("\r\n      - gepensioneerd boswachter, Biesbosch-expert, auteur, en fotograaf. Hij heeft 38 jaar voor Staatsbosbeheer gewerkt in de Biesbosch als boswachter.");
				t24 = space();
				li2 = element("li");
				a3 = element("a");
				a3.textContent = "Coen Koopmans";
				t26 = text("\r\n      - presenteert en schrijft het script. Hij doet onderzoek om zeker te zijn dat wat er verteld wordt ook klopt.");
				t27 = space();
				li3 = element("li");
				a4 = element("a");
				a4.textContent = "Kevin van den Hoek";
				t29 = text("\r\n      - grafisch ontwerper. Hij maakt de visuals en zorgt dat alles mooi afgewerkt is.");
				t30 = space();
				p5 = element("p");
				t31 = text("Samen zijn wij ");
				em0 = element("em");
				em0.textContent = "FastWorks";
				t33 = text(".");
				t34 = space();
				p6 = element("p");
				t35 = text("Daarnaast werken wij samen met ");
				a5 = element("a");
				a5.textContent = "Bas Bakker";
				t37 = text(" van ");
				a6 = element("a");
				a6.textContent = "Playback Images";
				t39 = text(".\r\n    Hij zorgt voor productie en distributie van de film.\r\n    ");
				a7 = element("a");
				img1 = element("img");
				t40 = space();
				figure1 = element("figure");
				img2 = element("img");
				t41 = space();
				figcaption1 = element("figcaption");
				figcaption1.textContent = "Gepensioneerd boswachter Jacques van der Neut deelt zijn visie over de Biesbosch.";
				t43 = space();
				figure2 = element("figure");
				img3 = element("img");
				t44 = space();
				figcaption2 = element("figcaption");
				figcaption2.textContent = "Ook het icoon van de Biesbosch komt aan bod: de bever.";
				t46 = space();
				figure3 = element("figure");
				img4 = element("img");
				t47 = space();
				figcaption3 = element("figcaption");
				figcaption3.textContent = "Er moet in alle seizoenen en weersomstandigheden gefilmd worden.";
				t49 = space();
				section2 = element("section");
				h22 = element("h2");
				h22.textContent = "Tot op de bodem uitgezocht";
				t51 = space();
				p7 = element("p");
				p7.textContent = "Om er zeker van te zijn dat we het juiste verhaal vertellen hebben we alles grondig uitgezocht. Alle gemaakte claims worden onderbouwd met (wetenschappelijke) bronnen. Zo zorgen we ervoor dat we recht doen aan het verhaal.";
				t53 = space();
				create_component(button0.$$.fragment);
				t54 = space();
				section3 = element("section");
				h23 = element("h2");
				h23.textContent = "Crowdfunding";
				t56 = space();
				p8 = element("p");
				t57 = text("We hebben via voordekunst.nl\r\n    ");
				a8 = element("a");
				a8.textContent = "een succesvolle crowfundingcampagne";
				t59 = text("\r\n    afgerond. We zijn ontzettend blij met alle steun!");
				t60 = space();
				section4 = element("section");
				h24 = element("h2");
				h24.textContent = "In de media";
				t62 = space();
				p9 = element("p");
				t63 = text("Het AD schreef over onze film en crowdfunding,\r\n    ");
				a9 = element("a");
				a9.textContent = "klik hier om het terug te lezen";
				t65 = text(".");
				t66 = space();
				p10 = element("p");
				t67 = text("Op zaterdagochtend 4 februari 2023 waren Bas en Jacques te horen op Radio Rijnmond in het programma\r\n    ");
				em1 = element("em");
				em1.textContent = "Chris Natuurlijk";
				t69 = text(".\r\n    ");
				a10 = element("a");
				a10.textContent = "Klik hier voor meer informatie.";
				t71 = space();
				p11 = element("p");
				t72 = text("Dit interview is in ");
				a11 = element("a");
				a11.textContent = "hun podcast terug te luisteren";
				t74 = text(".");
				t75 = space();
				p12 = element("p");
				t76 = text("RTV Dordrecht ging met ons op pad en wilde meer weten over deze film.\r\n    ");
				a12 = element("a");
				a12.textContent = "Bekijk het hier.";
				t78 = space();
				figure4 = element("figure");
				img5 = element("img");
				t79 = space();
				figcaption4 = element("figcaption");
				figcaption4.textContent = "Jacques in gesprek met Chris van Radio Rijnmond.";
				t81 = space();
				section5 = element("section");
				h25 = element("h2");
				h25.textContent = "Wanneer zal de film te zien zijn?";
				t83 = space();
				p13 = element("p");
				p13.textContent = "Iedereen die wel eens iets met fotografie heeft gedaan zal het weten: dieren zijn niet voorspelbaar. Ook de licht- en weersomstandigheden willen nog wel eens variëren. Daarom is het niet alleen moeilijk, maar vinden we het ook zonde om een harde deadline te stellen.";
				t85 = space();
				p14 = element("p");
				p14.textContent = "We zijn al vier jaar bezig met filmen, dus we zijn al een eind op weg. We mikken op eind 2024.";
				t87 = space();
				figure5 = element("figure");
				img6 = element("img");
				t88 = space();
				figcaption5 = element("figcaption");
				figcaption5.textContent = "Het porseleinhoen laat zich even zien.";
				t90 = space();
				figure6 = element("figure");
				img7 = element("img");
				t91 = space();
				figcaption6 = element("figcaption");
				figcaption6.textContent = "De zeearend, ook wel bekend als \"de vliegende deur\".";
				t93 = space();
				figure7 = element("figure");
				img8 = element("img");
				t94 = space();
				figcaption7 = element("figcaption");
				figcaption7.textContent = "Met een drone laten we de hele Biesbosch in vogelvlucht zien.";
				t96 = space();
				figure8 = element("figure");
				img9 = element("img");
				t97 = space();
				figcaption8 = element("figcaption");
				figcaption8.textContent = "Deze ijsvogel heeft een baby snoek gevangen.";
				t99 = space();
				figure9 = element("figure");
				img10 = element("img");
				t100 = space();
				figcaption9 = element("figcaption");
				figcaption9.textContent = "Als het water in de rivier te hoog staat, stroomt het overtollige water de Noordwaard in.";
				t102 = space();
				section6 = element("section");
				h26 = element("h2");
				h26.textContent = "Met dank aan";
				t104 = space();
				p15 = element("p");
				p15.textContent = "We zijn erg blij met al onze donateurs, waaronder:";
				t106 = space();
				figure10 = element("figure");
				img11 = element("img");
				t107 = space();
				figcaption10 = element("figcaption");
				a13 = element("a");
				a13.textContent = "De Mastboom Brosens Stichting";
				t109 = space();
				ul1 = element("ul");
				li4 = element("li");
				a14 = element("a");
				a14.textContent = "Staatsbosbeheer";
				t111 = space();
				li5 = element("li");
				a15 = element("a");
				a15.textContent = "Stichting Biesbosch Streekfonds";
				t113 = space();
				li6 = element("li");
				a16 = element("a");
				a16.textContent = "Gemeente Dordrecht";
				t115 = space();
				li7 = element("li");
				a17 = element("a");
				a17.textContent = "FREE Nature";
				t117 = space();
				li8 = element("li");
				a18 = element("a");
				a18.textContent = "Rondvaartbedrijf Zilvermeeuw";
				t119 = space();
				li9 = element("li");
				a19 = element("a");
				a19.textContent = "Het Cultuurfonds";
				t121 = space();
				li10 = element("li");
				a20 = element("a");
				a20.textContent = "Fysiotherapie Dubbeldam";
				t123 = space();
				li11 = element("li");
				a21 = element("a");
				a21.textContent = "van Dijk-Kuiper Medical B.V.";
				t125 = space();
				li12 = element("li");
				a22 = element("a");
				a22.textContent = "Het Wilgenpaard";
				t127 = space();
				li13 = element("li");
				a23 = element("a");
				a23.textContent = "DRIJF Dordrecht";
				t129 = space();
				li14 = element("li");
				a24 = element("a");
				a24.textContent = "Ontdek Dordrecht";
				t131 = space();
				section7 = element("section");
				h27 = element("h2");
				h27.textContent = "Vragen?";
				t133 = space();
				p16 = element("p");
				p16.textContent = "Heeft u vragen over dit project? Schroom niet om contact op te nemen.";
				t135 = space();
				div1 = element("div");
				create_component(button1.$$.fragment);
				t136 = space();
				create_component(button2.$$.fragment);
				add_location(p0, file$2, 5, 2, 107);
				add_location(p1, file$2, 6, 2, 575);
				attr_dev(div0, "class", "synopsis");
				add_location(div0, file$2, 4, 0, 81);
				attr_dev(h20, "class", "svelte-1qbsvv");
				add_location(h20, file$2, 10, 2, 1047);
				attr_dev(a0, "href", "https://www.dordtfilm.nl");
				attr_dev(a0, "target", "_blank");
				add_location(a0, file$2, 12, 40, 1134);
				add_location(p2, file$2, 12, 2, 1096);
				add_location(p3, file$2, 14, 2, 1591);
				if (!src_url_equal(img0.src, img0_src_value = "assets/images/filmen.jpg")) attr_dev(img0, "src", img0_src_value);
				attr_dev(img0, "alt", "Bas en Jacques in de Biesbosch");
				attr_dev(img0, "class", "svelte-1qbsvv");
				add_location(img0, file$2, 17, 4, 2057);
				attr_dev(figcaption0, "class", "svelte-1qbsvv");
				add_location(figcaption0, file$2, 18, 4, 2138);
				attr_dev(figure0, "class", "photo svelte-1qbsvv");
				add_location(figure0, file$2, 16, 2, 2029);
				attr_dev(section0, "class", "waarom svelte-1qbsvv");
				add_location(section0, file$2, 9, 0, 1019);
				attr_dev(h21, "class", "svelte-1qbsvv");
				add_location(h21, file$2, 23, 2, 2328);
				add_location(p4, file$2, 25, 2, 2358);
				attr_dev(a1, "href", "https://www.baskakes.nl");
				attr_dev(a1, "target", "_blank");
				add_location(a1, file$2, 29, 6, 2414);
				add_location(li0, file$2, 28, 4, 2402);
				attr_dev(a2, "href", "https://www.fotoneut.nl");
				attr_dev(a2, "target", "_blank");
				add_location(a2, file$2, 33, 6, 2640);
				add_location(li1, file$2, 32, 4, 2628);
				attr_dev(a3, "href", "https://www.linkedin.com/in/coen-koopmans-3b15519a/");
				attr_dev(a3, "target", "_blank");
				add_location(a3, file$2, 37, 6, 2897);
				add_location(li2, file$2, 36, 4, 2885);
				attr_dev(a4, "href", "https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/");
				attr_dev(a4, "target", "_blank");
				add_location(a4, file$2, 40, 6, 3132);
				add_location(li3, file$2, 39, 4, 3120);
				add_location(ul0, file$2, 27, 2, 2392);
				add_location(em0, file$2, 45, 20, 3370);
				add_location(p5, file$2, 45, 2, 3352);
				attr_dev(a5, "target", "_blank");
				attr_dev(a5, "href", "https://www.linkedin.com/in/bas-bakker-1887b025/");
				add_location(a5, file$2, 48, 35, 3439);
				attr_dev(a6, "href", "https://playbackimages.com");
				attr_dev(a6, "target", "_blank");
				add_location(a6, file$2, 48, 129, 3533);
				if (!src_url_equal(img1.src, img1_src_value = "assets/images/playback-images-logo.png")) attr_dev(img1, "src", img1_src_value);
				attr_dev(img1, "alt", "Logo van Playback Images");
				attr_dev(img1, "id", "playback-images-logo");
				attr_dev(img1, "class", "svelte-1qbsvv");
				add_location(img1, file$2, 50, 57, 3723);
				attr_dev(a7, "href", "https://playbackimages.com");
				attr_dev(a7, "target", "_blank");
				add_location(a7, file$2, 50, 4, 3670);
				add_location(p6, file$2, 47, 2, 3399);
				if (!src_url_equal(img2.src, img2_src_value = "assets/images/biesbosch-jacques.jpg")) attr_dev(img2, "src", img2_src_value);
				attr_dev(img2, "alt", "Jacques wordt gefilmd.");
				attr_dev(img2, "class", "svelte-1qbsvv");
				add_location(img2, file$2, 54, 4, 3878);
				attr_dev(figcaption1, "class", "svelte-1qbsvv");
				add_location(figcaption1, file$2, 55, 4, 3962);
				attr_dev(figure1, "class", "photo svelte-1qbsvv");
				add_location(figure1, file$2, 53, 2, 3850);
				if (!src_url_equal(img3.src, img3_src_value = "assets/images/biesbosch-bever.png")) attr_dev(img3, "src", img3_src_value);
				attr_dev(img3, "alt", "Een zwemmende bever in de Biesbosch.");
				attr_dev(img3, "class", "svelte-1qbsvv");
				add_location(img3, file$2, 59, 4, 4115);
				attr_dev(figcaption2, "class", "svelte-1qbsvv");
				add_location(figcaption2, file$2, 60, 4, 4211);
				attr_dev(figure2, "class", "photo svelte-1qbsvv");
				add_location(figure2, file$2, 58, 2, 4087);
				if (!src_url_equal(img4.src, img4_src_value = "assets/images/telelens.jpg")) attr_dev(img4, "src", img4_src_value);
				attr_dev(img4, "alt", "Bas met een camera met een grote telelens.");
				attr_dev(img4, "class", "svelte-1qbsvv");
				add_location(img4, file$2, 64, 4, 4337);
				attr_dev(figcaption3, "class", "svelte-1qbsvv");
				add_location(figcaption3, file$2, 65, 4, 4432);
				attr_dev(figure3, "class", "photo svelte-1qbsvv");
				add_location(figure3, file$2, 63, 2, 4309);
				attr_dev(section1, "class", "wie-zijn-wij svelte-1qbsvv");
				add_location(section1, file$2, 22, 0, 2294);
				attr_dev(h22, "class", "svelte-1qbsvv");
				add_location(h22, file$2, 71, 2, 4565);
				add_location(p7, file$2, 73, 2, 4608);
				attr_dev(section2, "class", "svelte-1qbsvv");
				add_location(section2, file$2, 70, 0, 4552);
				attr_dev(h23, "class", "svelte-1qbsvv");
				add_location(h23, file$2, 79, 2, 4934);
				attr_dev(a8, "href", "https://www.voordekunst.nl/projecten/14768-natuurdocumentaire-over-de-biesbosch-1");
				attr_dev(a8, "target", "_blank");
				add_location(a8, file$2, 83, 4, 5004);
				add_location(p8, file$2, 81, 2, 4961);
				attr_dev(section3, "class", "svelte-1qbsvv");
				add_location(section3, file$2, 78, 0, 4921);
				attr_dev(h24, "class", "svelte-1qbsvv");
				add_location(h24, file$2, 89, 2, 5243);
				attr_dev(a9, "href", "https://www.ad.nl/dordrecht/bas-start-crowdfunding-om-natuurdocu-over-biesbosch-af-te-kunnen-maken-grootse-natuur-in-een-klein-land~a1e15a649/");
				attr_dev(a9, "target", "_blank");
				add_location(a9, file$2, 92, 4, 5328);
				add_location(p9, file$2, 90, 2, 5267);
				add_location(em1, file$2, 97, 4, 5663);
				attr_dev(a10, "href", "https://www.rijnmond.nl/nieuws/1611636/chris-natuurlijk-van-4-februari-make-a-wish");
				attr_dev(a10, "target", "_blank");
				attr_dev(a10, "rel", "noreferrer noopener");
				add_location(a10, file$2, 98, 4, 5695);
				add_location(p10, file$2, 95, 2, 5549);
				attr_dev(a11, "href", "https://podcasts.apple.com/nl/podcast/chris-natuurlijk/id356338103?l=en");
				attr_dev(a11, "target", "_blank");
				attr_dev(a11, "rel", "noreferrer noopener");
				add_location(a11, file$2, 102, 24, 5908);
				add_location(p11, file$2, 101, 2, 5879);
				attr_dev(a12, "href", "https://www.rtvdordrecht.nl/nieuws/natuur/crowdfundingsactie-gestart-voor-natuurdocumentaire-over-de-biesbosch");
				attr_dev(a12, "target", "_blank");
				attr_dev(a12, "rel", "noreferrer noopener");
				add_location(a12, file$2, 107, 4, 6165);
				add_location(p12, file$2, 105, 2, 6081);
				if (!src_url_equal(img5.src, img5_src_value = "assets/images/jacques-rijnmond.jpg")) attr_dev(img5, "src", img5_src_value);
				attr_dev(img5, "alt", "Jacques wordt geïnterviewd.");
				attr_dev(img5, "class", "svelte-1qbsvv");
				add_location(img5, file$2, 113, 4, 6404);
				attr_dev(figcaption4, "class", "svelte-1qbsvv");
				add_location(figcaption4, file$2, 114, 4, 6492);
				attr_dev(figure4, "class", "photo svelte-1qbsvv");
				add_location(figure4, file$2, 112, 2, 6376);
				attr_dev(section4, "class", "svelte-1qbsvv");
				add_location(section4, file$2, 88, 0, 5230);
				attr_dev(h25, "class", "svelte-1qbsvv");
				add_location(h25, file$2, 119, 2, 6607);
				add_location(p13, file$2, 121, 2, 6655);
				add_location(p14, file$2, 123, 2, 6934);
				attr_dev(section5, "class", "svelte-1qbsvv");
				add_location(section5, file$2, 118, 0, 6594);
				if (!src_url_equal(img6.src, img6_src_value = "assets/images/porseleinhoen.jpg")) attr_dev(img6, "src", img6_src_value);
				attr_dev(img6, "alt", "Een porseleinhoen loopt door ondiep water.");
				attr_dev(img6, "class", "svelte-1qbsvv");
				add_location(img6, file$2, 127, 2, 7077);
				attr_dev(figcaption5, "class", "svelte-1qbsvv");
				add_location(figcaption5, file$2, 128, 2, 7175);
				attr_dev(figure5, "class", "photo svelte-1qbsvv");
				add_location(figure5, file$2, 126, 0, 7051);
				if (!src_url_equal(img7.src, img7_src_value = "assets/images/zeearend.jpg")) attr_dev(img7, "src", img7_src_value);
				attr_dev(img7, "alt", "Een zeearend.");
				attr_dev(img7, "class", "svelte-1qbsvv");
				add_location(img7, file$2, 132, 2, 7279);
				attr_dev(figcaption6, "class", "svelte-1qbsvv");
				add_location(figcaption6, file$2, 133, 2, 7343);
				attr_dev(figure6, "class", "photo svelte-1qbsvv");
				add_location(figure6, file$2, 131, 0, 7253);
				if (!src_url_equal(img8.src, img8_src_value = "assets/images/drone.jpg")) attr_dev(img8, "src", img8_src_value);
				attr_dev(img8, "alt", "De Biesbosch zoals gezien vanuit onze drone; water en een paar stukken groen.");
				attr_dev(img8, "class", "svelte-1qbsvv");
				add_location(img8, file$2, 137, 2, 7461);
				attr_dev(figcaption7, "class", "svelte-1qbsvv");
				add_location(figcaption7, file$2, 138, 2, 7586);
				attr_dev(figure7, "class", "photo svelte-1qbsvv");
				add_location(figure7, file$2, 136, 0, 7435);
				if (!src_url_equal(img9.src, img9_src_value = "assets/images/ijsvogel.jpg")) attr_dev(img9, "src", img9_src_value);
				attr_dev(img9, "alt", "Een ijsvogel heeft een baby snoek gevangen.");
				attr_dev(img9, "class", "svelte-1qbsvv");
				add_location(img9, file$2, 142, 2, 7713);
				attr_dev(figcaption8, "class", "svelte-1qbsvv");
				add_location(figcaption8, file$2, 143, 2, 7807);
				attr_dev(figure8, "class", "photo svelte-1qbsvv");
				add_location(figure8, file$2, 141, 0, 7687);
				if (!src_url_equal(img10.src, img10_src_value = "assets/images/water.jpg")) attr_dev(img10, "src", img10_src_value);
				attr_dev(img10, "alt", "Hoog water in de Noordwaard.");
				attr_dev(img10, "class", "svelte-1qbsvv");
				add_location(img10, file$2, 147, 2, 7917);
				attr_dev(figcaption9, "class", "svelte-1qbsvv");
				add_location(figcaption9, file$2, 148, 2, 7993);
				attr_dev(figure9, "class", "photo svelte-1qbsvv");
				add_location(figure9, file$2, 146, 0, 7891);
				attr_dev(h26, "class", "svelte-1qbsvv");
				add_location(h26, file$2, 152, 2, 8135);
				add_location(p15, file$2, 154, 2, 8162);
				if (!src_url_equal(img11.src, img11_src_value = "assets/images/stichting-mastboom-brosens-logo.png")) attr_dev(img11, "src", img11_src_value);
				attr_dev(img11, "alt", "Logo van De Mastboom Brosens Stichting");
				attr_dev(img11, "class", "svelte-1qbsvv");
				add_location(img11, file$2, 157, 4, 8266);
				attr_dev(a13, "href", "https://mastboomhuis.nl/de-stichting/");
				attr_dev(a13, "target", "_blank");
				add_location(a13, file$2, 158, 16, 8392);
				attr_dev(figcaption10, "class", "svelte-1qbsvv");
				add_location(figcaption10, file$2, 158, 4, 8380);
				attr_dev(figure10, "class", "photo sponsor-logo svelte-1qbsvv");
				add_location(figure10, file$2, 156, 2, 8225);
				attr_dev(a14, "href", "https://www.staatsbosbeheer.nl");
				attr_dev(a14, "target", "_blank");
				add_location(a14, file$2, 162, 8, 8535);
				add_location(li4, file$2, 162, 4, 8531);
				attr_dev(a15, "href", "https://www.biesboschstreekfonds.nl");
				attr_dev(a15, "target", "_blank");
				add_location(a15, file$2, 168, 8, 8658);
				add_location(li5, file$2, 168, 4, 8654);
				attr_dev(a16, "href", "https://www.dordrecht.nl");
				attr_dev(a16, "target", "_blank");
				add_location(a16, file$2, 175, 8, 8808);
				add_location(li6, file$2, 175, 4, 8804);
				attr_dev(a17, "href", "https://www.freenature.nl");
				attr_dev(a17, "target", "_blank");
				add_location(a17, file$2, 182, 8, 8930);
				add_location(li7, file$2, 182, 4, 8926);
				attr_dev(a18, "href", "https://zilvermeeuw.nl");
				attr_dev(a18, "target", "_blank");
				add_location(a18, file$2, 189, 8, 9046);
				add_location(li8, file$2, 189, 4, 9042);
				attr_dev(a19, "href", "https://www.cultuurfonds.nl");
				attr_dev(a19, "target", "_blank");
				add_location(a19, file$2, 196, 8, 9176);
				add_location(li9, file$2, 196, 4, 9172);
				attr_dev(a20, "href", "https://www.fysio-dubbeldam.nl");
				attr_dev(a20, "target", "_blank");
				add_location(a20, file$2, 203, 8, 9303);
				add_location(li10, file$2, 203, 4, 9299);
				attr_dev(a21, "href", "https://www.vdkm-bv.nl");
				attr_dev(a21, "target", "_blank");
				add_location(a21, file$2, 210, 8, 9436);
				add_location(li11, file$2, 210, 4, 9432);
				attr_dev(a22, "href", "https://wilgenpaard.nl");
				attr_dev(a22, "target", "_blank");
				add_location(a22, file$2, 217, 8, 9566);
				add_location(li12, file$2, 217, 4, 9562);
				attr_dev(a23, "href", "https://drijfdordrecht.nl");
				attr_dev(a23, "target", "_blank");
				add_location(a23, file$2, 224, 8, 9683);
				add_location(li13, file$2, 224, 4, 9679);
				attr_dev(a24, "href", "https://www.ontdekdordrecht.com");
				attr_dev(a24, "target", "_blank");
				add_location(a24, file$2, 231, 8, 9803);
				add_location(li14, file$2, 231, 4, 9799);
				add_location(ul1, file$2, 161, 2, 8521);
				attr_dev(section6, "class", "svelte-1qbsvv");
				add_location(section6, file$2, 151, 0, 8122);
				attr_dev(h27, "class", "svelte-1qbsvv");
				add_location(h27, file$2, 241, 2, 9956);
				add_location(p16, file$2, 242, 2, 9976);
				attr_dev(div1, "class", "contact-buttons svelte-1qbsvv");
				add_location(div1, file$2, 246, 2, 10068);
				attr_dev(section7, "class", "svelte-1qbsvv");
				add_location(section7, file$2, 240, 0, 9943);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div0, anchor);
				append_dev(div0, p0);
				append_dev(div0, t1);
				append_dev(div0, p1);
				insert_dev(target, t3, anchor);
				insert_dev(target, section0, anchor);
				append_dev(section0, h20);
				append_dev(section0, t5);
				append_dev(section0, p2);
				append_dev(p2, t6);
				append_dev(p2, a0);
				append_dev(p2, t8);
				append_dev(section0, t9);
				append_dev(section0, p3);
				append_dev(section0, t11);
				append_dev(section0, figure0);
				append_dev(figure0, img0);
				append_dev(figure0, t12);
				append_dev(figure0, figcaption0);
				insert_dev(target, t14, anchor);
				insert_dev(target, section1, anchor);
				append_dev(section1, h21);
				append_dev(section1, t16);
				append_dev(section1, p4);
				append_dev(section1, t18);
				append_dev(section1, ul0);
				append_dev(ul0, li0);
				append_dev(li0, a1);
				append_dev(li0, t20);
				append_dev(ul0, t21);
				append_dev(ul0, li1);
				append_dev(li1, a2);
				append_dev(li1, t23);
				append_dev(ul0, t24);
				append_dev(ul0, li2);
				append_dev(li2, a3);
				append_dev(li2, t26);
				append_dev(ul0, t27);
				append_dev(ul0, li3);
				append_dev(li3, a4);
				append_dev(li3, t29);
				append_dev(section1, t30);
				append_dev(section1, p5);
				append_dev(p5, t31);
				append_dev(p5, em0);
				append_dev(p5, t33);
				append_dev(section1, t34);
				append_dev(section1, p6);
				append_dev(p6, t35);
				append_dev(p6, a5);
				append_dev(p6, t37);
				append_dev(p6, a6);
				append_dev(p6, t39);
				append_dev(p6, a7);
				append_dev(a7, img1);
				append_dev(section1, t40);
				append_dev(section1, figure1);
				append_dev(figure1, img2);
				append_dev(figure1, t41);
				append_dev(figure1, figcaption1);
				append_dev(section1, t43);
				append_dev(section1, figure2);
				append_dev(figure2, img3);
				append_dev(figure2, t44);
				append_dev(figure2, figcaption2);
				append_dev(section1, t46);
				append_dev(section1, figure3);
				append_dev(figure3, img4);
				append_dev(figure3, t47);
				append_dev(figure3, figcaption3);
				insert_dev(target, t49, anchor);
				insert_dev(target, section2, anchor);
				append_dev(section2, h22);
				append_dev(section2, t51);
				append_dev(section2, p7);
				append_dev(section2, t53);
				mount_component(button0, section2, null);
				insert_dev(target, t54, anchor);
				insert_dev(target, section3, anchor);
				append_dev(section3, h23);
				append_dev(section3, t56);
				append_dev(section3, p8);
				append_dev(p8, t57);
				append_dev(p8, a8);
				append_dev(p8, t59);
				insert_dev(target, t60, anchor);
				insert_dev(target, section4, anchor);
				append_dev(section4, h24);
				append_dev(section4, t62);
				append_dev(section4, p9);
				append_dev(p9, t63);
				append_dev(p9, a9);
				append_dev(p9, t65);
				append_dev(section4, t66);
				append_dev(section4, p10);
				append_dev(p10, t67);
				append_dev(p10, em1);
				append_dev(p10, t69);
				append_dev(p10, a10);
				append_dev(section4, t71);
				append_dev(section4, p11);
				append_dev(p11, t72);
				append_dev(p11, a11);
				append_dev(p11, t74);
				append_dev(section4, t75);
				append_dev(section4, p12);
				append_dev(p12, t76);
				append_dev(p12, a12);
				append_dev(section4, t78);
				append_dev(section4, figure4);
				append_dev(figure4, img5);
				append_dev(figure4, t79);
				append_dev(figure4, figcaption4);
				insert_dev(target, t81, anchor);
				insert_dev(target, section5, anchor);
				append_dev(section5, h25);
				append_dev(section5, t83);
				append_dev(section5, p13);
				append_dev(section5, t85);
				append_dev(section5, p14);
				insert_dev(target, t87, anchor);
				insert_dev(target, figure5, anchor);
				append_dev(figure5, img6);
				append_dev(figure5, t88);
				append_dev(figure5, figcaption5);
				insert_dev(target, t90, anchor);
				insert_dev(target, figure6, anchor);
				append_dev(figure6, img7);
				append_dev(figure6, t91);
				append_dev(figure6, figcaption6);
				insert_dev(target, t93, anchor);
				insert_dev(target, figure7, anchor);
				append_dev(figure7, img8);
				append_dev(figure7, t94);
				append_dev(figure7, figcaption7);
				insert_dev(target, t96, anchor);
				insert_dev(target, figure8, anchor);
				append_dev(figure8, img9);
				append_dev(figure8, t97);
				append_dev(figure8, figcaption8);
				insert_dev(target, t99, anchor);
				insert_dev(target, figure9, anchor);
				append_dev(figure9, img10);
				append_dev(figure9, t100);
				append_dev(figure9, figcaption9);
				insert_dev(target, t102, anchor);
				insert_dev(target, section6, anchor);
				append_dev(section6, h26);
				append_dev(section6, t104);
				append_dev(section6, p15);
				append_dev(section6, t106);
				append_dev(section6, figure10);
				append_dev(figure10, img11);
				append_dev(figure10, t107);
				append_dev(figure10, figcaption10);
				append_dev(figcaption10, a13);
				append_dev(section6, t109);
				append_dev(section6, ul1);
				append_dev(ul1, li4);
				append_dev(li4, a14);
				append_dev(ul1, t111);
				append_dev(ul1, li5);
				append_dev(li5, a15);
				append_dev(ul1, t113);
				append_dev(ul1, li6);
				append_dev(li6, a16);
				append_dev(ul1, t115);
				append_dev(ul1, li7);
				append_dev(li7, a17);
				append_dev(ul1, t117);
				append_dev(ul1, li8);
				append_dev(li8, a18);
				append_dev(ul1, t119);
				append_dev(ul1, li9);
				append_dev(li9, a19);
				append_dev(ul1, t121);
				append_dev(ul1, li10);
				append_dev(li10, a20);
				append_dev(ul1, t123);
				append_dev(ul1, li11);
				append_dev(li11, a21);
				append_dev(ul1, t125);
				append_dev(ul1, li12);
				append_dev(li12, a22);
				append_dev(ul1, t127);
				append_dev(ul1, li13);
				append_dev(li13, a23);
				append_dev(ul1, t129);
				append_dev(ul1, li14);
				append_dev(li14, a24);
				insert_dev(target, t131, anchor);
				insert_dev(target, section7, anchor);
				append_dev(section7, h27);
				append_dev(section7, t133);
				append_dev(section7, p16);
				append_dev(section7, t135);
				append_dev(section7, div1);
				mount_component(button1, div1, null);
				append_dev(div1, t136);
				mount_component(button2, div1, null);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				const button0_changes = {};

				if (dirty & /*$$scope*/ 1) {
					button0_changes.$$scope = { dirty, ctx };
				}

				button0.$set(button0_changes);
				const button1_changes = {};

				if (dirty & /*$$scope*/ 1) {
					button1_changes.$$scope = { dirty, ctx };
				}

				button1.$set(button1_changes);
				const button2_changes = {};

				if (dirty & /*$$scope*/ 1) {
					button2_changes.$$scope = { dirty, ctx };
				}

				button2.$set(button2_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(button0.$$.fragment, local);
				transition_in(button1.$$.fragment, local);
				transition_in(button2.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(button0.$$.fragment, local);
				transition_out(button1.$$.fragment, local);
				transition_out(button2.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div0);
					detach_dev(t3);
					detach_dev(section0);
					detach_dev(t14);
					detach_dev(section1);
					detach_dev(t49);
					detach_dev(section2);
					detach_dev(t54);
					detach_dev(section3);
					detach_dev(t60);
					detach_dev(section4);
					detach_dev(t81);
					detach_dev(section5);
					detach_dev(t87);
					detach_dev(figure5);
					detach_dev(t90);
					detach_dev(figure6);
					detach_dev(t93);
					detach_dev(figure7);
					detach_dev(t96);
					detach_dev(figure8);
					detach_dev(t99);
					detach_dev(figure9);
					detach_dev(t102);
					detach_dev(section6);
					detach_dev(t131);
					detach_dev(section7);
				}

				destroy_component(button0);
				destroy_component(button1);
				destroy_component(button2);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Home', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({ Button });
		return [];
	}

	class Home extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home",
				options,
				id: create_fragment$2.name
			});
		}
	}

	/* src\routes\Sources.svelte generated by Svelte v4.2.8 */
	const file$1 = "src\\routes\\Sources.svelte";

	function create_fragment$1(ctx) {
		let h1;
		let t1;
		let p;
		let t3;
		let section;
		let ol;
		let li0;
		let t4;
		let em0;
		let t6;
		let a0;
		let t8;
		let t9;
		let li1;
		let t10;
		let a1;
		let t12;
		let t13;
		let li2;
		let t14;
		let a2;
		let t16;
		let t17;
		let li3;
		let t18;
		let em1;
		let t20;
		let a3;
		let t22;
		let t23;
		let li4;
		let t24;
		let em2;
		let t26;
		let t27;
		let li5;
		let t28;
		let em3;
		let t30;
		let a4;
		let t32;
		let t33;
		let li6;
		let t34;
		let em4;
		let t36;
		let a5;
		let t38;
		let t39;
		let li7;
		let t40;
		let em5;
		let t42;
		let a6;
		let t44;
		let t45;
		let li8;
		let t46;
		let a7;
		let t48;
		let t49;
		let li9;
		let t50;
		let a8;
		let t52;
		let t53;
		let li10;
		let t54;
		let a9;
		let t56;
		let t57;
		let li11;
		let t58;
		let a10;
		let t60;
		let t61;
		let li12;
		let t62;
		let em6;
		let t64;
		let t65;
		let li13;
		let t67;
		let li14;
		let t68;
		let em7;
		let t70;
		let a11;
		let t72;
		let t73;
		let li15;
		let t74;
		let em8;
		let t76;
		let a12;
		let t78;
		let t79;
		let li16;
		let t80;
		let em9;
		let t82;
		let t83;
		let li17;
		let t84;
		let a13;
		let t86;
		let t87;
		let li18;
		let t88;
		let em10;
		let t90;
		let a14;
		let t92;
		let t93;
		let li19;
		let t94;
		let a15;
		let t96;
		let t97;
		let li20;
		let t98;
		let a16;
		let t100;
		let t101;
		let li21;
		let t102;
		let em11;
		let t104;
		let t105;
		let li22;
		let t106;
		let a17;
		let t108;
		let t109;
		let li23;
		let t110;
		let a18;
		let t112;
		let t113;
		let li24;
		let t114;
		let a19;
		let t116;
		let t117;
		let li25;
		let t118;
		let em12;
		let t120;
		let a20;
		let t122;
		let t123;
		let li26;
		let t124;
		let a21;
		let t126;
		let t127;
		let li27;
		let t128;
		let a22;
		let t130;
		let t131;
		let li28;
		let t132;
		let a23;
		let t134;
		let t135;
		let li29;
		let t136;
		let a24;
		let t138;
		let t139;
		let li30;
		let t140;
		let em13;
		let t142;
		let a25;
		let t144;
		let t145;
		let li31;
		let t146;
		let a26;
		let t148;
		let t149;
		let li32;
		let t150;
		let a27;
		let t152;
		let t153;
		let li33;
		let t155;
		let li34;
		let t156;
		let a28;
		let t158;
		let t159;
		let li35;
		let t160;
		let em14;
		let t162;
		let a29;
		let t164;
		let t165;
		let li36;
		let t166;
		let a30;
		let t168;
		let t169;
		let li37;
		let t170;
		let a31;
		let t172;
		let t173;
		let li38;
		let t174;
		let a32;
		let t176;
		let t177;
		let li39;
		let t178;
		let em15;
		let t180;
		let a33;
		let t182;
		let t183;
		let li40;
		let t184;
		let a34;
		let t186;
		let t187;
		let li41;
		let t188;
		let a35;
		let t190;
		let t191;
		let li42;
		let t192;
		let a36;
		let t194;
		let t195;
		let li43;
		let t196;
		let em16;
		let t198;
		let t199;
		let li44;
		let t200;
		let a37;
		let t202;
		let t203;
		let li45;
		let t204;
		let a38;
		let t206;
		let t207;
		let li46;
		let t208;
		let a39;
		let t210;
		let t211;
		let li47;
		let t212;
		let a40;
		let t214;
		let t215;
		let li48;
		let t216;
		let a41;
		let t218;
		let t219;
		let li49;
		let t220;
		let a42;
		let t222;
		let t223;
		let li50;
		let t224;
		let a43;
		let t226;
		let t227;
		let li51;
		let t228;
		let a44;
		let t230;
		let t231;
		let li52;
		let t232;
		let em17;
		let t234;
		let t235;
		let li53;
		let t237;
		let li54;
		let t238;
		let em18;
		let t240;
		let a45;
		let t242;

		const block = {
			c: function create() {
				h1 = element("h1");
				h1.textContent = "Bronnen";
				t1 = space();
				p = element("p");
				p.textContent = "Hieronder vindt u de volledige bronnenlijst voor de film. Deze is opgemaakt conform het verwijssysteem van de Chicago Manual of Style.";
				t3 = space();
				section = element("section");
				ol = element("ol");
				li0 = element("li");
				t4 = text("Berg, A. Y. van den, and J. A. Inberg. 2008. “Een Soortenlijst van de Biesbosch–oproep Om Mee Te Strepen.” ");
				em0 = element("em");
				em0.textContent = "Gorteria Dutch Botanical Archives";
				t6 = text(".\r\n      ");
				a0 = element("a");
				a0.textContent = "https://natuurtijdschriften.nl/pub/537463/GOR2008033003003.pdf";
				t8 = text(".");
				t9 = space();
				li1 = element("li");
				t10 = text("“Biesbosch.nu.” n.d. Accessed December 13, 2023.\r\n      ");
				a1 = element("a");
				a1.textContent = "http://www.biesbosch.nu/historiepagina.php?code=12";
				t12 = text(".");
				t13 = space();
				li2 = element("li");
				t14 = text("“Biesbosch verliest getijdenwerking.” n.d. Erfgoedhuis Zuid-Holland. Accessed December 13, 2023. \r\n      ");
				a2 = element("a");
				a2.textContent = "https://geschiedenisvanzuidholland.nl/verhalen/verhalen/biesbosch-verliest-getijdenwerking/";
				t16 = text(".");
				t17 = space();
				li3 = element("li");
				t18 = text("“Bijvangst: IJsvogel Op de Gevoelige Plaat.” n.d. ");
				em1 = element("em");
				em1.textContent = "Sportvisserij Nederland";
				t20 = text(" (blog). Accessed July 25, 2023. \r\n      ");
				a3 = element("a");
				a3.textContent = "https://www.sportvisserijnederland.nl/actueel/nieuws/21508/bijvangst-ijsvogel-op-de-gevoelige-plaat.html";
				t22 = text(".");
				t23 = space();
				li4 = element("li");
				t24 = text("Blaas, Jan, Leen Rietveld, and Jacques van der Neut. 2014. “Landmeters Blij Met Grenskwesties.” ");
				em2 = element("em");
				em2.textContent = "AD De Dordtenaar";
				t26 = text(", July 2, 2014.");
				t27 = space();
				li5 = element("li");
				t28 = text("Bodegraven, Paul van. 2020. “Interview: De Biesbosch Voor En Na de Afsluiting van Het Haringvliet.” ");
				em3 = element("em");
				em3.textContent = "De Levende Natuur";
				t30 = text(".\r\n      ");
				a4 = element("a");
				a4.textContent = "https://natuurtijdschriften.nl/pub/1019392";
				t32 = text(".");
				t33 = space();
				li6 = element("li");
				t34 = text("Boesveld, Arno, and Jacques van der Neut. 1996. “Verspreidbladig Goudveil En Tongvaren in de Biesbosch.” ");
				em4 = element("em");
				em4.textContent = "De Levende Natuur";
				t36 = text(".\r\n      ");
				a5 = element("a");
				a5.textContent = "https://natuurtijdschriften.nl/pub/494951/DLN0970110131.pdf";
				t38 = text(".");
				t39 = space();
				li7 = element("li");
				t40 = text("Boxel, John van. 2008. “Signalen van Klimaatveranderingen.” ");
				em5 = element("em");
				em5.textContent = "Academia.edu";
				t42 = text(", January.\r\n      ");
				a6 = element("a");
				a6.textContent = "https://www.academia.edu/download/41747792/Signalen_van_klimaatveranderingen20160129-31067-1no5scg.pdf";
				t44 = text(".");
				t45 = space();
				li8 = element("li");
				t46 = text("“Braakbal van ijsvogel.” n.d. BNNVARA - Vroege vogels. Accessed July 25, 2023. \r\n      ");
				a7 = element("a");
				a7.textContent = "https://www.bnnvara.nl/vroegevogels/artikelen/braakbal-van-ijsvogel-zelf-geschoten";
				t48 = text(".");
				t49 = space();
				li9 = element("li");
				t50 = text("“Brandgans.” n.d. Vogelbescherming Nederland. Accessed July 23, 2023.\r\n      ");
				a8 = element("a");
				a8.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/brandgans";
				t52 = text(".");
				t53 = space();
				li10 = element("li");
				t54 = text("“Broedende visarenden in de Biesbosch ook dit jaar weer live te volgen.” 2023. Vogelbescherming Nederland. March 19, 2023.\r\n      ");
				a9 = element("a");
				a9.textContent = "https://www.vogelbescherming.nl/actueel/bericht/broedende-visarenden-in-de-biesbosch-ook-dit-jaar-weer-live-te-volgen";
				t56 = text(".");
				t57 = space();
				li11 = element("li");
				t58 = text("“Bruine kiekendief.” n.d. Vogelbescherming Nederland. Accessed July 25, 2023.\r\n      ");
				a10 = element("a");
				a10.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/bruine-kiekendief";
				t60 = text(".");
				t61 = space();
				li12 = element("li");
				t62 = text("Buisman, J. 1995. ");
				em6 = element("em");
				em6.textContent = "Duizend jaar weer, wind en water in de Lage Landen: Tot 1300.";
				t64 = text(" Van Wijnen.");
				t65 = space();
				li13 = element("li");
				li13.textContent = "Bureau Noordwaard, Rijkswaterstaat. 2006. “Ontpoldering Noordwaard Startnotitie MER.”";
				t67 = space();
				li14 = element("li");
				t68 = text("De Minister van Landbouw, Natuur en Voedselkwaliteit. n.d. ");
				em7 = element("em");
				em7.textContent = "Ontwerpbesluit Biesbosch";
				t70 = text(".\r\n      ");
				a11 = element("a");
				a11.textContent = "https://www.natura2000.nl/sites/default/files/gebieden_aanwijzing_en_archief/112/n2k112_wb_hrvr_biesbosch.pdf";
				t72 = text(".");
				t73 = space();
				li15 = element("li");
				t74 = text("De Vries, J. M. 2000. “Ruimte Voor de Rivier: Discussienota.” ");
				em8 = element("em");
				em8.textContent = "Nota van de Staatssecretaris";
				t76 = text(".\r\n      ");
				a12 = element("a");
				a12.textContent = "https://repository.tudelft.nl/islandora/object/uuid:cbfc7575-6e6d-4b77-bdae-025fe34badba";
				t78 = text(".");
				t79 = space();
				li16 = element("li");
				t80 = text("Esch, J. M. van der. 2005. ");
				em9 = element("em");
				em9.textContent = "Tussen bies en wilg: over kooikers, otterjagers en biezensnijders in de oude Biesbosch.";
				t82 = text(" De Stroombaan.");
				t83 = space();
				li17 = element("li");
				t84 = text("“Ganzen horen bij Nederland.” n.d. Staatsbosbeheer. Accessed July 23, 2023.\r\n      ");
				a13 = element("a");
				a13.textContent = "https://www.staatsbosbeheer.nl/wat-we-doen/flora-en-fauna/ganzen";
				t86 = text(".");
				t87 = space();
				li18 = element("li");
				t88 = text("Garjeanne. 1908. “Een Nieuwe Lythracee Voor de Nederlandsche Flora.” ");
				em10 = element("em");
				em10.textContent = "De Levende Natuur";
				t90 = text(".\r\n      ");
				a14 = element("a");
				a14.textContent = "https://natuurtijdschriften.nl/pub/486206/DLN0131241267.pdf";
				t92 = text(".");
				t93 = space();
				li19 = element("li");
				t94 = text("“Groep Reeën.” 2017. Het Ree. Vereniging Het Ree. March 19, 2017.\r\n      ");
				a15 = element("a");
				a15.textContent = "https://hetree.nl/groep-reeen/";
				t96 = text(".");
				t97 = space();
				li20 = element("li");
				t98 = text("“Haas.” n.d. De Zoogdiervereniging. Accessed March 9, 2022.\r\n      ");
				a16 = element("a");
				a16.textContent = "https://www.zoogdiervereniging.nl/zoogdiersoorten/haas";
				t100 = text(".");
				t101 = space();
				li21 = element("li");
				t102 = text("Ham, Willem van der. 2003. ");
				em11 = element("em");
				em11.textContent = "De Grote Waard: geschiedenis van een Hollands landschap";
				t104 = text(". Uitgeverij 010.");
				t105 = space();
				li22 = element("li");
				t106 = text("“Het verschil tussen een man en vrouw ijsvogel.” n.d. BNNVARA - Vroege vogels. Accessed July 25, 2023. \r\n      ");
				a17 = element("a");
				a17.textContent = "https://www.bnnvara.nl/vroegevogels/artikelen/het-verschil-tussen-een-man-en-vrouw-ijsvogel";
				t108 = text(".");
				t109 = space();
				li23 = element("li");
				t110 = text("“Historie – Nationaal Park De Biesbosch.” n.d. Nationaal Park De Biesbosch. Accessed March 17, 2022.\r\n      ");
				a18 = element("a");
				a18.textContent = "https://np-debiesbosch.nl/de-biesbosch/historie/";
				t112 = text(".");
				t113 = space();
				li24 = element("li");
				t114 = text("Hollander, Hans. 2017. “Hazen in de voortplanting: rammelen!” De Zoogdiervereniging. March 16, 2017. \r\n      ");
				a19 = element("a");
				a19.textContent = "https://www.zoogdiervereniging.nl/nieuws/2017/hazen-de-voortplanting-rammelen";
				t116 = text(".");
				t117 = space();
				li25 = element("li");
				t118 = text("Kimstra, and Kimstra. 2016. “Arenden in de Biesbosch.” ");
				em12 = element("em");
				em12.textContent = "Natura";
				t120 = text(".\r\n      ");
				a20 = element("a");
				a20.textContent = "https://natuurtijdschriften.nl/pub/641927/Natura2016113003001.pdf";
				t122 = text(".");
				t123 = space();
				li26 = element("li");
				t124 = text("“Klissen geen probleem voor dierenwelzijn.” n.d. Accessed December 13, 2023. \r\n      ");
				a21 = element("a");
				a21.textContent = "https://www.freenature.nl/nieuws/2018/klissen-geen-probleem-voor-dierenwelzijn";
				t126 = text(".");
				t127 = space();
				li27 = element("li");
				t128 = text("Knoester, M., H. Oosterwijk, T. Pietersz, and A. Prakken. n.d. “Geheimen van de Kust.” Accessed April 23, 2022.\r\n      ");
				a22 = element("a");
				a22.textContent = "https://www.researchgate.net/profile/Rwpm-Laane-rip-2/publication/277665143_Geheimen_van_de_kust/links/556f500a08aec226830a8bd8/Geheimen-van-de-kust.pdf";
				t130 = text(".");
				t131 = space();
				li28 = element("li");
				t132 = text("“Kolgans.” 2015. De Jagersvereniging. May 31, 2015.\r\n      ");
				a23 = element("a");
				a23.textContent = "https://www.jagersvereniging.nl/jagen/diersoorten/kolgans/";
				t134 = text(".");
				t135 = space();
				li29 = element("li");
				t136 = text("———. n.d. Vogelbescherming Nederland. Accessed July 23, 2023.\r\n      ");
				a24 = element("a");
				a24.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/kolgans.";
				t138 = text(".");
				t139 = space();
				li30 = element("li");
				t140 = text("Lensink R., van den Bergh L. M. J. &. Voslamber B. 2013. “De geschiedenis van de Grauwe Gans als Nederlandse broedvogel in de 20e eeuw.” ");
				em13 = element("em");
				em13.textContent = "Limosa";
				t142 = text(".\r\n      ");
				a25 = element("a");
				a25.textContent = "https://pub.sovon.nl/pub/publicatie/18308";
				t144 = text(".");
				t145 = space();
				li31 = element("li");
				t146 = text("“Meerkoet.” n.d. Vogelbescherming Nederland. Accessed July 25, 2023.\r\n      ");
				a26 = element("a");
				a26.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/meerkoet";
				t148 = text(".");
				t149 = space();
				li32 = element("li");
				t150 = text("Nationaal Park de Biesbosch, Staatsbosbeheer, and Streekfonds Streeknetwerk Biesbosch. 2015. “WATER in En Om de Biesbosch - Docentenhandleiding.” \r\n      ");
				a27 = element("a");
				a27.textContent = "https://np-debiesbosch.nl/wp-content/uploads/2015/06/WATER-lesbrief-leerkracht.pdf";
				t152 = text(".");
				t153 = space();
				li33 = element("li");
				li33.textContent = "Natura 2000-Ministerie van Landbouw, Natuur en Voedselkwaliteit. 2008. “Profielen Vogels - Porseleinhoen.”";
				t155 = space();
				li34 = element("li");
				t156 = text("Neut, Jacques van der. 2018. “Futen vechten in de Biesbosch om een territorium.” AD. September 14, 2018.\r\n      ");
				a28 = element("a");
				a28.textContent = "https://www.ad.nl/rivierenland/futen-vechten-in-de-biesbosch-om-een-territorium~ac0b9c38/";
				t158 = text(".");
				t159 = space();
				li35 = element("li");
				t160 = text("Nolet, and Hoekstra. 1990. “Het Eerste Jaar Na Uitzetting Bevers in de Biesbosch.” ");
				em14 = element("em");
				em14.textContent = "Zoogdier";
				t162 = text(".\r\n      ");
				a29 = element("a");
				a29.textContent = "https://natuurtijdschriften.nl/pub/589432";
				t164 = text(".");
				t165 = space();
				li36 = element("li");
				t166 = text("Overland, in opdracht van De Bastei, Nijmegen. . n.d. “De bijna-ramp 1995.” Mijn Gelderland. Accessed November 7, 2022. \r\n      ");
				a30 = element("a");
				a30.textContent = "https://mijngelderland.nl/inhoud/specials/verbeelding-van-de-waal/de-bijna-ramp-1995";
				t168 = text(".");
				t169 = space();
				li37 = element("li");
				t170 = text("Rijkswaterstaat. n.d. “De Deltawerken.” Rijkswaterstaat.nl. Accessed August 15, 2022.\r\n      ");
				a31 = element("a");
				a31.textContent = "https://www.rijkswaterstaat.nl/water/waterbeheer/bescherming-tegen-het-water/waterkeringen/deltawerken";
				t172 = text(".");
				t173 = space();
				li38 = element("li");
				t174 = text("Schenk, Dorine. 2019. “Bijen surfen op zelfgemaakte golven naar de waterkant.” New Scientist. November 28, 2019. \r\n      ");
				a32 = element("a");
				a32.textContent = "https://www.newscientist.nl/nieuws/bijen-surfen-op-zelfgemaakte-golven-naar-de-waterkant/";
				t176 = text(".");
				t177 = space();
				li39 = element("li");
				t178 = text("Schiereck, G. J., and P. J. Visser. 2021. “De Sint-Elisabethsvloed: Feiten En Fictie.” ");
				em15 = element("em");
				em15.textContent = "Vloed: De Sint-Elisabethsvloed 1421 ….";
				t180 = space();
				a33 = element("a");
				a33.textContent = "https://research.tudelft.nl/en/publications/de-sint-elisabethsvloed-feiten-en-fictie";
				t182 = text(".");
				t183 = space();
				li40 = element("li");
				t184 = text("Sovon Vogelonderzoek Nederland. n.d. “Porseleinhoen.” Accessed December 13, 2023.\r\n      ");
				a34 = element("a");
				a34.textContent = "https://stats.sovon.nl/stats/soort/4080";
				t186 = text(".");
				t187 = space();
				li41 = element("li");
				t188 = text("Staatsbosbeheer. n.d. “Over de Biesbosch.” Staatsbosbeheer. Accessed 2 maart 2022. \r\n      ");
				a35 = element("a");
				a35.textContent = "https://www.staatsbosbeheer.nl/uit-in-de-natuur/locaties/biesbosch/over-de-biesbosch";
				t190 = text(".");
				t191 = space();
				li42 = element("li");
				t192 = text("“Turf.” n.d. Canon van Nederland. Accessed April 23, 2022.\r\n      ");
				a36 = element("a");
				a36.textContent = "https://www.canonvannederland.nl/nl/utrecht/onderwijscanon/turf";
				t194 = text(".");
				t195 = space();
				li43 = element("li");
				t196 = text("Verhey, C. J. 1950. “De Biesbosch in Gevaar!” ");
				em16 = element("em");
				em16.textContent = "De Levende Natuur";
				t198 = text(" 53 (10): 181–88.");
				t199 = space();
				li44 = element("li");
				t200 = text("“Visarend.” n.d. Vogelbescherming Nederland. Accessed July 25, 2023.\r\n      ");
				a37 = element("a");
				a37.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/visarend";
				t202 = text(".");
				t203 = space();
				li45 = element("li");
				t204 = text("Vogelbescherming Nederland. n.d. “Blauwe reiger.” Accessed November 16, 2022a.\r\n      ");
				a38 = element("a");
				a38.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/blauwe-reiger.";
				t206 = text(".");
				t207 = space();
				li46 = element("li");
				t208 = text("———. n.d. “Grote zilverreiger.” Accessed November 16, 2022b.\r\n      ");
				a39 = element("a");
				a39.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/grote-zilverreiger";
				t210 = text(".");
				t211 = space();
				li47 = element("li");
				t212 = text("———. n.d. “Kleine zilverreiger.” Accessed November 16, 2022c.\r\n      ");
				a40 = element("a");
				a40.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/kleine-zilverreiger";
				t214 = text(".");
				t215 = space();
				li48 = element("li");
				t216 = text("———. n.d. “Koereiger.” Accessed November 16, 2022d.\r\n      ");
				a41 = element("a");
				a41.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/koereiger";
				t218 = text(".");
				t219 = space();
				li49 = element("li");
				t220 = text("———. n.d. “Lepelaar.” Accessed November 3, 2022e.\r\n      ");
				a42 = element("a");
				a42.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/lepelaar";
				t222 = text(".");
				t223 = space();
				li50 = element("li");
				t224 = text("———. n.d. “Sperwer.” Accessed November 16, 2022f.\r\n      ");
				a43 = element("a");
				a43.textContent = "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/sperwer";
				t226 = text(".");
				t227 = space();
				li51 = element("li");
				t228 = text("“Voortplanting - IJsvogels.nl.” 2014. IJsvogels.nl - Alles over ijsvogels. IJsvogels.nl. July 17, 2014.\r\n      ");
				a44 = element("a");
				a44.textContent = "https://www.ijsvogels.nl/voortplanting-2/";
				t230 = text(".");
				t231 = space();
				li52 = element("li");
				t232 = text("Wijk, Wim van. 2009. ");
				em17 = element("em");
				em17.textContent = "Het Biesbosch boek";
				t234 = text(". Waanders Uitgeverij.");
				t235 = space();
				li53 = element("li");
				li53.textContent = "———. 2021. Biesbosch en Haringvliet: natuur van wereldklasse. WBOOKS.";
				t237 = space();
				li54 = element("li");
				t238 = text("Zingstra. 1997. “De Biesbosch Breidt Uit.” ");
				em18 = element("em");
				em18.textContent = "De Levende Natuur";
				t240 = text(".\r\n      ");
				a45 = element("a");
				a45.textContent = "https://natuurtijdschriften.nl/pub/495017/DLN0980610682.pdf";
				t242 = text(".");
				add_location(h1, file$1, 0, 0, 0);
				add_location(p, file$1, 2, 0, 20);
				add_location(em0, file$1, 7, 113, 323);
				attr_dev(a0, "target", "_blank");
				attr_dev(a0, "href", "https://natuurtijdschriften.nl/pub/537463/GOR2008033003003.pdf");
				attr_dev(a0, "class", "svelte-1rf3m8t");
				add_location(a0, file$1, 8, 6, 374);
				attr_dev(li0, "class", "svelte-1rf3m8t");
				add_location(li0, file$1, 6, 4, 204);
				attr_dev(a1, "target", "_blank");
				attr_dev(a1, "href", "http://www.biesbosch.nu/historiepagina.php?code=12");
				attr_dev(a1, "class", "svelte-1rf3m8t");
				add_location(a1, file$1, 12, 6, 615);
				attr_dev(li1, "class", "svelte-1rf3m8t");
				add_location(li1, file$1, 10, 4, 547);
				attr_dev(a2, "target", "_blank");
				attr_dev(a2, "href", "https://geschiedenisvanzuidholland.nl/verhalen/verhalen/biesbosch-verliest-getijdenwerking/");
				attr_dev(a2, "class", "svelte-1rf3m8t");
				add_location(a2, file$1, 16, 6, 881);
				attr_dev(li2, "class", "svelte-1rf3m8t");
				add_location(li2, file$1, 14, 4, 764);
				add_location(em1, file$1, 19, 56, 1174);
				attr_dev(a3, "target", "_blank");
				attr_dev(a3, "href", "https://www.sportvisserijnederland.nl/actueel/nieuws/21508/bijvangst-ijsvogel-op-de-gevoelige-plaat.html");
				attr_dev(a3, "class", "svelte-1rf3m8t");
				add_location(a3, file$1, 20, 6, 1247);
				attr_dev(li3, "class", "svelte-1rf3m8t");
				add_location(li3, file$1, 18, 4, 1112);
				add_location(em2, file$1, 23, 102, 1612);
				attr_dev(li4, "class", "svelte-1rf3m8t");
				add_location(li4, file$1, 22, 4, 1504);
				add_location(em3, file$1, 26, 106, 1781);
				attr_dev(a4, "target", "_blank");
				attr_dev(a4, "href", "https://natuurtijdschriften.nl/pub/1019392");
				attr_dev(a4, "class", "svelte-1rf3m8t");
				add_location(a4, file$1, 27, 6, 1816);
				attr_dev(li5, "class", "svelte-1rf3m8t");
				add_location(li5, file$1, 25, 4, 1669);
				add_location(em4, file$1, 30, 111, 2066);
				attr_dev(a5, "target", "_blank");
				attr_dev(a5, "href", "https://natuurtijdschriften.nl/pub/494951/DLN0970110131.pdf");
				attr_dev(a5, "class", "svelte-1rf3m8t");
				add_location(a5, file$1, 31, 6, 2101);
				attr_dev(li6, "class", "svelte-1rf3m8t");
				add_location(li6, file$1, 29, 4, 1949);
				add_location(em5, file$1, 34, 66, 2340);
				attr_dev(a6, "target", "_blank");
				attr_dev(a6, "href", "https://www.academia.edu/download/41747792/Signalen_van_klimaatveranderingen20160129-31067-1no5scg.pdf");
				attr_dev(a6, "class", "svelte-1rf3m8t");
				add_location(a6, file$1, 35, 6, 2379);
				attr_dev(li7, "class", "svelte-1rf3m8t");
				add_location(li7, file$1, 33, 4, 2268);
				attr_dev(a7, "target", "_blank");
				attr_dev(a7, "href", "https://www.bnnvara.nl/vroegevogels/artikelen/braakbal-van-ijsvogel-zelf-geschoten");
				attr_dev(a7, "class", "svelte-1rf3m8t");
				add_location(a7, file$1, 39, 6, 2731);
				attr_dev(li8, "class", "svelte-1rf3m8t");
				add_location(li8, file$1, 37, 4, 2632);
				attr_dev(a8, "target", "_blank");
				attr_dev(a8, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/brandgans");
				attr_dev(a8, "class", "svelte-1rf3m8t");
				add_location(a8, file$1, 43, 6, 3033);
				attr_dev(li9, "class", "svelte-1rf3m8t");
				add_location(li9, file$1, 41, 4, 2944);
				attr_dev(a9, "target", "_blank");
				attr_dev(a9, "href", "https://www.vogelbescherming.nl/actueel/bericht/broedende-visarenden-in-de-biesbosch-ook-dit-jaar-weer-live-te-volgen");
				attr_dev(a9, "class", "svelte-1rf3m8t");
				add_location(a9, file$1, 47, 6, 3404);
				attr_dev(li10, "class", "svelte-1rf3m8t");
				add_location(li10, file$1, 45, 4, 3262);
				attr_dev(a10, "target", "_blank");
				attr_dev(a10, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/bruine-kiekendief");
				attr_dev(a10, "class", "svelte-1rf3m8t");
				add_location(a10, file$1, 51, 6, 3784);
				attr_dev(li11, "class", "svelte-1rf3m8t");
				add_location(li11, file$1, 49, 4, 3687);
				add_location(em6, file$1, 54, 24, 4059);
				attr_dev(li12, "class", "svelte-1rf3m8t");
				add_location(li12, file$1, 53, 4, 4029);
				attr_dev(li13, "class", "svelte-1rf3m8t");
				add_location(li13, file$1, 56, 4, 4158);
				add_location(em7, file$1, 60, 65, 4343);
				attr_dev(a11, "target", "_blank");
				attr_dev(a11, "href", "https://www.natura2000.nl/sites/default/files/gebieden_aanwijzing_en_archief/112/n2k112_wb_hrvr_biesbosch.pdf");
				attr_dev(a11, "class", "svelte-1rf3m8t");
				add_location(a11, file$1, 61, 6, 4385);
				attr_dev(li14, "class", "svelte-1rf3m8t");
				add_location(li14, file$1, 59, 4, 4272);
				add_location(em8, file$1, 64, 68, 4726);
				attr_dev(a12, "target", "_blank");
				attr_dev(a12, "href", "https://repository.tudelft.nl/islandora/object/uuid:cbfc7575-6e6d-4b77-bdae-025fe34badba");
				attr_dev(a12, "class", "svelte-1rf3m8t");
				add_location(a12, file$1, 65, 6, 4772);
				attr_dev(li15, "class", "svelte-1rf3m8t");
				add_location(li15, file$1, 63, 4, 4652);
				add_location(em9, file$1, 68, 33, 5036);
				attr_dev(li16, "class", "svelte-1rf3m8t");
				add_location(li16, file$1, 67, 4, 4997);
				attr_dev(a13, "target", "_blank");
				attr_dev(a13, "href", "https://www.staatsbosbeheer.nl/wat-we-doen/flora-en-fauna/ganzen");
				attr_dev(a13, "class", "svelte-1rf3m8t");
				add_location(a13, file$1, 72, 6, 5259);
				attr_dev(li17, "class", "svelte-1rf3m8t");
				add_location(li17, file$1, 70, 4, 5164);
				add_location(em10, file$1, 75, 75, 5517);
				attr_dev(a14, "target", "_blank");
				attr_dev(a14, "href", "https://natuurtijdschriften.nl/pub/486206/DLN0131241267.pdf");
				attr_dev(a14, "class", "svelte-1rf3m8t");
				add_location(a14, file$1, 76, 6, 5552);
				attr_dev(li18, "class", "svelte-1rf3m8t");
				add_location(li18, file$1, 74, 4, 5436);
				attr_dev(a15, "target", "_blank");
				attr_dev(a15, "href", "https://hetree.nl/groep-reeen/");
				attr_dev(a15, "class", "svelte-1rf3m8t");
				add_location(a15, file$1, 80, 6, 5804);
				attr_dev(li19, "class", "svelte-1rf3m8t");
				add_location(li19, file$1, 78, 4, 5719);
				attr_dev(a16, "target", "_blank");
				attr_dev(a16, "href", "https://www.zoogdiervereniging.nl/zoogdiersoorten/haas");
				attr_dev(a16, "class", "svelte-1rf3m8t");
				add_location(a16, file$1, 84, 6, 5992);
				attr_dev(li20, "class", "svelte-1rf3m8t");
				add_location(li20, file$1, 82, 4, 5913);
				add_location(em11, file$1, 87, 33, 6188);
				attr_dev(li21, "class", "svelte-1rf3m8t");
				add_location(li21, file$1, 86, 4, 6149);
				attr_dev(a17, "target", "_blank");
				attr_dev(a17, "href", "https://www.bnnvara.nl/vroegevogels/artikelen/het-verschil-tussen-een-man-en-vrouw-ijsvogel");
				attr_dev(a17, "class", "svelte-1rf3m8t");
				add_location(a17, file$1, 91, 6, 6409);
				attr_dev(li22, "class", "svelte-1rf3m8t");
				add_location(li22, file$1, 89, 4, 6286);
				attr_dev(a18, "target", "_blank");
				attr_dev(a18, "href", "https://np-debiesbosch.nl/de-biesbosch/historie/");
				attr_dev(a18, "class", "svelte-1rf3m8t");
				add_location(a18, file$1, 95, 6, 6760);
				attr_dev(li23, "class", "svelte-1rf3m8t");
				add_location(li23, file$1, 93, 4, 6640);
				attr_dev(a19, "target", "_blank");
				attr_dev(a19, "href", "https://www.zoogdiervereniging.nl/nieuws/2017/hazen-de-voortplanting-rammelen");
				attr_dev(a19, "class", "svelte-1rf3m8t");
				add_location(a19, file$1, 99, 6, 7026);
				attr_dev(li24, "class", "svelte-1rf3m8t");
				add_location(li24, file$1, 97, 4, 6905);
				add_location(em12, file$1, 102, 61, 7296);
				attr_dev(a20, "target", "_blank");
				attr_dev(a20, "href", "https://natuurtijdschriften.nl/pub/641927/Natura2016113003001.pdf");
				attr_dev(a20, "class", "svelte-1rf3m8t");
				add_location(a20, file$1, 103, 6, 7320);
				attr_dev(li25, "class", "svelte-1rf3m8t");
				add_location(li25, file$1, 101, 4, 7229);
				attr_dev(a21, "target", "_blank");
				attr_dev(a21, "href", "https://www.freenature.nl/nieuws/2018/klissen-geen-probleem-voor-dierenwelzijn");
				attr_dev(a21, "class", "svelte-1rf3m8t");
				add_location(a21, file$1, 107, 6, 7596);
				attr_dev(li26, "class", "svelte-1rf3m8t");
				add_location(li26, file$1, 105, 4, 7499);
				attr_dev(a22, "target", "_blank");
				attr_dev(a22, "href", "https://www.researchgate.net/profile/Rwpm-Laane-rip-2/publication/277665143_Geheimen_van_de_kust/links/556f500a08aec226830a8bd8/Geheimen-van-de-kust.pdf");
				attr_dev(a22, "class", "svelte-1rf3m8t");
				add_location(a22, file$1, 111, 6, 7932);
				attr_dev(li27, "class", "svelte-1rf3m8t");
				add_location(li27, file$1, 109, 4, 7801);
				attr_dev(a23, "target", "_blank");
				attr_dev(a23, "href", "https://www.jagersvereniging.nl/jagen/diersoorten/kolgans/");
				attr_dev(a23, "class", "svelte-1rf3m8t");
				add_location(a23, file$1, 115, 6, 8356);
				attr_dev(li28, "class", "svelte-1rf3m8t");
				add_location(li28, file$1, 113, 4, 8285);
				attr_dev(a24, "target", "_blank");
				attr_dev(a24, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/kolgans.");
				attr_dev(a24, "class", "svelte-1rf3m8t");
				add_location(a24, file$1, 119, 6, 8602);
				attr_dev(li29, "class", "svelte-1rf3m8t");
				add_location(li29, file$1, 117, 4, 8521);
				add_location(em13, file$1, 122, 143, 8978);
				attr_dev(a25, "target", "_blank");
				attr_dev(a25, "href", "https://pub.sovon.nl/pub/publicatie/18308");
				attr_dev(a25, "class", "svelte-1rf3m8t");
				add_location(a25, file$1, 123, 6, 9002);
				attr_dev(li30, "class", "svelte-1rf3m8t");
				add_location(li30, file$1, 121, 4, 8829);
				attr_dev(a26, "target", "_blank");
				attr_dev(a26, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/meerkoet");
				attr_dev(a26, "class", "svelte-1rf3m8t");
				add_location(a26, file$1, 127, 6, 9221);
				attr_dev(li31, "class", "svelte-1rf3m8t");
				add_location(li31, file$1, 125, 4, 9133);
				attr_dev(a27, "target", "_blank");
				attr_dev(a27, "href", "https://np-debiesbosch.nl/wp-content/uploads/2015/06/WATER-lesbrief-leerkracht.pdf");
				attr_dev(a27, "class", "svelte-1rf3m8t");
				add_location(a27, file$1, 131, 6, 9614);
				attr_dev(li32, "class", "svelte-1rf3m8t");
				add_location(li32, file$1, 129, 4, 9448);
				attr_dev(li33, "class", "svelte-1rf3m8t");
				add_location(li33, file$1, 133, 4, 9827);
				attr_dev(a28, "target", "_blank");
				attr_dev(a28, "href", "https://www.ad.nl/rivierenland/futen-vechten-in-de-biesbosch-om-een-territorium~ac0b9c38/");
				attr_dev(a28, "class", "svelte-1rf3m8t");
				add_location(a28, file$1, 138, 6, 10086);
				attr_dev(li34, "class", "svelte-1rf3m8t");
				add_location(li34, file$1, 136, 4, 9962);
				add_location(em14, file$1, 141, 89, 10408);
				attr_dev(a29, "target", "_blank");
				attr_dev(a29, "href", "https://natuurtijdschriften.nl/pub/589432");
				attr_dev(a29, "class", "svelte-1rf3m8t");
				add_location(a29, file$1, 142, 6, 10434);
				attr_dev(li35, "class", "svelte-1rf3m8t");
				add_location(li35, file$1, 140, 4, 10313);
				attr_dev(a30, "target", "_blank");
				attr_dev(a30, "href", "https://mijngelderland.nl/inhoud/specials/verbeelding-van-de-waal/de-bijna-ramp-1995");
				attr_dev(a30, "class", "svelte-1rf3m8t");
				add_location(a30, file$1, 146, 6, 10705);
				attr_dev(li36, "class", "svelte-1rf3m8t");
				add_location(li36, file$1, 144, 4, 10565);
				attr_dev(a31, "target", "_blank");
				attr_dev(a31, "href", "https://www.rijkswaterstaat.nl/water/waterbeheer/bescherming-tegen-het-water/waterkeringen/deltawerken");
				attr_dev(a31, "class", "svelte-1rf3m8t");
				add_location(a31, file$1, 150, 6, 11027);
				attr_dev(li37, "class", "svelte-1rf3m8t");
				add_location(li37, file$1, 148, 4, 10922);
				attr_dev(a32, "target", "_blank");
				attr_dev(a32, "href", "https://www.newscientist.nl/nieuws/bijen-surfen-op-zelfgemaakte-golven-naar-de-waterkant/");
				attr_dev(a32, "class", "svelte-1rf3m8t");
				add_location(a32, file$1, 154, 6, 11413);
				attr_dev(li38, "class", "svelte-1rf3m8t");
				add_location(li38, file$1, 152, 4, 11280);
				add_location(em15, file$1, 157, 93, 11739);
				attr_dev(a33, "target", "_blank");
				attr_dev(a33, "href", "https://research.tudelft.nl/en/publications/de-sint-elisabethsvloed-feiten-en-fictie");
				attr_dev(a33, "class", "svelte-1rf3m8t");
				add_location(a33, file$1, 158, 6, 11794);
				attr_dev(li39, "class", "svelte-1rf3m8t");
				add_location(li39, file$1, 156, 4, 11640);
				attr_dev(a34, "target", "_blank");
				attr_dev(a34, "href", "https://stats.sovon.nl/stats/soort/4080");
				attr_dev(a34, "class", "svelte-1rf3m8t");
				add_location(a34, file$1, 162, 6, 12112);
				attr_dev(li40, "class", "svelte-1rf3m8t");
				add_location(li40, file$1, 160, 4, 12011);
				attr_dev(a35, "target", "_blank");
				attr_dev(a35, "href", "https://www.staatsbosbeheer.nl/uit-in-de-natuur/locaties/biesbosch/over-de-biesbosch");
				attr_dev(a35, "class", "svelte-1rf3m8t");
				add_location(a35, file$1, 166, 6, 12342);
				attr_dev(li41, "class", "svelte-1rf3m8t");
				add_location(li41, file$1, 164, 4, 12239);
				attr_dev(a36, "target", "_blank");
				attr_dev(a36, "href", "https://www.canonvannederland.nl/nl/utrecht/onderwijscanon/turf");
				attr_dev(a36, "class", "svelte-1rf3m8t");
				add_location(a36, file$1, 170, 6, 12637);
				attr_dev(li42, "class", "svelte-1rf3m8t");
				add_location(li42, file$1, 168, 4, 12559);
				add_location(em16, file$1, 173, 52, 12870);
				attr_dev(li43, "class", "svelte-1rf3m8t");
				add_location(li43, file$1, 172, 4, 12812);
				attr_dev(a37, "target", "_blank");
				attr_dev(a37, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/visarend");
				attr_dev(a37, "class", "svelte-1rf3m8t");
				add_location(a37, file$1, 177, 6, 13018);
				attr_dev(li44, "class", "svelte-1rf3m8t");
				add_location(li44, file$1, 175, 4, 12930);
				attr_dev(a38, "target", "_blank");
				attr_dev(a38, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/blauwe-reiger.");
				attr_dev(a38, "class", "svelte-1rf3m8t");
				add_location(a38, file$1, 181, 6, 13343);
				attr_dev(li45, "class", "svelte-1rf3m8t");
				add_location(li45, file$1, 179, 4, 13245);
				attr_dev(a39, "target", "_blank");
				attr_dev(a39, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/grote-zilverreiger");
				attr_dev(a39, "class", "svelte-1rf3m8t");
				add_location(a39, file$1, 185, 6, 13662);
				attr_dev(li46, "class", "svelte-1rf3m8t");
				add_location(li46, file$1, 183, 4, 13582);
				attr_dev(a40, "target", "_blank");
				attr_dev(a40, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/kleine-zilverreiger");
				attr_dev(a40, "class", "svelte-1rf3m8t");
				add_location(a40, file$1, 189, 6, 13990);
				attr_dev(li47, "class", "svelte-1rf3m8t");
				add_location(li47, file$1, 187, 4, 13909);
				attr_dev(a41, "target", "_blank");
				attr_dev(a41, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/koereiger");
				attr_dev(a41, "class", "svelte-1rf3m8t");
				add_location(a41, file$1, 193, 6, 14310);
				attr_dev(li48, "class", "svelte-1rf3m8t");
				add_location(li48, file$1, 191, 4, 14239);
				attr_dev(a42, "target", "_blank");
				attr_dev(a42, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/lepelaar");
				attr_dev(a42, "class", "svelte-1rf3m8t");
				add_location(a42, file$1, 197, 6, 14608);
				attr_dev(li49, "class", "svelte-1rf3m8t");
				add_location(li49, file$1, 195, 4, 14539);
				attr_dev(a43, "target", "_blank");
				attr_dev(a43, "href", "https://www.vogelbescherming.nl/ontdek-vogels/kennis-over-vogels/vogelgids/vogel/sperwer");
				attr_dev(a43, "class", "svelte-1rf3m8t");
				add_location(a43, file$1, 201, 6, 14904);
				attr_dev(li50, "class", "svelte-1rf3m8t");
				add_location(li50, file$1, 199, 4, 14835);
				attr_dev(a44, "target", "_blank");
				attr_dev(a44, "href", "https://www.ijsvogels.nl/voortplanting-2/");
				attr_dev(a44, "class", "svelte-1rf3m8t");
				add_location(a44, file$1, 205, 6, 15252);
				attr_dev(li51, "class", "svelte-1rf3m8t");
				add_location(li51, file$1, 203, 4, 15129);
				add_location(em17, file$1, 208, 27, 15416);
				attr_dev(li52, "class", "svelte-1rf3m8t");
				add_location(li52, file$1, 207, 4, 15383);
				attr_dev(li53, "class", "svelte-1rf3m8t");
				add_location(li53, file$1, 210, 4, 15482);
				add_location(em18, file$1, 214, 49, 15635);
				attr_dev(a45, "target", "_blank");
				attr_dev(a45, "href", "https://natuurtijdschriften.nl/pub/495017/DLN0980610682.pdf");
				attr_dev(a45, "class", "svelte-1rf3m8t");
				add_location(a45, file$1, 215, 6, 15670);
				attr_dev(li54, "class", "svelte-1rf3m8t");
				add_location(li54, file$1, 213, 4, 15580);
				attr_dev(ol, "class", "svelte-1rf3m8t");
				add_location(ol, file$1, 5, 2, 194);
				attr_dev(section, "class", "sources svelte-1rf3m8t");
				add_location(section, file$1, 4, 0, 165);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, h1, anchor);
				insert_dev(target, t1, anchor);
				insert_dev(target, p, anchor);
				insert_dev(target, t3, anchor);
				insert_dev(target, section, anchor);
				append_dev(section, ol);
				append_dev(ol, li0);
				append_dev(li0, t4);
				append_dev(li0, em0);
				append_dev(li0, t6);
				append_dev(li0, a0);
				append_dev(li0, t8);
				append_dev(ol, t9);
				append_dev(ol, li1);
				append_dev(li1, t10);
				append_dev(li1, a1);
				append_dev(li1, t12);
				append_dev(ol, t13);
				append_dev(ol, li2);
				append_dev(li2, t14);
				append_dev(li2, a2);
				append_dev(li2, t16);
				append_dev(ol, t17);
				append_dev(ol, li3);
				append_dev(li3, t18);
				append_dev(li3, em1);
				append_dev(li3, t20);
				append_dev(li3, a3);
				append_dev(li3, t22);
				append_dev(ol, t23);
				append_dev(ol, li4);
				append_dev(li4, t24);
				append_dev(li4, em2);
				append_dev(li4, t26);
				append_dev(ol, t27);
				append_dev(ol, li5);
				append_dev(li5, t28);
				append_dev(li5, em3);
				append_dev(li5, t30);
				append_dev(li5, a4);
				append_dev(li5, t32);
				append_dev(ol, t33);
				append_dev(ol, li6);
				append_dev(li6, t34);
				append_dev(li6, em4);
				append_dev(li6, t36);
				append_dev(li6, a5);
				append_dev(li6, t38);
				append_dev(ol, t39);
				append_dev(ol, li7);
				append_dev(li7, t40);
				append_dev(li7, em5);
				append_dev(li7, t42);
				append_dev(li7, a6);
				append_dev(li7, t44);
				append_dev(ol, t45);
				append_dev(ol, li8);
				append_dev(li8, t46);
				append_dev(li8, a7);
				append_dev(li8, t48);
				append_dev(ol, t49);
				append_dev(ol, li9);
				append_dev(li9, t50);
				append_dev(li9, a8);
				append_dev(li9, t52);
				append_dev(ol, t53);
				append_dev(ol, li10);
				append_dev(li10, t54);
				append_dev(li10, a9);
				append_dev(li10, t56);
				append_dev(ol, t57);
				append_dev(ol, li11);
				append_dev(li11, t58);
				append_dev(li11, a10);
				append_dev(li11, t60);
				append_dev(ol, t61);
				append_dev(ol, li12);
				append_dev(li12, t62);
				append_dev(li12, em6);
				append_dev(li12, t64);
				append_dev(ol, t65);
				append_dev(ol, li13);
				append_dev(ol, t67);
				append_dev(ol, li14);
				append_dev(li14, t68);
				append_dev(li14, em7);
				append_dev(li14, t70);
				append_dev(li14, a11);
				append_dev(li14, t72);
				append_dev(ol, t73);
				append_dev(ol, li15);
				append_dev(li15, t74);
				append_dev(li15, em8);
				append_dev(li15, t76);
				append_dev(li15, a12);
				append_dev(li15, t78);
				append_dev(ol, t79);
				append_dev(ol, li16);
				append_dev(li16, t80);
				append_dev(li16, em9);
				append_dev(li16, t82);
				append_dev(ol, t83);
				append_dev(ol, li17);
				append_dev(li17, t84);
				append_dev(li17, a13);
				append_dev(li17, t86);
				append_dev(ol, t87);
				append_dev(ol, li18);
				append_dev(li18, t88);
				append_dev(li18, em10);
				append_dev(li18, t90);
				append_dev(li18, a14);
				append_dev(li18, t92);
				append_dev(ol, t93);
				append_dev(ol, li19);
				append_dev(li19, t94);
				append_dev(li19, a15);
				append_dev(li19, t96);
				append_dev(ol, t97);
				append_dev(ol, li20);
				append_dev(li20, t98);
				append_dev(li20, a16);
				append_dev(li20, t100);
				append_dev(ol, t101);
				append_dev(ol, li21);
				append_dev(li21, t102);
				append_dev(li21, em11);
				append_dev(li21, t104);
				append_dev(ol, t105);
				append_dev(ol, li22);
				append_dev(li22, t106);
				append_dev(li22, a17);
				append_dev(li22, t108);
				append_dev(ol, t109);
				append_dev(ol, li23);
				append_dev(li23, t110);
				append_dev(li23, a18);
				append_dev(li23, t112);
				append_dev(ol, t113);
				append_dev(ol, li24);
				append_dev(li24, t114);
				append_dev(li24, a19);
				append_dev(li24, t116);
				append_dev(ol, t117);
				append_dev(ol, li25);
				append_dev(li25, t118);
				append_dev(li25, em12);
				append_dev(li25, t120);
				append_dev(li25, a20);
				append_dev(li25, t122);
				append_dev(ol, t123);
				append_dev(ol, li26);
				append_dev(li26, t124);
				append_dev(li26, a21);
				append_dev(li26, t126);
				append_dev(ol, t127);
				append_dev(ol, li27);
				append_dev(li27, t128);
				append_dev(li27, a22);
				append_dev(li27, t130);
				append_dev(ol, t131);
				append_dev(ol, li28);
				append_dev(li28, t132);
				append_dev(li28, a23);
				append_dev(li28, t134);
				append_dev(ol, t135);
				append_dev(ol, li29);
				append_dev(li29, t136);
				append_dev(li29, a24);
				append_dev(li29, t138);
				append_dev(ol, t139);
				append_dev(ol, li30);
				append_dev(li30, t140);
				append_dev(li30, em13);
				append_dev(li30, t142);
				append_dev(li30, a25);
				append_dev(li30, t144);
				append_dev(ol, t145);
				append_dev(ol, li31);
				append_dev(li31, t146);
				append_dev(li31, a26);
				append_dev(li31, t148);
				append_dev(ol, t149);
				append_dev(ol, li32);
				append_dev(li32, t150);
				append_dev(li32, a27);
				append_dev(li32, t152);
				append_dev(ol, t153);
				append_dev(ol, li33);
				append_dev(ol, t155);
				append_dev(ol, li34);
				append_dev(li34, t156);
				append_dev(li34, a28);
				append_dev(li34, t158);
				append_dev(ol, t159);
				append_dev(ol, li35);
				append_dev(li35, t160);
				append_dev(li35, em14);
				append_dev(li35, t162);
				append_dev(li35, a29);
				append_dev(li35, t164);
				append_dev(ol, t165);
				append_dev(ol, li36);
				append_dev(li36, t166);
				append_dev(li36, a30);
				append_dev(li36, t168);
				append_dev(ol, t169);
				append_dev(ol, li37);
				append_dev(li37, t170);
				append_dev(li37, a31);
				append_dev(li37, t172);
				append_dev(ol, t173);
				append_dev(ol, li38);
				append_dev(li38, t174);
				append_dev(li38, a32);
				append_dev(li38, t176);
				append_dev(ol, t177);
				append_dev(ol, li39);
				append_dev(li39, t178);
				append_dev(li39, em15);
				append_dev(li39, t180);
				append_dev(li39, a33);
				append_dev(li39, t182);
				append_dev(ol, t183);
				append_dev(ol, li40);
				append_dev(li40, t184);
				append_dev(li40, a34);
				append_dev(li40, t186);
				append_dev(ol, t187);
				append_dev(ol, li41);
				append_dev(li41, t188);
				append_dev(li41, a35);
				append_dev(li41, t190);
				append_dev(ol, t191);
				append_dev(ol, li42);
				append_dev(li42, t192);
				append_dev(li42, a36);
				append_dev(li42, t194);
				append_dev(ol, t195);
				append_dev(ol, li43);
				append_dev(li43, t196);
				append_dev(li43, em16);
				append_dev(li43, t198);
				append_dev(ol, t199);
				append_dev(ol, li44);
				append_dev(li44, t200);
				append_dev(li44, a37);
				append_dev(li44, t202);
				append_dev(ol, t203);
				append_dev(ol, li45);
				append_dev(li45, t204);
				append_dev(li45, a38);
				append_dev(li45, t206);
				append_dev(ol, t207);
				append_dev(ol, li46);
				append_dev(li46, t208);
				append_dev(li46, a39);
				append_dev(li46, t210);
				append_dev(ol, t211);
				append_dev(ol, li47);
				append_dev(li47, t212);
				append_dev(li47, a40);
				append_dev(li47, t214);
				append_dev(ol, t215);
				append_dev(ol, li48);
				append_dev(li48, t216);
				append_dev(li48, a41);
				append_dev(li48, t218);
				append_dev(ol, t219);
				append_dev(ol, li49);
				append_dev(li49, t220);
				append_dev(li49, a42);
				append_dev(li49, t222);
				append_dev(ol, t223);
				append_dev(ol, li50);
				append_dev(li50, t224);
				append_dev(li50, a43);
				append_dev(li50, t226);
				append_dev(ol, t227);
				append_dev(ol, li51);
				append_dev(li51, t228);
				append_dev(li51, a44);
				append_dev(li51, t230);
				append_dev(ol, t231);
				append_dev(ol, li52);
				append_dev(li52, t232);
				append_dev(li52, em17);
				append_dev(li52, t234);
				append_dev(ol, t235);
				append_dev(ol, li53);
				append_dev(ol, t237);
				append_dev(ol, li54);
				append_dev(li54, t238);
				append_dev(li54, em18);
				append_dev(li54, t240);
				append_dev(li54, a45);
				append_dev(li54, t242);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(h1);
					detach_dev(t1);
					detach_dev(p);
					detach_dev(t3);
					detach_dev(section);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$1($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Sources', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sources> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class Sources extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Sources",
				options,
				id: create_fragment$1.name
			});
		}
	}

	/* src\App.svelte generated by Svelte v4.2.8 */

	const { window: window_1 } = globals;
	const file = "src\\App.svelte";

	// (38:6) <Button fluid={true} center={true} click="https://www.facebook.com/biesboschfilm">
	function create_default_slot(ctx) {
		let t;

		const block = {
			c: function create() {
				t = text("Like ons op Facebook");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t, anchor);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_default_slot.name,
			type: "slot",
			source: "(38:6) <Button fluid={true} center={true} click=\\\"https://www.facebook.com/biesboschfilm\\\">",
			ctx
		});

		return block;
	}

	// (43:4) {:else}
	function create_else_block(ctx) {
		let home;
		let current;
		home = new Home({ $$inline: true });

		const block = {
			c: function create() {
				create_component(home.$$.fragment);
			},
			m: function mount(target, anchor) {
				mount_component(home, target, anchor);
				current = true;
			},
			i: function intro(local) {
				if (current) return;
				transition_in(home.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(home.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(home, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block.name,
			type: "else",
			source: "(43:4) {:else}",
			ctx
		});

		return block;
	}

	// (41:4) {#if page==="/bronnen"}
	function create_if_block(ctx) {
		let sources;
		let current;
		sources = new Sources({ $$inline: true });

		const block = {
			c: function create() {
				create_component(sources.$$.fragment);
			},
			m: function mount(target, anchor) {
				mount_component(sources, target, anchor);
				current = true;
			},
			i: function intro(local) {
				if (current) return;
				transition_in(sources.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(sources.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(sources, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block.name,
			type: "if",
			source: "(41:4) {#if page===\\\"/bronnen\\\"}",
			ctx
		});

		return block;
	}

	function create_fragment(ctx) {
		let main;
		let video;
		let video_src_value;
		let t0;
		let content;
		let section;
		let a;
		let img;
		let img_src_value;
		let t1;
		let div;
		let iframe;
		let iframe_src_value;
		let t2;
		let button;
		let t3;
		let current_block_type_index;
		let if_block;
		let current;
		let mounted;
		let dispose;
		add_render_callback(/*onwindowresize*/ ctx[5]);

		button = new Button({
				props: {
					fluid: true,
					center: true,
					click: "https://www.facebook.com/biesboschfilm",
					$$slots: { default: [create_default_slot] },
					$$scope: { ctx }
				},
				$$inline: true
			});

		const if_block_creators = [create_if_block, create_else_block];
		const if_blocks = [];

		function select_block_type(ctx, dirty) {
			if (/*page*/ ctx[1] === "/bronnen") return 0;
			return 1;
		}

		current_block_type_index = select_block_type(ctx);
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

		const block = {
			c: function create() {
				main = element("main");
				video = element("video");
				t0 = space();
				content = element("content");
				section = element("section");
				a = element("a");
				img = element("img");
				t1 = space();
				div = element("div");
				iframe = element("iframe");
				t2 = space();
				create_component(button.$$.fragment);
				t3 = space();
				if_block.c();
				attr_dev(video, "preload", "none");
				if (!src_url_equal(video.src, video_src_value = /*videoUrl*/ ctx[2])) attr_dev(video, "src", video_src_value);
				video.autoplay = true;
				video.muted = true;
				video.loop = true;
				video.playsInline = true;
				attr_dev(video, "class", "svelte-1f75v7d");
				add_location(video, file, 34, 2, 830);
				attr_dev(img, "id", "logo");
				if (!src_url_equal(img.src, img_src_value = "assets/images/logo.svg")) attr_dev(img, "src", img_src_value);
				attr_dev(img, "alt", "De Biesbosch: Natuur in beweging");
				add_location(img, file, 39, 8, 993);
				attr_dev(a, "id", "escape-hatch");
				attr_dev(a, "href", "/");
				add_location(a, file, 38, 6, 953);
				set_style(iframe, "width", /*width*/ ctx[3] + "px");
				set_style(iframe, "height", /*width*/ ctx[3] * (9 / 16) + "px");
				if (!src_url_equal(iframe.src, iframe_src_value = "https://www.youtube.com/embed/63S1zyBd9Kc?si=qQNEV9YF-v_yv513")) attr_dev(iframe, "src", iframe_src_value);
				attr_dev(iframe, "title", "Trailer (on YouTube)");
				attr_dev(iframe, "frameborder", "0");
				attr_dev(iframe, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
				attr_dev(iframe, "referrerpolicy", "strict-origin-when-cross-origin");
				iframe.allowFullscreen = true;
				add_location(iframe, file, 43, 8, 1137);
				attr_dev(div, "class", "video trailer svelte-1f75v7d");
				add_location(div, file, 42, 6, 1100);
				attr_dev(section, "class", "intro svelte-1f75v7d");
				add_location(section, file, 37, 4, 922);
				attr_dev(content, "class", "svelte-1f75v7d");
				add_location(content, file, 35, 2, 905);
				set_style(main, "width", /*width*/ ctx[3] + "px");
				attr_dev(main, "class", "svelte-1f75v7d");
				add_location(main, file, 33, 0, 796);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, main, anchor);
				append_dev(main, video);
				append_dev(main, t0);
				append_dev(main, content);
				append_dev(content, section);
				append_dev(section, a);
				append_dev(a, img);
				append_dev(section, t1);
				append_dev(section, div);
				append_dev(div, iframe);
				append_dev(section, t2);
				mount_component(button, section, null);
				append_dev(content, t3);
				if_blocks[current_block_type_index].m(content, null);
				current = true;

				if (!mounted) {
					dispose = [
						listen_dev(window_1, "resize", /*onResize*/ ctx[4], false, false, false, false),
						listen_dev(window_1, "resize", /*onwindowresize*/ ctx[5])
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (!current || dirty & /*videoUrl*/ 4 && !src_url_equal(video.src, video_src_value = /*videoUrl*/ ctx[2])) {
					attr_dev(video, "src", video_src_value);
				}

				if (!current || dirty & /*width*/ 8) {
					set_style(iframe, "width", /*width*/ ctx[3] + "px");
				}

				if (!current || dirty & /*width*/ 8) {
					set_style(iframe, "height", /*width*/ ctx[3] * (9 / 16) + "px");
				}

				const button_changes = {};

				if (dirty & /*$$scope*/ 64) {
					button_changes.$$scope = { dirty, ctx };
				}

				button.$set(button_changes);
				let previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type(ctx);

				if (current_block_type_index !== previous_block_index) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}

					transition_in(if_block, 1);
					if_block.m(content, null);
				}

				if (!current || dirty & /*width*/ 8) {
					set_style(main, "width", /*width*/ ctx[3] + "px");
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(button.$$.fragment, local);
				transition_in(if_block);
				current = true;
			},
			o: function outro(local) {
				transition_out(button.$$.fragment, local);
				transition_out(if_block);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(main);
				}

				destroy_component(button);
				if_blocks[current_block_type_index].d();
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function getVideoUrl() {
		const orientation = window.innerHeight > window.innerWidth
		? "portrait"
		: "landscape";

		return `./assets/video/bg_${orientation}.mp4`;
	}

	function instance($$self, $$props, $$invalidate) {
		let innerWidth;
		let width;
		let videoUrl;
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('App', slots, []);

		function onResize() {
			const newVideoUrl = getVideoUrl();
			if (newVideoUrl == videoUrl) return;
			$$invalidate(2, videoUrl = newVideoUrl);
		}

		let page = document.location.pathname;

		window.onpopstate = function () {
			$$invalidate(1, page = document.location.pathname);
		};

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
		});

		function onwindowresize() {
			$$invalidate(0, innerWidth = window_1.innerWidth);
		}

		$$self.$capture_state = () => ({
			onMount,
			Button,
			Home,
			Sources,
			onResize,
			getVideoUrl,
			page,
			videoUrl,
			innerWidth,
			width
		});

		$$self.$inject_state = $$props => {
			if ('page' in $$props) $$invalidate(1, page = $$props.page);
			if ('videoUrl' in $$props) $$invalidate(2, videoUrl = $$props.videoUrl);
			if ('innerWidth' in $$props) $$invalidate(0, innerWidth = $$props.innerWidth);
			if ('width' in $$props) $$invalidate(3, width = $$props.width);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*innerWidth*/ 1) {
				$$invalidate(3, width = Math.min(Math.max(window.innerWidth, window.innerHeight) * 0.5, Math.max(innerWidth, 300)));
			}
		};

		$$invalidate(0, innerWidth = 0);
		$$invalidate(2, videoUrl = getVideoUrl());
		return [innerWidth, page, videoUrl, width, onResize, onwindowresize];
	}

	class App extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance, create_fragment, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "App",
				options,
				id: create_fragment.name
			});
		}
	}

	const app = new App({
	    target: document.body,
	});

	return app;

})();
//# sourceMappingURL=bundle.js.map
