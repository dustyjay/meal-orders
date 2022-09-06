import "./reset.scss";
import "./App.scss";
import { useEffect, useState } from "react";
import { API_URL, USER_ID, USER_TOKEN } from "./enums";
import UserOrders from "./UserOrders";

function App() {
  useEffect(() => {
    fetchOrders();
  }, []);

  const [pageLoading, setPageLoading] = useState(false);
  const [hasPageError, setPageError] = useState(false);
  const [userOrders, setUserOrders] = useState({});

  const fetchOrders = async () => {
    setPageError(false);
    setPageLoading(true);
    try {
      const orders = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: USER_TOKEN,
        },
        body: JSON.stringify({ user_id: USER_ID }),
      });
      const result = await orders.json();
      formatOrderData(result?.data);
    } catch {
      setPageError(true);
    } finally {
      setPageLoading(false);
    }
  };

  const formatOrderData = (data) => {
    if (!data) {
      setPageError(true);
      return;
    }
    const allBrandOrders = data.reduce(
      (acc, { calculated_order, order_code }) => {
        acc[order_code] = formatAllMeals(calculated_order.meals);
        return acc;
      },
      {}
    );
    setUserOrders(allBrandOrders);
  };

  const formatAllMeals = (allMeals) => {
    let numberOfBrands = 0;
    let numberOfMeals = 0;

    const orders = allMeals.map(({ amount, brand, meals: brandMeals }) => {
      const { id: brandId, logo: brandLogo, name: brandName } = brand;
      const meals = formatBrandMeals(brandMeals);
      numberOfBrands += 1;
      numberOfMeals += meals.length;
      return {
        amount,
        brandId,
        brandLogo,
        brandName,
        meals,
      };
    });

    return { numberOfBrands, numberOfMeals, orders };
  };

  const formatBrandMeals = (brandMeals) => {
    const formattedMeals = brandMeals.map(
      ({ id, order_note, amount, position, name, quantity, addons }) => ({
        id,
        order_note,
        amount,
        position,
        name,
        quantity,
        addons: formatMealAddons(addons),
      })
    );

    return formattedMeals.sort((a, b) => a.position - b.position);
  };

  const formatMealAddons = (mealAddons) => {
    if (!mealAddons) return [];
    const addons = mealAddons.map(
      ({ meal_data, quantity, amount, position }) => ({
        name: meal_data.name,
        quantity,
        amount,
        position,
      })
    );

    return addons.sort((a, b) => a.position - b.position);
  };

  const pageText = () => {
    return pageLoading
      ? "Loading..."
      : "Oopsy😓....There was an error loading your data";
  };

  if (!pageLoading && !hasPageError)
    return <UserOrders userOrders={userOrders} />;
  return (
    <main>
      <div className="page-text__display">{pageText()}</div>
    </main>
  );
}

export default App;

