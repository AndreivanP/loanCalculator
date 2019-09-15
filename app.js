// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate Results
function calculateResults(e){

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const montlhyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute montlhy payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const montlhy = (principal*x*calculatedInterest)/(x-1);
    console.log("montlhy "+montlhy);
    if(isFinite(montlhy)){
        montlhyPayment.value = montlhy.toFixed(2);
        totalPayment.value = (montlhy * calculatedPayments).toFixed(2);
        totalInterest.value = ((montlhy * calculatedPayments)-principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }

    e.preventDefault();
}

// Show Error
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to errorDiv
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000)
}

function clearError(){
    document.querySelector('.alert').remove();
}
