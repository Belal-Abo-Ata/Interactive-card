function check(el, message, situation) {
  switch (situation) {
    case 1:
      return match(
        el,
        /[^0-9][a-zA-Z]+/g.test(el.value),
        message || 'Please Enter a valid Name',
        el.parentElement.nextElementSibling
      );
      break;
    case 2:
      return match(
        el,
        /\d{16}/g.test(el.value.replace(/\s/g, '')),
        message || 'Wrong format, numbers only',
        el.parentElement.nextElementSibling
      );
      break;
    case 3:
      if (
        !/[2-9][3-9]/g.test(
          el.parentElement.nextElementSibling.firstElementChild.value
        ) &&
        el.value !== ''
      ) {
        return match(
          el,
          /(0[1-9]|1[012])/g.test(el.value),
          'Please enter a valid year'
        );
      } else {
        return match(
          el,
          /(0[1-9]|1[012])/g.test(el.value),
          message || 'Please Enter a Valid Month',
          el.parentElement.nextElementSibling.nextElementSibling
        );
      }
      break;
    case 4:
      if (
        !/(0[1-9]|1[012])/g.test(
          el.parentElement.previousElementSibling.firstElementChild.value
        ) &&
        el.value !== ''
      ) {
        return match(
          el,
          /[2-9][3-9]/g.test(el.value),
          'Please enter a valid month'
        );
      } else {
        return match(
          el,
          /[2-9][3-9]/g.test(el.value),
          message || 'Please Enter a valid year',
          el.parentElement.nextElementSibling
        );
      }
      break;
    case 5:
      return match(
        el,
        /\d{3}/g.test(el.value),
        message || 'Please enter a valid cvc number',
        el.parentElement.nextElementSibling
      );
      break;
  }
}

function match(el, match, message, sibling) {
  sibling !== undefined ? (sibling.innerText = message) : '';
  if (match) {
    el.classList.remove('error');
    el.parentElement.classList.remove('hidden');
    el.parentElement.classList.add('show');
    sibling !== undefined ? (sibling.style.display = 'none') : '';
    return true;
  } else {
    el.classList.add('error');
    el.parentElement.classList.add('hidden');
    el.parentElement.classList.remove('hidden');
    sibling !== undefined ? (sibling.style.display = 'block') : '';
    return false;
  }
}

user.addEventListener('blur', function () {
  check(this, 'Please Enter a Valid Name', 1);
});

number.addEventListener('input', function () {
  this.value = number.value.replace(/\s+/g, '');
  let matches = this.value.match(/\w{4,16}/g);

  let arr = [];
  let match = (matches && matches[0]) || '';
  for (let i = 0; i < match.length; i += 4) {
    arr.push(match.slice(i, i + 4));
  }
  if (arr.length) {
    this.value = arr.join(' ');
  }
});

let arr = number.value.split(' ');

number.addEventListener('blur', function () {
  check(this, 'Wrong format, numbers only', 2);
  arr = number.value.split(' ');
});

month.addEventListener('blur', function () {
  if (this.value.length === 1 && /\d+/g.test(this.value)) {
    this.value = `0${this.value}`;
  }
  check(this, 'Please Enter a Valid Month', 3);
});

year.addEventListener('blur', function () {
  check(this, 'Please enter a valid year', 4);
});

cvc.addEventListener('blur', function () {
  check(this, 'Please enter a valid cvc number', 5);
});

document.querySelectorAll('input').forEach((el) => {
  el.addEventListener('focus', () => {
    el.parentElement.classList.remove('show');
    el.classList.remove('error');
    el.parentElement.classList.add('hidden');
  });
});

let inputs = document.getElementsByTagName('input');
let numberValue = document.querySelector('.card-number');
let nameValue = document.querySelector('.name');
let timeValue = document.querySelector('.time');
let cvcValue = document.querySelector('.card-back span');

document
  .querySelector('.form-current')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    let count = 0;
    Array.from(inputs).forEach((el, index) => {
      if (check(el, '', index + 1)) {
        count++;
      } else {
        el.classList.add('error');
        el.parentElement.classList.add('hidden');
        el.parentElement.classList.remove('show');
      }
      if (el.value === '') {
        check(el, `Can't be blank`, index + 1);
        e.preventDefault();
      }
    });
    if (count !== 5) {
      e.preventDefault();
    } else {
      changeInput();
      for (let i = 0; i < 4; i++) {
        numberValue.children[i].innerText = arr[i];
      }
      nameValue.innerText = user.value;
      timeValue.innerText = `${month.value}/${year.value}`;
      cvcValue.innerText = cvc.value;
      complete();
    }
  });

function changeInput() {
  numberValue.classList.add('hide');
  nameValue.classList.add('hide');
  timeValue.classList.add('hide');
  cvcValue.classList.add('hide');
  setTimeout(() => {
    numberValue.classList.remove('hide');
    nameValue.classList.remove('hide');
    timeValue.classList.remove('hide');
    cvcValue.classList.remove('hide');
    numberValue.classList.add('show');
    nameValue.classList.add('show');
    timeValue.classList.add('show');
    cvcValue.classList.add('show');
  }, 500);
}

function complete() {
  let current = document.querySelector('.form-current');
  let complete = document.querySelector('.form-complete');
  current.classList.add('hide');
  complete.classList.remove('hide');
  // complete.classList.add('sh');
}
