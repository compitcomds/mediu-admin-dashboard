import { defineEventHandler, readBody } from 'h3';
import fetch from 'node-fetch';

const shopDomain = 'dev-mediu.myshopify.com';
const accessToken = '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';

export default defineEventHandler(async (event) => {
  const apiUrl = `https://${shopDomain}/admin/api/2024-07/products.json`;

  if (event.req.method === 'GET') {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Shopify products: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error};
    }
  } else if (event.req.method === 'POST') {
    try {
      const body = await readBody(event);
      const newProduct = {
        product: {
          title: body.title,
          variants: [
            {
              price: body.price,
              inventory_quantity: body.quantity,
            },
          ],
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error};
    }
  }
});
