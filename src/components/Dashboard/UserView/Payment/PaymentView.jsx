import React from 'react';
import Footer from '../../../Footer/Footer';

const PaymentView = () => {
  const redirectToCheckout = () => {
    // Redirige a la URL de Checkout de Stripe
    window.location.href = 'https://donate.stripe.com/test_8wM001dWt0Ms5TW7ss';
  };

  return (
    <div>
      <button onClick={redirectToCheckout}>Donar con Stripe</button>
      <Footer />
    </div>
  );
};

export default PaymentView;
