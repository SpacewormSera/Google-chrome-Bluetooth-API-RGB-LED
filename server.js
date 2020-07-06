const Bluetooth = require('node-web-bluetooth');

async function connect() {
  const device = await Bluetooth.requestDevice({
    filters: [
      { services: ['heart_rate'] }
    ]
  });
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService('heart_rate');
  const charr = await service.getCharacteristic('heart_rate_measurement');
  await charr.startNotifications();
  char.on('characteristicvaluechanged', (data) => {
    // parse heart-rate data here
  });
  await charr.stopNotifications();
  await server.disconnect();
}
connect();