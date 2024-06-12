const midtransClient = require("midtrans-client");

let coreApi = new midtransClient.CoreApi({
  isProduction: false, // Ensure this is false for sandbox and true for production
  serverKey: "SB-Mid-server-y9odeKOWji7moCXvloBnXztM",
  clientKey: "SB-Mid-client-60yQeaxJopGU_zhH",
});

let snap = new midtransClient.Snap({
  isProduction: false, // Ensure this is false for sandbox and true for production
  serverKey: "SB-Mid-server-y9odeKOWji7moCXvloBnXztM",
  clientKey: "SB-Mid-client-60yQeaxJopGU_zhH",
});

module.exports = { coreApi, snap };
