import React, { Component } from 'react';
import './App.css';
import ControlPanel from './control-panel/ControlPanel';
import FileZone from './file-zone/FileZone';
import getMockText from './text.service';


const modes = [
    'underline',
    'italic',
    'bold',
];


class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            bold: false,
            italic: false,
            underline: false,
        }
    }

    getText () {
        getMockText().then(function (result) {
            console.log(result);
        });
    }

    activeMode = (name, state) => {
        this.state.editableRef.current.focus();

        /* if state is not available turn handle off*/
        if (state) {
            this.setState({
                [name]: state,
            });
        } else {
            console.log('Activate', name);
            this.state.handleTextStyle(name);

            this.setState((prevState) => {
                return {
                    [name]: !prevState[name],
                }
            });
        }
    }

    activateReplace = () => {
        this.state.replaceLast('WORD');
    }

    setCallback = (name, callback) => {
        this.setState({
            [name]: callback,
        })
    }

    setCurrentModes = (currentModes) => {
        const modesState = {}

        for (const mode of modes) {
            modesState[mode] = currentModes.indexOf(mode) !== -1;
        }
        console.log(currentModes, modesState);
        this.setState(modesState);
    }

    setEditableRef = (ref) => {
        this.setState({
            editableRef: ref
        });
    }

    setReplaceHandler = (replaceLast) => {
        this.setState({
            replaceLast: replaceLast
        });
    }

    render () {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        activeMode={ this.activeMode }
                        bold={ this.state.bold }
                        italic={ this.state.italic }
                        underline={ this.state.underline }
                        activateReplace={ this.activateReplace }
                    />
                    <FileZone
                        activeMode={ this.activeMode }
                        setCallback={ this.setCallback }
                        setCurrentModes={ this.setCurrentModes }
                        setEditableRef={this.setEditableRef }
                        setReplaceHandler={ this.setReplaceHandler }
                    />
                </main>
            </div>
        );
    }
}


export default App;
