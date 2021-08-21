const { React, getModuleByDisplayName, getModule } = require('powercord/webpack');
const Tooltip = getModuleByDisplayName('Tooltip', false);
const { Button } = require("powercord/components");

const buttonClasses = getModule([ "button" ], false);
const buttonWrapperClasses = getModule([ "buttonWrapper", "pulseButton" ], false);
const buttonTextAreaClasses = getModule([ "button", "textArea" ], false);

module.exports = class Btn extends React.Component {
    render() {
        return (
			<Tooltip
                color="black"
                postion="top"
                text="DIY Timestamp"
            >
                {({ onMouseLeave, onMouseEnter }) => (
                    <Button
                        className="diy-timestamp-btn"
                        look={Button.Looks.BLANK}
                        size={Button.Sizes.ICON}
                        onClick={() => this.props.onClick()}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <div
                            className={`${buttonClasses.contents} ${buttonWrapperClasses.button} ${buttonTextAreaClasses.button}`}
                        >
                            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`${buttonWrapperClasses.icon}`}>
                                <path fill="currentColor" d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                            </svg>
                        </div>
                    </Button>
                )}
            </Tooltip>
        )
    }
}