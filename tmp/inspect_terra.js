const fs = require('fs');

async function run() {
  const res = await fetch("https://terra-by-kabir.lovable.app/assets/routes-dEeiBzJY.js");
  const data = await res.text();
  
  const idx = data.indexOf("A T.E.R.R.A. station watching over a zoned water body");
  console.log("Context:", data.slice(Math.max(0, idx - 200), idx + 200));

  const assetMatches = data.match(/\/assets\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|svg|gif)/gi) || [];
  console.log("Image Assets:", [...new Set(assetMatches)]);

  const urls = data.match(/https?:\/\/[^\s"'`<>]+/gi) || [];
  const imgUrls = [...new Set(urls)].filter(u => 
    u.includes('.jpg') || u.includes('.png') || u.includes('.webp') || u.includes('unsplash') || u.includes('wikimedia')
  );
  console.log("Image URLs:", imgUrls);
}

run();
