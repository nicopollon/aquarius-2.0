import socketio
import time
import sys

def run_script(event, floor_number):
    with socketio.SimpleClient() as sio:
        sio.connect('http://localhost:3001')

        if event == 'floor-number':  # Use '==' for comparison
            sio.emit('floor-number', floor_number)
        
        if event == 'floor-selected':
            sio.emit('floor-selected', floor_number)
          
        time.sleep(1)  # Adjust the delay as needed
        sio.disconnect()

if __name__ == "__main__":
    if len(sys.argv) != 3:  # Check for two command line arguments
        print("Usage: python3 test.py <floor_event> <floor_number>")
        sys.exit(1)

    event = sys.argv[1]
    floor_number = sys.argv[2]
    run_script(event, floor_number)
