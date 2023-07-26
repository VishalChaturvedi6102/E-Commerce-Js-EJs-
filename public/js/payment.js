const btn = document.querySelector('#checkout-btn')

btn.addEventListener('click', async (e) => {

    const currUser = btn.getAttribute('currentUser');
    const amount = btn.getAttribute('amount');
    const { data: { key } } = await axios.get('http://localhost:8000/getkey');
    const { data: { order } } = await axios.post('http://localhost:8000/checkout', { amount });

    var options = {
        key, // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": currUser.username,
        "description": "Test Transaction",
        "image": "https://static.wixstatic.com/media/5f869d_fd60c41836394ae3940a6abffcdeb506~mv2.jpg/v1/fill/w_300,h_300,al_c,q_80,enc_auto/5f869d_fd60c41836394ae3940a6abffcdeb506~mv2.jpg",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:8000/paymentverification",
        "prefill": {
            "name": "",
            "email": "",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var razor = new window.Razorpay(options);
    razor.open();

})