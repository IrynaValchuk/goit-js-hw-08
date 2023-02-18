import throttle from 'lodash.throttle';

const formFeedbackEl = document.querySelector('.feedback-form');
const inputEmailEl = document.querySelector('.feedback-form input');
const textareaMessageEl = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';

const onFeedbackFormInput = () => {
  const formData = {
    email: inputEmailEl.value,
    message: textareaMessageEl.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};

const populateFeedbackFormInput = () => {
  const parsedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedFormData) {
    inputEmailEl.value = parsedFormData.email;
    textareaMessageEl.value = parsedFormData.message;
  }
};

populateFeedbackFormInput();

formFeedbackEl.addEventListener('input', throttle(onFeedbackFormInput, 500));
formFeedbackEl.addEventListener('submit', onFormSubmit);
