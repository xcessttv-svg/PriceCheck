# PriceCheck

React Native + Expo prototype that compares prices, quality, quantity, and official offers across leading supermarket chains. The initial dataset focuses on Spain (Lidl, Aldi, Mercadona, Alcampo, El Corte Inglés, Carrefour, Día, Costco, Dani, Esclat, Supermercados MAS) with scaffolding to add more countries.

## Features
- Country switcher (Spain to start; extendable to others)
- Region focus via postal code matching or manual region selection
- Daily auto-update hook (24h timer) to refresh data pulls
- Quality–price–quantity ranking window for the best-value chains
- Offers and coupon highlights per chain/region

## Getting started
1. Install dependencies: `npm install`
2. Start the Expo app: `npm start`
   - Press **i** for iOS simulator, **a** for Android emulator, or choose **w** for web.

## Extending to more countries
- Append new entries to the `SUPERMARKETS` dataset in `App.js` with `country`, `regions`, `offers`, and `coupons`.
- Plug your data-fetching job into the `useEffect` block that sets `lastUpdated` to connect real APIs and cron-like background refresh.

## Notes
- Region detection uses Spanish postal-code prefixes; manual region buttons keep the experience usable when geodata is not available.
- Styling is contained within `App.js` for simplicity; migrate to a design system as the project grows.
