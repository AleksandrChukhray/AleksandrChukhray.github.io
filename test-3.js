(function(){
    !function (e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).basicLightbox = e()
        }
    }((function () {
        return function e(n, t, o) {
            function r(c, u) {
                if (!t[c]) {
                    if (!n[c]) {
                        var s = "function" == typeof require && require;
                        if (!u && s) return s(c, !0);
                        if (i) return i(c, !0);
                        var a = new Error("Cannot find module '" + c + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var l = t[c] = {exports: {}};
                    n[c][0].call(l.exports, (function (e) {
                        return r(n[c][1][e] || e)
                    }), l, l.exports, e, n, t, o)
                }
                return t[c].exports
            }

            for (var i = "function" == typeof require && require, c = 0; c < o.length; c++) r(o[c]);
            return r
        }({
            1: [function (e, n, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {value: !0}), t.create = t.visible = void 0;
                var o = function (e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        t = document.createElement("div");
                    return t.innerHTML = e.trim(), !0 === n ? t.children : t.firstChild
                }, r = function (e, n) {
                    var t = e.children;
                    return 1 === t.length && t[0].tagName === n
                }, i = function (e) {
                    return null != (e = e || document.querySelector(".basicLightbox")) && !0 === e.ownerDocument.body.contains(e)
                };
                t.visible = i;
                t.create = function (e, n) {
                    var t = function (e, n) {
                        var t = o('\n\t\t<div class="basicLightbox '.concat(n.className, '">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),
                            i = t.querySelector(".basicLightbox__placeholder");
                        e.forEach((function (e) {
                            return i.appendChild(e)
                        }));
                        var c = r(i, "IMG"), u = r(i, "VIDEO"), s = r(i, "IFRAME");
                        return !0 === c && t.classList.add("basicLightbox--img"), !0 === u && t.classList.add("basicLightbox--video"), !0 === s && t.classList.add("basicLightbox--iframe"), t
                    }(e = function (e) {
                        var n = "string" == typeof e, t = e instanceof HTMLElement == !0;
                        if (!1 === n && !1 === t) throw new Error("Content must be a DOM element/node or string");
                        return !0 === n ? Array.from(o(e, !0)) : "TEMPLATE" === e.tagName ? [e.content.cloneNode(!0)] : Array.from(e.children)
                    }(e), n = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        if (null == (e = Object.assign({}, e)).closable && (e.closable = !0), null == e.className && (e.className = ""), null == e.onShow && (e.onShow = function () {
                        }), null == e.onClose && (e.onClose = function () {
                        }), "boolean" != typeof e.closable) throw new Error("Property `closable` must be a boolean");
                        if ("string" != typeof e.className) throw new Error("Property `className` must be a string");
                        if ("function" != typeof e.onShow) throw new Error("Property `onShow` must be a function");
                        if ("function" != typeof e.onClose) throw new Error("Property `onClose` must be a function");
                        return e
                    }(n)), c = function (e) {
                        return !1 !== n.onClose(u) && function (e, n) {
                            return e.classList.remove("basicLightbox--visible"), setTimeout((function () {
                                return !1 === i(e) || e.parentElement.removeChild(e), n()
                            }), 410), !0
                        }(t, (function () {
                            if ("function" == typeof e) return e(u)
                        }))
                    };
                    !0 === n.closable && t.addEventListener("click", (function (e) {
                        e.target === t && c()
                    }));
                    var u = {
                        element: function () {
                            return t
                        }, visible: function () {
                            return i(t)
                        }, show: function (e) {
                            return !1 !== n.onShow(u) && function (e, n) {
                                return document.body.appendChild(e), setTimeout((function () {
                                    requestAnimationFrame((function () {
                                        return e.classList.add("basicLightbox--visible"), n()
                                    }))
                                }), 10), !0
                            }(t, (function () {
                                if ("function" == typeof e) return e(u)
                            }))
                        }, close: c
                    };
                    return u
                }
            }, {}]
        }, {}, [1])(1)
    }));


    window.addEventListener('load', function() {
        new Module();
    });

    /**
     * throttle function that catches and triggers last invocation
     * use time to see if there is a last invocation
     */
    const throttle = function (func, limit) {
        let lastFunc
        let lastRan

        return function () {
            const context = this
            const args = arguments
            if (!lastRan) {
                func.apply(context, args)
                lastRan = Date.now()
            } else {
                clearTimeout(lastFunc)
                lastFunc = setTimeout(function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args)
                        lastRan = Date.now()
                    }
                }, limit - (Date.now() - lastRan))
            }
        }
    }

    const debounce = function(func, wait, immediate) {
        let timeout;

        return function executedFunction() {
            const context = this;
            const args = arguments;

            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };

    const getString = (function () {
        var DIV = document.createElement("div");

        if ('outerHTML' in DIV)
            return function (node) {
                return node.outerHTML;
            };

        return function (node) {
            var div = DIV.cloneNode();
            div.appendChild(node.cloneNode(true));
            return div.innerHTML;
        };

    })();

    /**
     *
     * @param {string} url - The url of resource
     * @param {object} options - Fetch option object
     * @constructor
     */
    function API(url, options) {
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.apiKey = '17354782-10be02de30677f937c171f5c1';
        this.url = url || 'https://pixabay.com/api/';
        this.options = options || {
            signal: this.signal,
        };

        this.get = async function (url, searchParams) {
            const urlWithParams = new URL(this.url);

            let options = Object.assign({}, this.options, {
                method: 'GET'
            })

            searchParams = Object.assign({}, searchParams, {
                key: this.apiKey,
                image_type: 'photo'
            });

            for (let k in searchParams) {
                urlWithParams.searchParams.set(k, searchParams[k]);
            }

            const response = await fetch(urlWithParams.toString(), options);

            return response.json();
        }

        this.abortRequest = function () {
            this.controller.abort();
        }
    }

    /**
     *
     * @param {object} func
     * @constructor
     */
    function SearchForm(func) {
        this.form = null;
        this.input = null;

        this.create = function () {
            this.form = document.createElement('form');
            this.input = document.createElement('input');

            this.form.setAttribute('id', 'search-form');

            this.input.setAttribute('type', 'text');
            this.input.setAttribute('name', 'query');
            this.input.setAttribute('autocomplete', 'off');
            this.input.setAttribute('placeholder', 'Search images...');

            this.input.addEventListener('input', debounce(function (e) {
                let value = e.target.value;

                func(value);
            }, 500));

            this.form.appendChild(this.input);
        }

        this.get = function () {
            return this.form;
        }

        this.create();
    }

    /**
     *
     * @param {NodeElement} parent
     * @constructor
     */
    function List(parent) {
        this.list = null;

        this.create = function () {
            this.list = document.createElement('ul');
        }

        this.get = function () {
            return this.list;
        }

        this.addItem = function (item) {
            this.list.appendChild(item);
        }

        this.removeItems = function () {
            while(this.list.firstChild){
                this.list.removeChild(this.list.firstChild);
            }
        }

        this.create();
    }


    /**
     * Create li item with insert image
     * @param {NodeElement} el
     * @param {object} data - Pixibay API response object
     * @param {string} data.webformatURL
     * @param {string} data.largeImageURL
     * @param {string} data.webformatWidth
     * @param {string} data.webformatHeight
     * @constructor
     */
    function ListItem(el, data) {
        if (!el) {
            throw new Error('Insert element to constructor')
        }

        this.create = function () {
            this.listItem = document.createElement('li');
            this.listItem.appendChild(el);
        }

        this.get = function () {
            return this.listItem;
        }

        this.create();
    }

    /**
     *
     * @param data
     * @constructor
     */
    function Image(data) {
        if (!data) {
            throw new Error('Insert data to constructor')
        }
        this.data = data;
        this.image = null;

        this.createSmallImg = function (d) {
            var img = document.createElement('img');

            img.setAttribute('src', d.webformatURL);
            img.setAttribute('data-source', d.largeImageURL);
            img.setAttribute('alt', d.tag);
            img.setAttribute('width', d.webformatWidth);
            img.setAttribute('height', d.webformatHeight);

            return img;
        }

        this.createBigImg = function (d) {
            var bigImg = document.createElement('img');

            bigImg.setAttribute('src', d.largeImageURL);
            bigImg.setAttribute('alt', d.tag);
            bigImg.setAttribute('width', 1200);
            bigImg.setAttribute('height', 800);

            return bigImg;
        }

        this.create = function () {
            var a = document.createElement('a'),
                img = this.createSmallImg(this.data),
                bigImg = this.createBigImg(this.data),
                basicLightInstance = null;

            a.href = this.data.largeImageURL;
            basicLightInstance = basicLightbox.create(getString(bigImg));

            a.addEventListener('click', function (e) {
                e.preventDefault();
                basicLightInstance.show();
            });

            a.append(img);

            this.image = a;
        }

        this.get = function () {
            return this.image;
        }

        this.create();
    }

    /**
     *
     * @param {NodeElement} parent
     * @param {object} func
     * @constructor
     */
    function Observer(parent, func){
        const numSteps = 20.0;

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = null;
        this.parent = parent;
        this.element = document.createElement('div');

        function handleIntersect(entries, observer) {
            entries.forEach((entry) => {
                console.log(entry.isIntersecting);
                if (entry.isIntersecting && entry.intersectionRatio > 0) func();
            });
        }

        this.observer = new IntersectionObserver(handleIntersect, options);

        this.observe = function(){
            this.parent.appendChild(this.element);
            this.observer.observe(this.element);
        }

        this.unobserve = function () {
            this.observer.unobserve(this.element);
            this.element.parentNode && this.element.parentNode.removeChild(this.element);
        }
    }


    /**
     *
     * @constructor
     */
    function Module() {
        const self = this;
        this.gallery = document.getElementById('gallery');
        this.searchForm = new SearchForm(inputCallRequest);
        this.list = new List();
        this.api = new API();
        this.observer = new Observer(this.list.get(), infinityLoopRequest);
        this.page = 1;


        this.gallery
            .append(this.searchForm.get(), this.list.get())

        function inputCallRequest(value){
            self.page = 1;
            self.observer.unobserve(self.list.get());
            self.list.removeItems();

            if(!value) return

            self.api.get('/', {q: value})
                .then(function (res) {
                    res.hits.forEach(function (image) {
                        let img = new Image(image);
                        let li = new ListItem(img.get());

                        self.list.addItem(li.get());
                    })

                    self.observer.observe(self.list.get());
                });
        }

        function infinityLoopRequest(){
            self.observer.unobserve(self.list.get());

            self.api.get('/', {page: self.page++ })
                .then(function (res) {
                    res.hits.forEach(function (image) {
                        let img = new Image(image);
                        let li = new ListItem(img.get());

                        self.list.addItem(li.get());
                    })

                    self.observer.observe(self.list.get());
                });
        }
    }
})()