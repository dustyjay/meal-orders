import React from "react";
import SingleOrder from "./SingleOrder";

const UserOrders = ({ userOrders }) => {
  const concatNumberOfItems = ({ numberOfBrands, numberOfMeals }) => {
    return `${getPluralForm(numberOfBrands, "brand")}, ${getPluralForm(
      numberOfMeals,
      "meal"
    )} `;
  };

  const getPluralForm = (qty, text) => {
    return `${qty} ${text}${qty > 1 ? "s" : ""}`;
  };

  return (
    <main>
      {Object.entries(userOrders).map(
        ([order_code, { numberOfBrands, numberOfMeals, orders }]) => (
          <div className="order__single" key={order_code}>
            <div className="order__header">
              <h4 className="order__header--desc">
                {concatNumberOfItems({ numberOfBrands, numberOfMeals })}
              </h4>
              <h5 className="order__code">ORDER CODE: {order_code}</h5>
            </div>
            {orders.map((order, key) => (
              <SingleOrder {...order} key={key} />
            ))}
          </div>
        )
      )}
    </main>
  );
};

export default UserOrders;

