import React, { Component } from 'react';
import './App.css';
import ControlPanel from './control-panel/ControlPanel';
import FileZone from './file-zone/FileZone';
import getMockText from './text.service';
import getSuggestion from './API/thesaurus';

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
            suggestions: ['Test1', 'Test 2'],
            text: ''
        }

        this.getText();
    }

    getText = () => {
        getMockText().then((result) => {
            this.setState({
                text: result,
            });
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
            this.state.handleTextStyle(name);

            this.setState((prevState) => {
                return {
                    [name]: !prevState[name],
                }
            });
        }
    }

    activateReplace = () => {
        this.state.replaceLast(this.state.suggestion);
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

    // https://api.datamuse.com/words?ml=word
    setLastWord = (lastWord) => {
        this.setState({
            lastWord: lastWord
        });

        getSuggestion(lastWord, 5)
            .then(words => this.setState({
                suggestions: words
            }))
            .catch(err => console.log(err));
    }


    setSuggestion = (suggestion) => {
        this.setState({
            suggestion
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
                        setSuggestion={ this.setSuggestion }
                        suggestions={ this.state.suggestions }
                    />
                    <FileZone
                        activeMode={ this.activeMode }
                        setCallback={ this.setCallback }
                        setCurrentModes={ this.setCurrentModes }
                        setEditableRef={this.setEditableRef }
                        setReplaceHandler={ this.setReplaceHandler }
                        setLastWord={ this.setLastWord }
                        text={this.state.text}
                    />
                </main>
            </div>
        );
    }
}


export default App;
