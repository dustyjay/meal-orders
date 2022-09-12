import React from "react";
import SingleOrder from "./SingleOrder";
import { ReactComponent as CopyIcon } from "./copy.svg";

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

  const copyOrderCode = (code) => {
    // Get the text field
    const input = document.getElementById("orderCodeInput");
    input.value = code;

    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(input.value);

    alert("Copied order code: " + input.value);
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
              <button
                className="order__code"
                onClick={() => copyOrderCode(order_code)}
              >
                ORDER CODE: {order_code}
                <CopyIcon />
              </button>
            </div>
            {orders.map((order, key) => (
              <SingleOrder {...order} key={key} />
            ))}
          </div>
        )
      )}
      <input
        type="text"
        readOnly
        className="order__code--input"
        id="orderCodeInput"
      ></input>
    </main>
  );
};

export default UserOrders;
