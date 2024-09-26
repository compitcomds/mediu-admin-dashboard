import { defineEventHandler } from 'h3';
import fetch from 'node-fetch';

const shopDomain = 'dev-mediu.myshopify.com';
const accessToken = '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';

export default defineEventHandler(async (event) => {
  // Use optional chaining and type assertion to get customerId
  const customerId = event.context.params?.customerId as string;

  if (!customerId) {
    // If customerId is not available, return an error
    return { error: 'Customer ID is required.' };
  }

  const apiUrl = `https://${shopDomain}/admin/api/2024-07/orders.json?customer_id=${customerId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders for customer ${customerId}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
});
