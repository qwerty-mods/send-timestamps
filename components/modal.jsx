const { React, getModuleByDisplayName, getModule } = require("powercord/webpack");
const { SelectInput } = require("powercord/components/settings");
const { clipboard } = require("electron");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");
const { settings: {FormItem}, FormTitle, Button } = require("powercord/components");

const DateInput = getModuleByDisplayName("DateInput", false);
const TimeInput = getModuleByDisplayName("TimeInput", false);

const Preview = require('./Preview.jsx')

module.exports = class DiyTimestamp extends React.PureComponent {
    constructor(props) {
        super(props);
        
        const moment = getModule(m => m.prototype?.toISOString, false);

        this.state = {
            date: moment(),
            time: moment(),
            format: {value: "f", label: "Short Date/Time"}
        }
    }

    render() {
        const formats = [{value: "t", label: "Short Time"}, {value: "T", label: "Long Time"}, {value: "d", label: "Short Date"}, {value: "D", label: "Long Date"}, {value: "f", label: "Short Date/Time"}, {value: "F", label: "Long Date/Time"}, {value: "R", label: "Relative Time"}]

        return (
            <Modal className="powercord-text">
                <Modal.Header>
                    <FormTitle tag="h4">Timestamp Creator</FormTitle>
                </Modal.Header>

                <Modal.Content>
                    <Preview code={this.get_code()}/>
                    <FormItem title=" "/> {/* separater */}
                    <FormItem title="Enter Date: ">
                        <DateInput
                            title="Date"
                            value={this.state.date}
                            onSelect={(a) => {
                                this.setState({date: a})
                            }}
                        ></DateInput>
                    </FormItem>
                    <FormItem title="Enter Time: ">
                        <TimeInput
                            title="Time"
                            value={this.state.time}
                            onChange={(a) => {
                                this.setState({time: a})
                            }}
                        ></TimeInput>
                    </FormItem>

                    <SelectInput
                        options={formats}
                        value={this.state.format}
                        onChange={(e) => {
                            this.setState({ format: e });
                        }}
                        rows={1}
                    >
                        Choose a Format
                    </SelectInput>
                </Modal.Content>

                <Modal.Footer>
                    <Button
                        color={Button.Colors.GREEN}
                        disabled={this.state.format.value == ""}
                        onClick={() => {                        
                                clipboard.writeText(this.get_code());

                                closeModal()
                            }
                        }   
                    >Copy</Button>
                    <Button
                      color={Button.Colors.TRANSPARENT}
                      look={Button.Looks.LINK}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    get_code() {
        let timestamp = new Date();
                        
        timestamp.setDate(this.state.date._d.getDate());
        timestamp.setMonth(this.state.date._d.getMonth());
        timestamp.setFullYear(this.state.date._d.getFullYear());

        timestamp.setHours(this.state.time._d.getHours());
        timestamp.setMinutes(this.state.time._d.getMinutes());
        timestamp.setSeconds(this.state.time._d.getSeconds());

        return `<t:${Math.floor(timestamp.getTime()/1000)}:${this.state.format.value}>`
    }
}