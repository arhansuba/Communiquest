import React from 'react';

interface TweedCheckoutProps {
    questId: string;
    amount: number;
}

const TweedCheckout = ({ questId, amount }: TweedCheckoutProps) => {
    const handleCheckout = () => {
        // Logic for handling checkout
        console.log(`Checking out quest: ${questId} for amount: $${amount}`);
    };

    return (
        <div>
            <h2>Checkout for Quest: {questId}</h2>
            <p>Amount: ${amount}</p>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default TweedCheckout;

      {/* For each quest, show a TweedCheckout component */}
      <TweedCheckout
        questId="special-quest-1"
        amount={10}
      />