const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const connectButton = document.getElementById('scan');

const primaryServiceUuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const receiveCharUuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const sendCharUuid = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
let device, sendCharacteristic, receiveCharacteristic;

const hexToRgb = (hex) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return [r, g, b];
};

/*===========================  ASCII  ========================================*/
const data1 = new Uint8Array([69, 76, 66, 82, 85, 83]); // elbrus
const data2 = new Uint8Array([83, 69, 82, 65]); // sera


document.body.addEventListener('click', (event) => {
  if (event.target.id === 'btn1') {

    console.log('btn1 click');
  } else if (event.target.id === 'btn2') {

  } else if (event.target.id === 'btn3') {

  } else if (event.target.id === 'btn4') {

  }

});

let options = {
  filters: [
    { name: 'UART Service' },
  ],
  optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
}

connectButton.onclick = async () => {
  device = await navigator.bluetooth.requestDevice(options);
  console.log('connected');
}

btn1.onclick = async () => {
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(primaryServiceUuid);
  console.log(service);
  // receiveCharacteristic = await service.getCharacteristic(receiveCharUuid);
  sendCharacteristic = await service.getCharacteristic(sendCharUuid);
  sendCharacteristic.writeValue(data1);
}

btn2.onclick = async () => {
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(primaryServiceUuid);
  console.log(service);
  // receiveCharacteristic = await service.getCharacteristic(receiveCharUuid);
  sendCharacteristic = await service.getCharacteristic(sendCharUuid);
  sendCharacteristic.writeValue(data2);
}