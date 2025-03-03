document.getElementById("donationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let paymentMethod = document.getElementById("paymentMethod").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !amount || !paymentMethod) {
        alert("Please fill in all required fields.");
        return;
    }

    // Update donation counter
    let totalAmountElement = document.getElementById("totalAmount");
    let currentTotal = parseFloat(totalAmountElement.innerText.replace("$", ""));
    let newTotal = currentTotal + amount;
    totalAmountElement.innerText = $${newTotal.toLocaleString()};

    // Redirect based on payment method
    if (paymentMethod === "paypal") {
        window.location.href = "https://www.paypal.com/donate";
    } else if (paymentMethod === "stripe") {
        window.location.href = "https://www.stripe.com";
    } else if (paymentMethod === "gpay") {
        window.location.href = "https://pay.google.com";
    }

    // Reset form
    document.getElementById("donationForm").reset();

    // Thank You Message
    alert("Thank you, ${name}, for your donation of $${amount} via ${paymentMethod.toUpperCase()}! 💜");
});