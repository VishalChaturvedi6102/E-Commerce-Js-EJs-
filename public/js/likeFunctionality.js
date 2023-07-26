// console.log('working fine');


async function likeButton(productId, btn) {
    try {
        const response = await axios({
            method: 'post',
            url: `/product/${productId}/like`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (btn.classList.contains('fas')) {
            btn.classList.remove('fas');
            btn.classList.add('far');
        } else {
            btn.classList.add('fas');
            btn.classList.remove('far');
        }

    } catch (e) {
        window.location.replace('/login');
    }
}



window.document.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.getAttribute('type') === 'product-like-btn') {
        const productId = e.target.getAttribute('product-id');
        likeButton(productId, btn);
    }
})