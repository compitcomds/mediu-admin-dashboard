import axios from "axios";

const SHIPROCKET_API_URL = process.env.VITE_SHIPROCKET_API_URL;
const PRODUCTION_API = process.env.VITE_PRODUCTION_API;
const PICKUP_PINCODE = process.env.VITE_PICKUP_PINCODE;
const COD_APPLICABLE = process.env.VITE_COD_APPLICABLE;
const AVG_WEIGHT = process.env.VITE_AVG_WEIGHT;

export default defineEventHandler(async (event) => {
  try {
    const { data: accessToken } = await axios.get(
      `${PRODUCTION_API}/api/shiprocket/access-token`
    );

    const body = await readBody(event);

    const { data } = await axios.get(
      `${SHIPROCKET_API_URL}/courier/serviceability?pickup_postcode=${PICKUP_PINCODE}&delivery_postcode=${
        body.pincode
      }&cod=${COD_APPLICABLE}&weight=${body.weight || AVG_WEIGHT}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.token}`,
        },
      }
    );

    if (data.data.available_courier_companies.length > 0) {
      const etd = getETDDetails(data.data.available_courier_companies);
      return { ...etd, message: "Successfully fetched the details." };
    }
  } catch (error) {}

  return {
    message: "The product could not be delivered on the provided pincode.",
  };
});

type CourierInfo = {
  etd: string;
  etd_hours: number;
  estimated_delivery_days: string;
};
function getETDDetails(courierArray: CourierInfo[]): {
  minEtd: string;
  minEtdHours: number;
  minEstimatedDeliveryDays: string;
  maxEtd: string;
  maxEtdHours: number;
  maxEstimatedDeliveryDays: string;
} {
  let minEtdHours = Infinity;
  let maxEtdHours = -Infinity;

  let minEtd = "";
  let maxEtd = "";
  let minEstimatedDeliveryDays = "";
  let maxEstimatedDeliveryDays = "";

  for (const courier of courierArray) {
    const etdHours = courier.etd_hours;

    if (etdHours < minEtdHours) {
      minEtdHours = etdHours;
      minEtd = courier.etd;
      minEstimatedDeliveryDays = courier.estimated_delivery_days;
    }

    if (etdHours > maxEtdHours) {
      maxEtdHours = etdHours;
      maxEtd = courier.etd;
      maxEstimatedDeliveryDays = courier.estimated_delivery_days;
    }
  }

  return {
    minEtd,
    minEtdHours,
    minEstimatedDeliveryDays,
    maxEtd,
    maxEtdHours,
    maxEstimatedDeliveryDays,
  };
}
