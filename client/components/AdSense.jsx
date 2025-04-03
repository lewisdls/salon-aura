import Script from "next/script";

const AdSense = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4125020464165902`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    ></Script>
  );
};

export default AdSense
