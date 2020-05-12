import React, { Component, createRef } from 'react';
import './FileZone.css';


const modes = {
    'U': 'underline',
    'I': 'italic',
    'B': 'bold',
}


class FileZone extends Component {
    constructor (props) {
        super(props);

        this.editableRef = createRef();

        this.state = {
            currentWord: '',
            currentWordLocation: {
                index: undefined,
                node: undefined,
            }
        };

        /* pass callback to app*/
        this.props.setCallback('handleTextStyle', this.handleTextStyle);
        this.props.setEditableRef(this.editableRef);
        this.props.setReplaceHandler(this.replaceLast);
    }

    handleTextStyle = (name) => {
        console.log('Execute', name);
        document.execCommand(name);
    }

    getCaret = () => {
        const select = document.getSelection();
        const position = select.getRangeAt(0);


        return [ position.startOffset, select.focusNode.parentNode ];
    }

    getCurrentModes = () => {
        const [ position, node ] = this.getCaret();

        const modesList = [];
        console.log(node, this.editableRef.current);
        if (node.nodeName !== 'DIV') {
            modesList.push(modes[node.nodeName]);

            let parenNode = node.parentNode;
            console.log('Parent node', parenNode, modesList);
            while (parenNode.nodeName !== 'DIV') {
                console.log('Before', parenNode.nodeName);
                modesList.push(modes[parenNode.nodeName]);

                parenNode = parenNode.parentNode;
                console.log('Parentnode afte', parenNode);
            }
        }

        console.log(modesList);


        this.props.setCurrentModes(modesList);
    }

    replaceLast = (suggestion) => {
        let currentWordNode = this.state.currentWordLocation.node;
        let currentWord = this.state.currentWord;
        let index = this.state.currentWordLocation.index;
        if (currentWordNode && currentWord) {
            let nodeText = currentWordNode.innerText;

            nodeText = nodeText.substring(0, index - currentWord.length)
                + nodeText.substring(index - currentWord.length).replace(currentWord, suggestion);

            currentWordNode.innerText = nodeText;
        }
    }

    currentWord = (event) => {
        const [ position, node ] = this.getCaret();
        const key = event.key;

        console.log(position);
        /* if not special key proceed */
        if (key.length < 2) {
            if (key !== ' ') {
                this.setState((prevState) => {
                    return {
                        currentWord: prevState.currentWord + key.toString(),
                        currentWordLocation: {
                            index: position,
                            node: node,
                        }
                    }
                })
            } else {
                this.setState({
                    currentWord: '',
                    currentWordLocation: {
                        index: undefined,
                        node: undefined,
                    }
                });
            }
        }

    }

    processTyping = (event) => {
        this.currentWord(event);
        this.getCurrentModes();
    }

    render () {
        return (
            <div id="file-zone">
                <div
                    id="file"
                    contentEditable={ true }
                    onClick={ () => console.log('clicked') }
                    onKeyDown={ this.processTyping }
                    ref={ this.editableRef }
                >
                </div>

            </div>
        );
    }
}


export default FileZone;
