const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

document.body.addEventListener('click', (event) => {
  if (event.target.id === 'btn1') {

    console.log('btn1 click');
  } else if (event.target.id === 'btn2') {

  } else if (event.target.id === 'btn3') {

  } else if (event.target.id === 'btn4') {

  }

});

let options = {
  // acceptAllDevices: true,
  filters: [
    // { services: ['heart_rate'] }, // 'heart_rate' 0x180D
    // { services: [0x1802, 0x1803] },
    // { services: ['c48e6067-5295-48d3-8d5c-0395f61792b1'] },
    { name: 'UART Service' },
    // { namePrefix: 'Prefix' }
  ],
  optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
}

function scanV1() {
  navigator.bluetooth.requestDevice(options)
    .then((device) => {
      // let power = BluetoothAdvertisingData.txPower;
      console.log('Device name: ' + device.name);
      console.log(device);
      // console.log('device power >>>>>> ', power);
      // Do something with the device.
      return device.gatt.connect();
    })
    .then(server => {
      console.log('got primary service ');
      return server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
    })
    .then(service => service.getCharacteristic.startNotifications())
    // .then(service => service.getCharacteristic(receiveCharUuid))
    .then(service.sendCharacteristic.writeValue('custom_data'))
    .then(characteristic => {
      characteristic.addEventListener(
        'characteristicvaluechanged', handleCharacteristicValueChanged
      );
    })
    .catch((error) => {
      console.log("Something went wrong. " + error);
    });
}

function handleCharacteristicValueChanged(event) {
  let value = event.target.value;
  console.log(parseValue(value));
}

const button = document.getElementById('scan');
button.addEventListener('click', (event) => {
  scanV1();
  // onButtonClick();

});
