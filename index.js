const { Plugin } = require('powercord/entities');
const { getModule, React } = require("powercord/webpack");
const { findInReactTree } = require("powercord/util");
const { inject, uninject } = require('powercord/injector');
const { open } = require("powercord/modal");

const ChannelTextAreaContainer = getModule(
    (m) => m.type && m.type.render && m.type.render.displayName === "ChannelTextAreaContainer", false
);

const DiyTimestamp = require('./components/modal')
const Button = require('./components/Button');

module.exports = class SendTimestamps extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'timestamp',
            usage: '',
            description: 'Make your own Discord Timestamp',
            executor: this.timestamp.bind(this),
        });

        inject(
            "diy-timestamp-button",
            ChannelTextAreaContainer.type,
            "render",
            (args, res) => {
                // Add to the buttons.
                const props = findInReactTree(
                    res,
                    (r) =>
                    r && r.className && r.className.indexOf("buttons-") == 0
                );
                props.children.unshift(
                    React.createElement(Button, {
                        onClick: () => this.timestamp()
                    })
                );

                return res;
            }
        );

        ChannelTextAreaContainer.type.render.displayName = "ChannelTextAreaContainer";
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('timestamp')
        uninject('diy-timestamp-button')
    }

    timestamp() {
        open(DiyTimestamp)
    }
}