document.getElementById('generate').addEventListener('click', () => {
  const number = parseInt(document.getElementById('number').value);
  const type = document.getElementById('type').value;
  const operation = document.getElementById('operation').value;

  if (isNaN(number) || number <= 0) {
    alert('Please enter a positive number.');
    return;
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const isComposite = (num) => num > 1 && !isPrime(num);

  const validNumbers = [];
  for (let i = 1; i <= number; i++) {
    if (type === 'prime' && !isPrime(i)) continue;
    if (type === 'composite' && !isComposite(i)) continue;
    validNumbers.push(i);
  }

  const equations = [];

  if (operation === 'multiplication') {
    validNumbers.forEach((x) => {
      if (number % x === 0) {
        equations.push(`${x} × ${number / x} = ${number}`);
      }
    });
  } else if (operation === 'division') {
    validNumbers.forEach((x) => {
      equations.push(`${number * x} ÷ ${x} = ${number}`);
    });
  } else if (operation === 'addition') {
    validNumbers.forEach((x) => {
      equations.push(`${x} + ${number - x} = ${number}`);
    });
  } else if (operation === 'subtraction') {
    validNumbers.forEach((x) => {
      equations.push(`${x + number} - ${x} = ${number}`);
    });
  }

  if (equations.length === 0) {
    resultsDiv.innerHTML = '<p>No equations found.</p>';
  } else {
    equations.forEach((equation) => {
      const div = document.createElement('div');
      div.className = 'equation';
      div.textContent = equation;
      resultsDiv.appendChild(div);
    });
  }
});

