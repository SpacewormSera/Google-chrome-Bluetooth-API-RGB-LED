const connectButton = document.getElementById('scan')

const primaryServiceUuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
const receiveCharUuid = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
const sendCharUuid = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'

let device = null

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)

  return [r, g, b]
};

let options = {
  filters: [
    { name: 'UART Service' }, // name should match the esp32 device BLE name
  ],
  optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
}

connectButton.onclick = async () => {
  device = await navigator.bluetooth.requestDevice(options)
  const element = document.getElementById('output')
  element.innerHTML = '---> connected to: ' + device.name
}

async function sendDataToBle(data) {
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(primaryServiceUuid);

  const buffer = Uint8Array.from(data)
  const sendCharacteristic = await service.getCharacteristic(sendCharUuid);
  sendCharacteristic.writeValue(buffer);
}

async function sendString() {
  const inputElement = document.getElementById('input')
  const inputData = inputElement.value
  const element = document.getElementById('output')

  if (!device) {
    element.innerText = 'Connect to the BLE device before sending any data'
    return
  }

  element.innerText += `${new Date().toLocaleString(undefined, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit'
  })}---> ${inputData} \n`

  sendDataToBle(inputData)

  inputElement.value = ''
}

async function sendColorData() {
  const colorPicker = document.getElementById('colorPicker')
  const colorData = hexToRgb(colorPicker.value)
  sendDataToBle(colorData)
}