$(document).ready(function () {


    document.body.innerHTML = document.body.innerHTML.replace(/\u2028/g, ' ');

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });


    let navigateSider = $('.slider-nav');
    navigateSider.on('init', organized);
    navigateSider.on('beforeChange', organizedBefore);

    function organized() {
        setTimeout(() => {
            const allSlidesActive = navigateSider[0].querySelectorAll('.slick-active');
            allSlidesActive.forEach((elem, i) => {
                elem.setAttribute('data-slider', i)
            })
        }, 100)
    }

    function organizedBefore(event, slick, currentSlide, nextSlide) {
        setTimeout(() => {
            if (nextSlide === 0 && currentSlide === slick.slideCount - 1) {
                let prevArr = navigateSider[0].querySelectorAll('[data-slider]');
                prevArr.forEach(elem => {
                    let num = elem.getAttribute('data-slider');
                    elem.setAttribute('data-slider', num - 1)
                })
            } else if (nextSlide === slick.slideCount - 1 && currentSlide === 0) {
                let prevArr = navigateSider[0].querySelectorAll('[data-slider]');
                prevArr.forEach(elem => {
                    let num = elem.getAttribute('data-slider');
                    elem.setAttribute('data-slider', 1 + +num)
                })
            } else {
                let prevArr = navigateSider[0].querySelectorAll('.slick-slide');
                prevArr.forEach(elem => {
                    if (elem.getAttribute('data-slider') !== '') elem.setAttribute('data-slider', '')
                })
            }
            const allSlidesActive = navigateSider[0].querySelectorAll('.slick-active');
            allSlidesActive.forEach((elem, i) => {
                elem.setAttribute('data-slider', i)
            })
        }, 100)
    }


    navigateSider.slick({
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '.slider-for',
        swipe: false,
        slidesToShow: 7,
        prevArrow: $('.start-slider__prev'),
        nextArrow: $('.start-slider__next'),
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2,

                }
            }
        ]
    });


    let sliderDiet = $('.slider-diet');

    sliderDiet.slick({
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 200,
        fade: true,
        arrows: false
    });

    document.addEventListener('click', e => {
        let target = e.target;
        if (target.closest('.slider__nav-button_next')) {
            setTimeout(() => {
                sliderDiet.slick("slickNext", 0);
            })
        }
    })

    document.addEventListener('click', e => {
        let target = e.target;
        if (target.closest('.slider__nav-button_prev')) {
            setTimeout(() => {
                sliderDiet.slick("slickPrev", 0);
            })
        }
    })

    sliderDiet.on('beforeChange', sliderDietSync);

    document.addEventListener('click', e => {
        let target = e.target;
        if (target.closest('.nutrition__label-wrapper') || target.closest('.nutrition__week-tab_wrapper') || target.closest('.nutrition__diet-tab-wrapper')) {
            setTimeout(() => {
                sliderDiet.slick("setPosition");
            })
        }
    })

    function sliderDietSync(event, slick, currentSlide, nextSlide) {
        const slider = slick.$slider;
        const wrapper = slider.closest('.nutrition__menu-mid')[0];
        const arrThumb = wrapper.querySelectorAll('.slider-diet__meal');
        arrThumb[currentSlide].classList.remove('active');
        arrThumb[nextSlide].classList.add('active');
    }


    document.addEventListener('click', (e) => {
        let target = e.target;
        if (target.closest('.slider-diet__meal-wrapper')) {
            const slide = target.closest('.slider-diet__meal-wrapper').querySelector('.slider-diet__meal');
            const wrapper = target.closest('.nutrition__menu-mid');
            const arrThumb = wrapper.querySelectorAll('.slider-diet__meal');
            const prevActive = wrapper.querySelector('.slider-diet__meal.active');
            arrThumb.forEach((elem, i) => {
                elem.classList.remove('active');
                if (slide === elem) {
                    elem.classList.add('active');
                    sliderDiet.slick('slickGoTo', i)
                }
            })
        }
    });


    let feedbackSlider = $('.feedback-slider');
    feedbackSlider.on('init', organizedFeedback);
    feedbackSlider.on('beforeChange', organizedFeedbackBefore);

    feedbackSlider.slick({
        centerMode: true,
        centerPadding: '',
        slidesToShow: 5,
        prevArrow: $('.slider-feedback__prev'),
        nextArrow: $('.slider-feedback__next'),
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3
                }
            }
        ]
    });


    function organizedFeedback() {
        setTimeout(() => {
            const allSlidesActive = feedbackSlider[0].querySelectorAll('.slick-active');
            allSlidesActive.forEach((elem, i) => {
                elem.setAttribute('data-slider', i)
            })
        }, 100)
    }

    function organizedFeedbackBefore(event, slick, currentSlide, nextSlide) {
        setTimeout(() => {

            if (nextSlide === 0 && currentSlide === slick.slideCount - 1) {
                let prevArr = feedbackSlider[0].querySelectorAll('[data-slider]');
                prevArr.forEach(elem => {
                    let num = elem.getAttribute('data-slider');
                    elem.setAttribute('data-slider', num - 1)
                })
            } else if (nextSlide === slick.slideCount - 1 && currentSlide === 0) {
                let prevArr = feedbackSlider[0].querySelectorAll('[data-slider]');
                prevArr.forEach(elem => {
                    let num = elem.getAttribute('data-slider');
                    elem.setAttribute('data-slider', 1 + +num)
                })
            } else {
                let prevArr = feedbackSlider[0].querySelectorAll('[data-slider]');
                prevArr.forEach(elem => {
                    elem.setAttribute('data-slider', 'unset')
                })
            }


            const allSlidesActive = feedbackSlider[0].querySelectorAll('.slick-active');
            allSlidesActive.forEach((elem, i) => {
                elem.setAttribute('data-slider', i)
            })
        }, 100)
    }


    let inputDate = document.querySelector('#choose-day');

    $('#date-calendar').datepicker({
        inline: true,
        dateFormat: 'd MM yyyy',
        onSelect: function (formattedDate) {
            inputDate.value = formattedDate;
            let elem = inputDate.closest('.drop-input__wrapper');
            const dataCont = elem.querySelector('.drop-container');
            elem.classList.remove('active');
            dataCont.style.height = '';
        },
        onChangeMonth: function (month, year) {
            let elem = inputDate.closest('.drop-input__wrapper');
            let container = elem.querySelector('.drop-container');
            let wrapper = elem.querySelector('.drop-wrapper');
            container.style.height = wrapper.clientHeight + 'px';
        }
    });
})

function sliderDiet() {
    function initSliderTab() {
        let slider = $('.slider-diet__tab').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        });
        slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            let elem = slick.$slider[0];
            let count = slick.slideCount;
            let cont = elem.closest('.nutrition__wrapper-menu');
        });
        slider.on('init', function (event, slick) {
            let elem = slick.$slider[0];
            let count = slick.slideCount;
            let cont = elem.closest('.nutrition__wrapper-menu');
        })
    }
}

function burgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        header.classList.toggle('active');
    });
}

function basketOrdering() {
    const buttonOrdering = document.querySelector('.product-basket__button');
    //const buttonContinue = document.querySelector('.product-basket__continue-button');
    const ordering = document.querySelector('.basket__right');

    if (buttonOrdering) {
        buttonOrdering.addEventListener('click', () => {
            buttonOrdering.classList.toggle('none');
            //buttonContinue.classList.toggle('none');
            ordering.classList.toggle('active');
        });
    }
}

function accordion() {
    document.addEventListener('click', evt => {
        let target = evt.target;
        if (target.closest('.drop-header')) {
            const box = target.closest('.drop-box');
            const container = box.querySelector('.drop-container');
            const wrapper = box.querySelector('.drop-wrapper');
            box.classList.contains('active') ? close() : open();

            function open() {
                box.classList.add('active');
                container.style.height = wrapper.clientHeight + 'px';
            }

            function close() {
                box.classList.remove('active');
                container.style.height = '';
            }
        }
    });
}

function profilePages() {

}


function productDays() {

}

function countLogic() {
    document.addEventListener("click", evt => {
        let target = evt.target
        if (target.closest('.count__oper')) {
            const oper = target.closest('.count__oper');
            const cont = oper.closest('.count');
            const input = cont.querySelector('.count__input');
            const display = cont.querySelector('.count__display')

            let count = input.value

            function up() {
                input.value++
            }

            function down() {
                if (count > 1) input.value--
            }

            oper.classList.contains('count__plus') ? up() : down();

            display.innerText = input.value;
        }

    })
}

function selectLogic() {
    document.addEventListener('click', e => {
        let target = e.target;
        if (target.closest('.select__item')) {
            let select = target.closest('.select');
            let item = target.closest('.select__item');
            let input = select.querySelector('input');
            let prevActive = select.querySelector('.select__item.active');
            if (prevActive) prevActive.classList.remove('active');
            select.classList.remove('active');
            let cont = select.querySelector('.drop-container');
            cont.style.height = '';
            item.classList.add('active')
            input.value = item.innerText;
        }
    })
}


function selectDay() {
    document.addEventListener('click', e => {
        let target = e.target;
        if (target.closest('.day-number__item')) {
            setTimeout(() => {
                let dayNumber = target.closest('.day-number');
                let header = dayNumber.querySelector('.day-number__header');
                let headerValue = header.querySelector('.day-number__value');
                let headerPriceDay = header.querySelector('.day-number__price-day');
                let headerPrice = header.querySelector('.day-number__price');

                let select = target.closest('.day-number__item');
                let selectValue = select.querySelector('.day-number__value');
                let selectPriceDay = select.querySelector('.day-number__price-day');
                let selectPrice = select.querySelector('.day-number__price');

                headerValue.innerText = selectValue.innerText;
                headerPriceDay.innerText = selectPriceDay.innerText;
                headerPrice.innerText = selectPrice.innerText;


                dayNumber.classList.remove('active');
                let cont = dayNumber.querySelector('.drop-container');
                cont.style.height = '';
            })
        }
    })
}


function maskInput() {
    let keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i !== -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type === "blur" && this.value.length < 5) this.value = ""
    }

    let input = document.querySelectorAll('.mask-tel');
    input.forEach(elem => {
        elem.addEventListener("input", mask, false);
        elem.addEventListener("focus", mask, false);
        elem.addEventListener("blur", mask, false);
        elem.addEventListener("keydown", mask, false);
    });

}


window.onload = function () {
    burgerMenu();
    sliderDiet();
    accordion();
    basketOrdering();
    profilePages();
    productDays();
    selectLogic();
    selectDay();
    maskInput();


}