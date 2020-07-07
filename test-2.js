(function(){
    window.onload = function () {
        new Module();
    }

    function Input(input) {
        this.amount = 0;
        this.input = input || document.querySelector('.js-input');

        this.clear = function () {
            this.input.value = 0;
            this.amount = 0;
        }

        this.input.addEventListener('input', function (e) {
            this.amount = +e.target.value || 0
        }.bind(this))
    }

    function Controls(createFunc, destroyFunc, createBtn, destroyBtn) {
        this.createBtn = createBtn || document.querySelector('button[data-action="create"]');
        this.destroyBtn = destroyBtn || document.querySelector('button[data-action="destroy"]');

        this.createBtn.addEventListener('click', function (e) {
            createFunc(e);
        });

        this.destroyBtn.addEventListener('click', function (e) {
            destroyFunc(e);
        });
    }

    function Boxes(box) {
        this.boxStyles = {
            W: 30,
            H: 30,
            get width() {
                let m = this.W + 'px';
                this.W += 10;

                return m;
            },
            get height() {
                let m = this.H + 'px';
                this.H += 10;

                return m;
            },
            border: '1px solid #000',
            margin: '20px 0',
            get backgroundColor() {
                return `rgb(${random()}, ${random()}, ${random()})`
            }
        }
        this.box = box || document.getElementById('boxes');

        this.clearStyles = function () {
            this.boxStyles.W = 30;
            this.boxStyles.H = 30;
        }
        this.createBoxes = function (amount) {
            let frag = document.createDocumentFragment();

            for (let k = 0; k < amount; k++) {
                let elm = document.createElement('div');

                elm.style.width = this.boxStyles.width;
                elm.style.height = this.boxStyles.height;
                elm.style.backgroundColor = this.boxStyles.backgroundColor;
                elm.style.margin = this.boxStyles.margin;
                elm.style.border = this.boxStyles.border;

                frag.appendChild(elm)
            }

            this.box.appendChild(frag);
        }
        this.removeBoxes = function () {
            while (this.box.firstChild) {
                this.box.removeChild(this.box.firstChild);
            }
        }

        function random() {
            return Math.floor(Math.random() * 255);
        }
    }

    function Module() {
        this.destroyFunc = function () {
            this.input.clear();
            this.boxes.clearStyles();
            this.boxes.removeBoxes();
        }
        this.createFunc = function () {
            if(!this.input.amount) return;

            this.boxes.clearStyles();
            this.boxes.removeBoxes();
            this.boxes.createBoxes(this.input.amount)
            this.input.clear();
        }

        this.input = new Input();
        this.controls = new Controls(this.createFunc.bind(this), this.destroyFunc.bind(this));
        this.boxes = new Boxes();
    }
})()