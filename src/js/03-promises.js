function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');



async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const firstDelay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  if (step <= 0 || firstDelay <= 0 || amount <= 0) {
    alert('Некоректні значення step, delay або amount. Введіть правильні значення.');
    return;
  }

  for (let i = 0; i < amount; i++) {
    const delay = firstDelay + i * step;
    try {
      const result = await createPromise(i + 1, delay);
      console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }
  }
}

form.addEventListener('submit', handleSubmit);