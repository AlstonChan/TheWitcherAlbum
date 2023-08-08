# TheWitcherAlbum [![Netlify Status](https://api.netlify.com/api/v1/badges/50403584-b0e2-4a87-ae0e-e534c865b124/deploy-status)](https://app.netlify.com/sites/thewitcheralbum/deploys)

Built with custom element, custom dom and html template element.

## Getting Started

1. Clone this repository into your local machine

   ```bash
   git clone https://github.com/AlstonChan/TheWitcherAlbum.git
   ```

2. Install dependency for **Vite** to work:

   ```bash
   cd TheWitcherAlbum
   npm install
   ```

3. Enter `npm run dev` to spin up the development server, it runs at `localhost:3000`.

## Overview

**State management :** I have used both [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) to form a simple, yet effective enough for this small website.

**Web Component :** You may create your own tag by extending `HTMLElement` class and have a reusable component with it's own dom, namely the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).

## Developer notes

During local development with `npm run dev` using **vite**, when vite does hot reloading with the browser, another instance of the hot reloaded `handler.js` is being placed without replacing the old file, resulting in two instances of `handler.js` with another one hashed by **vite**. This causes bugs that will cause the left and right navigation button to be executed **TWICE**. I haven't figure out a way to solve this automatically, so, to solve this manually, restart the development server and open another tab of the site.
