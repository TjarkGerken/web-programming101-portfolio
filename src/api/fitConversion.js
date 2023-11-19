// TODO: https://developer.garmin.com/fit/example-projects/javascript/
import { Decoder, Stream, Profile, Utils } from "@garmin-fit/sdk";
const fs = require("fs");

const bytes = [
  0x0e, 0x10, 0xd9, 0x07, 0x00, 0x00, 0x00, 0x00, 0x2e, 0x46, 0x49, 0x54, 0x91,
  0x33, 0x00, 0x00,
];

const buf = fs.readFileSync("@/assets/12793438381_ACTIVITY.fit");

const streamfromFileSync = Stream.fromBuffer(buf);
console.log("isFIT (static method): " + Decoder.isFIT(streamfromFileSync));

const decoder = new Decoder(streamfromFileSync);
console.log("isFIT (instance method): " + decoder.isFIT());
console.log("checkIntegrity: " + decoder.checkIntegrity());

const { messages, errors } = decoder.read();

console.log(errors);
console.log(messages);
