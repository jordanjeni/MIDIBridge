/*!
 *  copyright 2012 abudaan http://abumarkub.net
 *  code licensed under MIT 
 *  http://abumarkub.net/midibridge/license
 * 
 * 
 *  example of how you can connect MIDI inputs and outputs with MIDIAccess
 * 
 *  dependecies:
 *  - MIDIBridge.js
 *  - MIDIDeviceSelector.js
 *  
 */

window.addEventListener('load', function() {

    var midiAccess = null,
    input = null,
    output = null,
    selectInput = document.getElementById("inputs"),
    selectOutput = document.getElementById("outputs"),
    midiMessages = document.getElementById("messages");
    
    
    function connectDevices(){
        if(input){
            input.addEventListener("midimessage",function(e){
                if(output){
                    output.sendMIDIMessage(e);
                }
                midiMessages.innerHTML += e.toString() + "<br/>";
                midiMessages.scrollTop = midiMessages.scrollHeight;
            });
        }
    }

    midiBridge.init(function(_midiAccess){
        
        var inputs,outputs;
        
        midiAccess = _midiAccess;
        inputs = midiAccess.enumerateInputs();
        outputs = midiAccess.enumerateOutputs();
 
        //create dropdown menu for MIDI inputs
        midiBridge.createMIDIDeviceSelector(selectInput,inputs,"input",function(deviceId){
            if(input){
                input.close();
            }
            input = midiAccess.getInput(inputs[deviceId]);
            connectDevices();        
        });

        //create dropdown menu for MIDI outputs
        midiBridge.createMIDIDeviceSelector(selectOutput,outputs,"ouput",function(deviceId){
            if(output){
                output.close();
            }
            output = midiAccess.getOutput(outputs[deviceId]);
            connectDevices();        
        });
           
    });

}, false);
