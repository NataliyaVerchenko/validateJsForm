/**
 * Created by user on 10-Oct-18.
 */
class Validation {
    constructor(form, selector) {
        this.form = form;
        this.selector = selector;
        this.errors = [];
        this.init();
    }

    checkField(element, pattern){
        if(!pattern.test(element.value) || element.value === ''){
            this.errors.push(element);
            element.style.border="2px solid red";
            element.parentNode.querySelector(".invalid-feedback").style.display = "block";
            element.parentNode.querySelector(".valid-feedback").style.display = "none";
        } else {
            element.style.borderWidth="0px";
            element.parentNode.querySelector(".invalid-feedback").style.display = "none";
            element.parentNode.querySelector(".valid-feedback").style.display = "block";
        }
    }

    choosePatern(inputType){
        switch (inputType){
            case 'Name':
                return /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;

            case 'phone':
                return  /^\+380\d{3}\d{2}\d{2}\d{2}$/;

            case 'email':
                return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            case 'password':
                return  /(?=.*[0-9])[0-9]{8,}/g
        }
    }

    init() {
        let fail = false;

        let elements = this.form.querySelectorAll(this.selector);
        elements.forEach(element => {
            let pattern = this.choosePatern(element.dataset.valid);

        element.onchange = () => this.checkField(element, pattern);

    })

        this.form.onsubmit = () => {
            this.errors = [];
            elements.forEach(element => {
                let pattern = this.choosePatern(element.dataset.valid);

            this.checkField(element, pattern);

        })
            console.log(this.errors)
            if (this.errors.length > 0){
                return false;
            } else {
                alert('Форма заполнена правильно');
                return true;
            }
        }
    }
}

let validation = new Validation(document.querySelector('.form'), '[data-valid]');

