$(document).ready(function() {

	// Menu
	var navButton = $('.nav-button');
	var navToggle = $('.nav-toggle');

	var navBox = $('.nav-box');

	var navWrapper = $('.nav-wrapper');

	var navInnerWrap = $('.nav-inner-wrap');
	var navOverlay = $('.nav-overlay');

	var navLink = $('.nav-main__link');
	var navSubLink = $('.nav-sub__link');

	var navLinkArrow = $('.nav-main__link--arrow');
	var navSubLinkArrow = $('.nav-sub__link--arrow');

	var navSubBack = $('.nav-sub__back');
	var navSecondSubBack = $('.second-sub__back');


	function getScroll() {

		document.onmousewheel=document.onwheel=function(){ 
			return false;
		};
		//document.addEventListener("MozMousePixelScroll",function(){return false},false);
		document.onkeydown=function(e) {
			if (e.keyCode>=33&&e.keyCode<=40) return false;
		}
	}

	function stopScroll() {

		document.onmousewheel=document.onwheel=function(){ 
			return true;
		};
		//document.addEventListener("MozMousePixelScroll",function(){return true},true);
		document.onkeydown=function(e) {
			if (e.keyCode>=33&&e.keyCode<=40) return true;
		}
	}	
	
	navBox.on('click', function(){
		if (navToggle.hasClass('nav-toggle--closed')) {
			navToggle.removeClass('nav-toggle--closed').addClass('nav-toggle--opened');
			navWrapper.removeClass('nav-wrapper--closed').slideToggle('slow').addClass('nav-wrapper--opened');
			navButton.addClass('active');
			navOverlay.addClass('active');
    		//$('body').addClass('noscroll').css('overflow-y', 'auto');
    		getScroll();

    	} else {
    		navButton.removeClass('active');
    		navToggle.removeClass('nav-toggle--opened').addClass('nav-toggle--closed');
    		navWrapper.removeClass('nav-wrapper--opened').slideToggle('slow').addClass('nav-wrapper--closed');
    		navButton.removeClass('active');
    		navOverlay.removeClass('active');
    		//$('body').removeClass('noscroll');
    		stopScroll();
    	}
    });


	navOverlay.on('click', function(){
		navButton.removeClass('active');
		navToggle.removeClass('nav-toggle--opened').addClass('nav-toggle--closed');
		navWrapper.removeClass('nav-wrapper--opened').slideToggle('slow').addClass('nav-wrapper--closed');
		navButton.removeClass('active');
		navOverlay.removeClass('active');
		//$('body').removeClass('noscroll');
		stopScroll();
	});

	
	// Desktop menu
	function hoverMenu() {

		navLink.unbind('click');
		navSubLink.unbind('click');


		$('.nav-main').css('left', '0%').stop();
		$('.nav-sub').css('left', '100%').stop();
		$('.second-sub').css('left', '100%').stop();

		navLink.hover(function(){
			$('.nav-main__item').removeClass('active');
			$('.nav-main__link').removeClass('active');
			$('.nav-sub').removeClass('active');
			$('.nav-sub__item').removeClass('active');
			$('.nav-sub__link').removeClass('active');
			$('.second-sub').removeClass('active');

			var hovered = $(this);
			hovered.addClass('active');

			if (hovered.hasClass('nav-main__link--arrow')) {
				var hoveredSub = hovered.next('.nav-sub');
				hoveredSub.addClass('active');
				hoveredSubItem = hoveredSub.find('.nav-sub__item').eq(1);
				hoveredSubItem.addClass('active').find('.nav-sub__link').addClass('active');
				hoveredSubItem.find('.nav-sub__link').next('.second-sub').addClass('active');
			}	

		    //navLink.parent().removeClass('active');

		    if (navLink.hasClass('active')) {
		    	$(this).parent().addClass('active');
		    }

		});

		navSubLink.hover(function(){
			$('.nav-sub__link').removeClass('active');
			$('.second-sub').removeClass('active');

			$(this).addClass('active');
			$(this).next().addClass('active');

			navSubLink.parent().removeClass('active');

			if (navSubLink.hasClass('active')) {
				$(this).parent().addClass('active');
			}
		});

	} 


	// Mobile menu
	function clickMenu() {

		navLink.unbind('mouseenter mouseleave');
		navSubLink.unbind('mouseenter mouseleave');

		navSubBack.unbind('hover');
		navSecondSubBack.unbind('hover');

		navInnerWrap.unbind('click');

		$('.nav-main__item').removeClass('active');
		$('.nav-sub__item').removeClass('active');

		$('.nav-main__link').removeClass('active');
		$('.nav-sub__link').removeClass('active');

		navLink.on('click', function(e){
			e.preventDefault();
		});

	    /*navSubLink.on('click', function(e){
	    	e.preventDefault();
	    });*/

	    navLinkArrow.on('click', function(e){
	    	e.preventDefault();
	    	$('.nav-main').animate({left: '-100%' },700);

	    	$('.nav-main__link').removeClass('active');
	    	$('.nav-sub').removeClass('active');
	    	$('.second-sub').removeClass('active');

	    	$(this).next().addClass('active').animate({left: '100%' },700);
	    });

	    navSubLinkArrow.on('click', function(e){
	    	e.preventDefault();
	    	$('.nav-sub__link').removeClass('active');
	    	$('.second-sub').removeClass('active');

	    	$(this).parent().parent().animate({left: '0%' },700);
	    	$(this).next().addClass('active').animate({left: '100%' },700);
	    });

	    navSubBack.on('click', function(){
	    	$(this).parent().animate({left: '100%' },700);
	    	$(this).parent().parent().parent().animate({left: '0%' },700);
	    }); 

	    navSecondSubBack.on('click', function(){
	    	$(this).parent().animate({left: '100%' },700);
	    	$(this).parent().parent().parent().animate({left: '100%' },700);
	    }); 
	}  


	if ($(window).width() > 768) {
		hoverMenu();

		if($('.nav-main li a').not().hasClass('nav-main__link--arrow')) {

			$('.nav-main li').on('click', function(){
				var linkHref = $(this).find('a').attr('href');
				window.location.replace(linkHref);
			});
		}

		$('.owl-carousel').trigger('refresh.owl.carousel');

	} else {
		clickMenu();
		$('.owl-carousel').trigger('refresh.owl.carousel');
	}	
	
	$(window).resize(function() {
		if ($(window).width() > 768) {
			hoverMenu();

			if($('.nav-main li a').not().hasClass('nav-main__link--arrow')) {

				$('.nav-main li').on('click', function(){
					var linkHref = $(this).find('a').attr('href');
					window.location.replace(linkHref);
				});
			}

			$('.owl-carousel').trigger('refresh.owl.carousel');
		} else {
			clickMenu();
		}	

		$('.owl-carousel').trigger('refresh.owl.carousel');
	});


	// Validation inputs


	$(document).on('input', '[id=meter-calculation]', function(e){
		var val = $(this).val();
		val = val
		.replace(/\,/g,'.')
		.replace(/(\.)+?(.*)(\.)/,'$1$2')
		.replace(/([^,.\d])|([,.](?=[,.]))|(^\D)/g,'')
		.replace(/([,.]\d{2})(\d)/,'$1');
		$(this).val(val);
	});


	$(function(e) {
		e.mask.definitions.Z = "[1,2,3,4,5,6,9]";
		e('input[type="tel"]').mask("+7 (Z99) 999-99-99")
	});


	//  Validation form (not empty)


	function validateFormZvonok() {

		$('#zvonok').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormZvonok();

	function validateFormZvonok1() {

		$('#zvonok1').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormZvonok1();


	function validateFormZvonok2() {

		$('#zvonok2').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormZvonok2();

	function validateFormUchastvovat() {

		$('#uchastvovat').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormUchastvovat();

	function validateFormRed() {

		$('#red').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormRed();

	function validateFormGreen() {

		$('#green').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormGreen();


	function validateForm() {

		$('#form-1').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateForm();

	function validateFormPriyomka() {

		$('#form-1-priyomka').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormPriyomka();


	function validateFormCalculation() {

		$('#form-calculation').each(function(){
	    	// Объявляем переменные (форма и кнопка отправки)
	    	var form = $(this),
	    	btn = form.find('button[type="submit"]');

	    	// Добавляем каждому проверяемому полю, указание что поле пустое
	    	form.find('.form-input').addClass('empty-field');
	    	form.find('.selectric-wrapper').addClass('empty-field');

	    	// Функция проверки полей формы
	    	function checkInput(){
	    		form.find('.form-input').each(function(){
	    			if($(this).val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });

	    		form.find('.form-select').each(function(){
	    			if($('.form-select option:selected').val() != ''){
			          	// Если поле не пустое удаляем класс-указание
			          	$(this).removeClass('empty-field');
			          } else {
			          	// Если поле пустое добавляем класс-указание
			          	$(this).addClass('empty-field');
			          }
			      });
	    	}

		    // Функция подсветки незаполненных полей
		    function lightEmpty(){
		    	form.find('.empty-field').addClass('error');
		      	// Через полсекунды удаляем подсветку
		      	/*setTimeout(function(){
		        	form.find('.empty-field').removeClass('error');
		        }, 1500);*/
		    }

		    form.find('.empty-field').on('change', function(){
		    	if ($(this).val() != '') {
		    		$(this).removeClass('empty-field').removeClass('error');
		    	}
		    });

		    // Проверка в режиме реального времени
		    setInterval(function(){
		      	// Запускаем функцию проверки полей на заполненность
		      	checkInput();
		      	// Считаем к-во незаполненных полей
		      	var sizeEmpty = form.find('.empty-field').size();
		      	// Вешаем условие-тригер на кнопку отправки формы
		      	if(sizeEmpty > 0) {
		      		if(btn.hasClass('disabled')){
		      			return false
		      		} else {
		      			btn.addClass('disabled')
		      		}
		      	} else {
		      		btn.removeClass('disabled')
		      	}

		      }, 1500);

		    // Событие клика по кнопке отправить
		    btn.click(function(){
		    	if($(this).hasClass('disabled')) {
		        	// подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
		        	lightEmpty();
		        	return false
		        } else {
		        	// Все хорошо, все заполнено, отправляем форму
		        	form.submit();
		        }
		    });
		});
	};

	validateFormCalculation();


	/*  Select plagin  */

	$(function() {
		$('select').selectric();
	});

	  // Arrays for calculator

  // Вся квартира

  var roomTypeValsOneMeter = {
      roomType1: 2400, // жилая комната
      roomType2: 2790, // кухня
      roomType3: 11750,  // ванная
      roomType4: 14500,  // туалет
      roomType5: 11750,  // совмещенный санузел
      roomType6: 2790, // квартира
      roomType7: 4680, // новостройка
  }

  var roomTypeVals = {
      roomType1: 28800,   // жилая комната
      roomType2: 16740,   // кухня
      roomType3: 23500,    // ванная
      roomType4: 29000,  // туалет
      roomType5: 23500,  // совмещенный санузел
      roomType6: 69750,   // квартира
      roomType7: 117000,  // новостройка
  }

  var materialsVals = {
      roomType1: [0.06, 0.21, 0.32, 1],      // жилая комната
      roomType2: [0.11, 0.21, 0.32, 1],      // кухня
      roomType3: [0.05, 0.13, 0.15, 1],       // ванная
      roomType4: [0.05, 0.13, 0.15, 1],       // туалет
      roomType5: [0.05, 0.13, 0.15, 1],       // совмещенный санузел
      roomType6: [0.08, 0.19, 0.31, 1],      // квартира
      roomType7: [0.07, 0.12, 0.18, 0.29],      // новостройка
  }

  var roomTypeDays = {
      roomType1: 4,   // жилая комната
      roomType2: 4,   // кухня
      roomType3: 3,     // ванная
      roomType4: 3,     // туалет
      roomType5: 3,     // совмещенный санузел
      roomType6: 12,    // квартира
      roomType7: 12,    // новостройка
  }

  var standardMeter = {
      roomType1: 12,   // жилая комната
      roomType2: 6,    // кухня
      roomType3: 2,     // ванная
      roomType4: 2,     // туалет
      roomType5: 2,     // совмещенный санузел
      roomType6: 25,   // квартира
      roomType7: 25,   // новостройка
  }

  var standardMeterDiffStep = {
      roomTypeFlat: [0.2, 0.2, 0.2, 0.2, 0.2],  // квартира
      roomTypeRoom: [0.5, 0.5, 0.5, 0.5, 0.5]   // комната
  }

  var standardMeterDiffDays = {
      roomTypeFlat: [2, 2, 2, 2, 2],    // квартира
      roomTypeRoom: [1, 1, 2, 2, 2]     // комната
  }

    /*var remontTypeVals = {
      roomType1: [1, 1, 1, 1.4315, 2.4730],       // жилая комната
      roomType2: [1, 1, 1, 2, 2.25],              // кухня
      roomType3: [1, 1, 1, 1.05, 1.49],           // коридор
      roomType4: [1, 1, 1, 2.54042, 2.97021],     // ванная
      roomType5: [1, 1, 1, 1.48466, 2.13496],     // туалет
      roomType6: [1, 1, 1, 1.31063, 2.97021],     // совмещенный санузел
      roomType7: [1, 1, 1, 1.48745, 2.1362],      // квартира
      roomType8: [1, 1.381818, 1.654545, 1.872727],     // новостройка
  }*/

  var remontTypeDays = {
      roomType1: [4, 8, 18, 1],      // жилая комната
      roomType2: [4, 7, 16, 1],      // кухня
      roomType3: [3, 14, 15, 1],     // ванная
      roomType4: [3, 14, 15, 1],     // туалет
      roomType5: [3, 14, 15, 1],     // совмещенный санузел
      roomType6: [12, 25, 32, 1],    // квартира
      roomType7: [12, 16, 25, 32],    // новостройка
  }


  var oneMetrVals = {
      roomType1: [2400, 3450, 5300, 1],      // жилая комната
      roomType2: [2790, 4150, 5960, 1],      // кухня
      roomType3: [11750, 29800, 34900, 1],    // ванная
      roomType4: [14500, 24200, 34800, 1],    // туалет
      roomType5: [11750, 29800, 34900, 1],    // совмещенный санузел
      roomType6: [2790, 4150, 5960, 1],      // квартира
      roomType7: [2790, 4200, 5500, 6300]     // новостройка
  }


  function addOverStandardDays(roomType, remontType, valueMetrs) {
  	var remontTypeDay = 0;
      // во сколько раз больше стандарта
      var valueMetrsDiffStandard = valueMetrs/standardMeter['roomType' + roomType];
      if (valueMetrsDiffStandard >= 1) {

        var stepsOverStandard = valueMetrsDiffStandard - 1; // насколько больше, чем в 1 раз
        var stepSize;
        if (roomType < 5) {
        	stepSize = standardMeterDiffStep['roomTypeRoom'][remontType-1];
        } else {
        	stepSize = standardMeterDiffStep['roomTypeFlat'][remontType-1];
        }

        stepsOverStandard = Math.floor(stepsOverStandard/stepSize); // количество шагов

        var stepDays;
        if (roomType < 5) {
        	stepDays = standardMeterDiffDays['roomTypeRoom'][remontType-1];
        } else {
        	stepDays = standardMeterDiffDays['roomTypeFlat'][remontType-1];
        }

        var daysOverStandard = Math.floor(stepsOverStandard * stepDays);

        remontTypeDay += daysOverStandard;

        var string = 'Стандартный метр:' + standardMeter['roomType' + roomType] + ' больше стандарта в ' + valueMetrsDiffStandard;
        string = string + ' степ сайз ' + stepSize + ' степ дэйс ' + stepDays;
        string = string + ' степ овер ' + stepsOverStandard + ' дейc овер ' + daysOverStandard;
        //alert(string);
    }
    return remontTypeDay;
}


function calculateStep(step) {
		if (step == 1) {

        //Вариант жилья
        var roomType = $('#type-room2 option:selected').val();

        var roomTypeVal = roomTypeVals['roomType'+roomType]; 
        var roomTypeDay = roomTypeDays['roomType'+roomType];
        var remontType = $('#type-remont-room option:selected').data('type-remont-room');

        var standardMeterVal = standardMeter['roomType'+roomType];

        //var remontTypeVal = remontTypeVals['roomType'+roomType][remontType-1];
        var materialsVal = materialsVals['roomType'+roomType][remontType-1];
        var remontTypeDay = remontTypeDays['roomType'+roomType][remontType-1];

        $('.tooltips-box').removeClass('active');
        $('#type-remont-room-' + remontType).addClass('active');

        var oneMetr = oneMetrVals['roomType' + roomType][remontType-1];

        var valueMetrs = $('#enter-value-room').val();

        if (valueMetrs >= 200) {
        	$('.calculator-column--cost, .calculator-column--materials, .calculator-column--date').addClass('disabled');
        	$('.calculator-value-error').addClass('active');
        } else {
        	$('.calculator-column--cost, .calculator-column--materials, .calculator-column--date').removeClass('disabled');
        	$('.calculator-value-error').removeClass('active');
        }

        if (roomType == 1) {
        	valueMetrs = ((typeof valueMetrs === 'undefined' || valueMetrs < 1) ? 12 : valueMetrs);

        	$('#enter-value-room').prop('placeholder', '12');


        } else if (roomType == 2) {
        	valueMetrs = ((typeof valueMetrs === 'undefined' || valueMetrs < 1) ? 6 : valueMetrs);

        	$('#enter-value-room').prop('placeholder', '6');

        } else {
        	valueMetrs = ((typeof valueMetrs === 'undefined' || valueMetrs < 1) ? 2 : valueMetrs);

        	$('#enter-value-room').prop('placeholder', '2');
        }

        var k;
        var m;

        k = oneMetr * standardMeterVal;
        m = oneMetr * valueMetrs;

        var detailsSum;
        if (valueMetrs.length == 0) {
        	detailsSum = k;
        } else {
        	detailsSum = Math.ceil(m);
        }

        if (roomType == 5) {
          //detailsSum = detailsSum * 1.2;
          remontTypeDay = Math.ceil(remontTypeDay * 1.2);
      } else if (roomType == 4) {
      	roomTypeDay = Math.ceil(roomTypeDay/2);
      }

      remontTypeDay += addOverStandardDays(roomType, remontType, valueMetrs);

      $('.value').html(valueMetrs);
      $('.select-result2').html(Math.ceil((detailsSum / 1000).toFixed(0) * 1000 * 0.8) + '&nbsp; руб.');
      $('.select-materials').html(Math.ceil((detailsSum * materialsVal / 100).toFixed(0) * 100 * 0.8) + '&nbsp; руб.');
      $('.select-days2').html(remontTypeDay + '&nbsp; дн.');

        // Room
        var roomTypeResult = $('#type-room2 option:selected').text();
        var valueMetrs = $('#enter-value-room').val();
        var roomRemontResult = $('#type-remont-room option:selected').text();

        var valRoomType = roomTypeResult;
        var valRoomMeter = valueMetrs;
        var valRoomRemont = roomRemontResult;

        var valSum = detailsSum;
        var valDays = remontTypeDay;

        $('input[name="resultValRoomType"]').val(valRoomType);
        $('input[name="resultValRoomMeter"]').val(valRoomMeter);
        $('input[name="resultValRoomRemont"]').val(valRoomRemont);

        $('input[name="resultValSum"]').val(Math.ceil((detailsSum / 1000).toFixed(0) * 1000 * 0.8));
        $('input[name="resultValDays"]').val(remontTypeDay);
        <!--Roistat-->
        $('input[name="resultValSumMaterial"]').val(Math.ceil((detailsSum * materialsVal / 100).toFixed(0) * 100 * 0.8));
        <!--Roistat END-->

    } else if (step == 2) {
        //Вариант жилья
        var roomType = 6;

        var roomTypeVal = roomTypeVals['roomType'+roomType];
        var roomTypeDay = roomTypeDays['roomType'+roomType];
        var remontType = $('#type-remont-apartment option:selected').data('type-remont-apartment');
        //var remontTypeVal = remontTypeVals['roomType'+roomType][remontType-1];
        var materialsVal = materialsVals['roomType'+roomType][remontType-1];
        var remontTypeDay = remontTypeDays['roomType'+roomType][remontType-1];

        var standardMeterVal = standardMeter['roomType'+roomType];

        $('.tooltips-box-apartment').removeClass('active');
        $('#type-remont-apartment-' + remontType).addClass('active');

        var oneMetr = oneMetrVals['roomType' + roomType][remontType-1];

        var valueMetrsFlat = $('#enter-value2').val();
        
        //valueMetrs = ((typeof valueMetrs === 'undefined' || valueMetrs < 1) ? 25 : valueMetrs);

        if (valueMetrsFlat >= 200) {
        	$('.calculator-column--cost, .calculator-column--materials, .calculator-column--date').addClass('disabled');
        	$('.calculator-value-error').addClass('active');
        } else {
        	$('.calculator-column--cost, .calculator-column--materials, .calculator-column--date').removeClass('disabled');
        	$('.calculator-value-error').removeClass('active');
        }

        var rooms = $('input[name="room"]:checked','#rooms2').val();

        var k;
        var m;

        k = oneMetr * rooms;
        m = oneMetr * valueMetrsFlat;


        var detailsSumFlat;
        if (valueMetrsFlat.length == 0) {
        	$('#enter-value2').prop('placeholder', rooms);
        	detailsSumFlat = k;
        } else {
        	detailsSumFlat = Math.ceil(m);
        }

        remontTypeDayFlat = Math.round(remontTypeDay * $('input[name="room"]:checked', '#rooms2').data('number-room'));

        remontTypeDayFlat += addOverStandardDays(roomType, remontType, valueMetrs);

        $('.value').html(valueMetrsFlat);
        $('.select-result2').html(Math.ceil((detailsSumFlat / 1000).toFixed(0) * 1000 * 0.8) + '&nbsp; руб.'); 
        $('.select-materials').html(Math.ceil((detailsSumFlat * materialsVal / 100).toFixed(0) * 100 * 0.8) + '&nbsp; руб.'); 
        $('.select-days2').html(remontTypeDayFlat + '&nbsp; дн.');

        // Flat
        var flatTypeResult = $('input[name="room"]:checked + label').html();
        var valueMetrsFlat = $('#enter-value2').val();
        var flatRemontResult = $('#type-remont-apartment option:selected').text();

        var valFlatType = flatTypeResult;
        var valFlatMeter = valueMetrsFlat;
        var valFlatRemont = flatRemontResult;

        var valSumFlat = detailsSumFlat;
        var valDaysFlat = remontTypeDayFlat;

        $('input[name="resultValFlatType"]').val(flatTypeResult);
        $('input[name="resultValFlatMeterPlaceholder"]').val(rooms);
        $('input[name="resultValFlatMeter"]').val(valueMetrsFlat);
        $('input[name="resultValFlatRemont"]').val(flatRemontResult);

        $('input[name="resultValSumFlat"]').val(Math.ceil((detailsSumFlat / 1000).toFixed(0) * 1000 * 0.8));
        <!--Roistat-->
        $('input[name="resultValSumFlatMaterial"]').val(Math.ceil((detailsSumFlat * materialsVal / 100).toFixed(0) * 100 * 0.8));
        <!--Roistat-->
        $('input[name="resultValDaysFlat"]').val(remontTypeDayFlat);

    } else if (step == 3) {
        //Вариант жилья
        var roomType = 7;

        var roomTypeVal = roomTypeVals['roomType'+roomType];
        var roomTypeDay = roomTypeDays['roomType'+roomType];
        var remontType = $('#type-finish option:selected').val();
        //var remontTypeVal = remontTypeVals['roomType'+roomType][remontType-1];
        var materialsVal = materialsVals['roomType'+roomType][remontType-1];
        var remontTypeDay = remontTypeDays['roomType'+roomType][remontType-1];

        var standardMeterVal = standardMeter['roomType'+roomType];

        var oneMetr = oneMetrVals['roomType' + roomType][remontType-1];

        var valueMetrsNew = $('#enter-value-new-room').val();
        
        //valueMetrs = ((typeof valueMetrs === 'undefined' || valueMetrs < 1) ? 30 : valueMetrs);

        if (valueMetrsNew >= 200) {
        	$('.calculator-column--cost, .calculator-column--materials, .calculator-column--date').addClass('disabled');
        	$('.calculator-value-error').addClass('active');
        } else {
        	$('.calculator-column--cost, .calculator-column--materials, .calculator-column--date').removeClass('disabled');
        	$('.calculator-value-error').removeClass('active');
        }

        var roomsNew = $('input[name="roomNew"]:checked','#rooms-new2').val();

        //var studia = $('input[id="room-new-1"]','#rooms-new2').val();

        if (remontType == 4) {
        	$('input[name="roomNew"]','#rooms-new2').prop('checked', false);
        	$('input[id="room-new-1"]','#rooms-new2').prop('checked', true);

        	$('input[name="roomNew"]+label','#rooms-new2').not(':first').addClass('unbind-hover');
        } else {
        	$('input[name="roomNew"]+label','#rooms-new2').removeClass('unbind-hover');
        }

        var k;
        var m;

        k = oneMetr * roomsNew;
        m = oneMetr * valueMetrsNew;

        var detailsSumNew;
        if (valueMetrsNew.length == 0) {
        	$('#enter-value-new-room').prop('placeholder', roomsNew);
        	detailsSumNew = k;
        } else {
        	detailsSumNew = Math.ceil(m);
        }

        if (remontType == 4) {
        	$('#enter-value-new-room').prop('placeholder', '25');
        }

        remontTypeDayNew = Math.round(remontTypeDay * $('input[name="roomNew"]:checked', '#rooms-new2').data('number-room'));

        remontTypeDayNew += addOverStandardDays(roomType, remontType, valueMetrs);

        $('.value').html(valueMetrsNew);
        $('.select-result2').html(Math.ceil((detailsSumNew / 1000).toFixed(0) * 1000 * 0.8) + '&nbsp; руб.');
        $('.select-materials').html(Math.ceil((detailsSumNew * materialsVal / 100).toFixed(0) * 100 * 0.8) + '&nbsp; руб.');
        $('.select-days2').html(remontTypeDayNew + '&nbsp; дн.');

        // New Flat
        var newTypeResult = $('input[name="roomNew"]:checked + label').html();
        var valueMetrsNew = $('#enter-value-new-room').val();
        var newRemontResult = $('#type-finish option:selected').text();

        var valNewType = newTypeResult;
        var valNewMeter = valueMetrsNew;
        var valNewRemont = newRemontResult;

        var valSumNew = detailsSumNew;
        var valDaysNew = remontTypeDayNew;

        $('input[name="resultValNewType"]').val(newTypeResult);
        $('input[name="resultValNewMeterPlaceholder"]').val(roomsNew);
        <!--Roistat-->
        $('input[name="resultValNewMeter"]').val(valueMetrsNew);
        <!--Roistat-->
        $('input[name="resultValNewRemont"]').val(newRemontResult);

        $('input[name="resultValSumNew"]').val(Math.ceil((detailsSumNew / 1000).toFixed(0) * 1000 * 0.8));
        $('input[name="resultValSumNewMaterial"]').val(Math.ceil((detailsSumNew * materialsVal / 100).toFixed(0) * 100 * 0.8));
        $('input[name="resultValDaysNew"]').val(remontTypeDayNew);

    } 
}

setTimeout(function() {
	calculateStep(2);
}, 3);

calculateStep(2);

    // Step 1

    $('#room select, #room input').on('change', function(){
    	calculateStep(1);
    });

    // Step 2

    $('#flat select, #flat input').on('change', function(){
    	calculateStep(2);
    }); 

    // Step 3

    $('#new-apartment input, #new-apartment select').on('change', function(){
    	calculateStep(3);
    });  

    // Step 4

    $('#bath input, #bath select').on('change', function(){
    	calculateStep(4);
    });  
    
    // Toggle steps

    $('#calculator__tab li').on('click', function(e){
    	e.preventDefault();
    	var step = $(this).data('step');

    	$('#calculator__tab li').removeClass('active');
    	$('div[id^="step"]').removeClass('active');

    	$('#calculator__tab li[data-step="' + step + '"]').addClass('active');
    	$('#step-' + step).addClass('active');

    	calculateStep(step);

    });

    // Toggle steps mobile

    $('#calculator-tab-mob').on('change', function(e){
    	//alert();
    	e.preventDefault();
    	var step = $('#calculator-tab-mob option:selected').data('step');

    	$('#calculator__tab li').removeClass('active');
    	$('div[id^="step"]').removeClass('active');

    	$('#calculator__tab li[data-step="' + step + '"]').addClass('active');
    	$('#step-' + step).addClass('active');

    	calculateStep(step);

    });

    // Calculator summit

    $('#calculator-submit-1').on('click', function(){

    	var getEngineer = $('#phone-calculator-1');
    	var getEngineerVal = $('#phone-calculator-1').val();

    	if (getEngineerVal.length == 0) {
    		getEngineer.addClass('error');
    		return false;
    	} else {
    		getEngineer.removeClass('error');
    	}
    });

    $('#calculator-submit-2').on('click', function(){

    	var getEngineerFlat = $('#phone-calculator-2');
    	var getEngineerFlatVal = $('#phone-calculator-2').val();

    	if (getEngineerFlatVal.length == 0) {
    		getEngineerFlat.addClass('error');
    		return false;
    	} else {
    		getEngineerFlat.removeClass('error');
    	}
    });

    $('#calculator-submit-3').on('click', function(){

    	var getEngineerApartment = $('#phone-calculator-3');
    	var getEngineerApartmentVal = $('#phone-calculator-3').val();

    	if (getEngineerApartmentVal.length == 0) {
    		getEngineerApartment.addClass('error');
    		return false;
    	} else {
    		getEngineerApartment.removeClass('error');
    	}
    });

    // Validation inputs

    $(document).on('input', '[id=enter-value-room], [id=enter-value2], [id=enter-value-new-room]', function(e){
    	var val = $(this).val();
    	val = val
    	.replace(/\,/g,'.')
    	.replace(/(\.)+?(.*)(\.)/,'$1$2')
    	.replace(/([^,.\d])|([,.](?=[,.]))|(^\D)/g,'')
    	.replace(/([,.]\d{2})(\d)/,'$1');
    	$(this).val(val);
    });


		

});	

$(window).load(function() {
	/*  Slider portfolio  */


});	  

