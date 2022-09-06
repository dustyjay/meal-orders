import React from "react";

const SingleOrder = ({ brandName, brandLogo, amount, meals }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumSignificantDigits: 1,
    }).format(amount);
  };

  return (
    <div className="order__wrapper">
      <div className="order__brand">
        <img className="order__brand--logo" src={brandLogo} alt={brandName} />
        <h3 className="order__brand--name">{brandName}</h3>
      </div>
      <div>
        {meals.map((meal, index) => (
          <div className="order__meal" key={index}>
            <div className="order__meal--details">
              <h4>
                <span className="order__meal--qty">{meal.quantity} x</span>
                {meal.name}
              </h4>
              <ul className="order__addon--list">
                {meal.addons.map((addon, key) => (
                  <li className="order__addon" key={key}>
                    <span className="order__addon--qty">
                      {addon.quantity} x
                    </span>
                    {addon.name}
                  </li>
                ))}
              </ul>
              {meal.order_note && (
                <p className="order__meal--notes">
                  <strong>NOTE:</strong> {meal.order_note}
                </p>
              )}
            </div>
            <h3 className="order__meal--amount">
              {formatCurrency(meal.amount)}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleOrder;

