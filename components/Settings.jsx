const { React } = require('powercord/webpack')
const { SwitchItem } = require('powercord/components/settings')

module.exports = ({ getSetting, toggleSetting }) => <>
    <SwitchItem
        value={getSetting('remove-button', false)}
        onChange={() => {
            toggleSetting('remove-button', false)
        }}
        note="When enabled, the button in the Message Box will be removed."
    >Remove Timestamp Button</SwitchItem>
</>
