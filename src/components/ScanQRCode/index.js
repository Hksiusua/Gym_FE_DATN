import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScannerCamera = () => {
  const [qrData, setQrData] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrData(data.text); 
    }
  };

  const handleError = (err) => {
    console.error("Error scanning QR Code:", err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {qrData ? (
        <p>Decoded Data: {qrData}</p>
      ) : (
        <p>Scanning QR Code... Please align QR code with the camera.</p>
      )}
      <QrScanner
        delay={300} //
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
};

export default QRScannerCamera;
