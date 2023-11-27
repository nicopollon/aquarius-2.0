import socketio
import time

with socketio.SimpleClient() as sio:

  sio.connect('http://localhost:3001')
  print('my sid is', sio.sid)
  sio.emit('chat message', "Ciao da python")
  time.sleep(1)  # Adjust the delay as needed
  sio.disconnect()