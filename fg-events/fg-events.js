"use strict";

module.exports = {
  ...require("@opentelekomcloud-community/fg-apig-event"),
  ...require("@opentelekomcloud-community/fg-cts-event"),
  ...require("@opentelekomcloud-community/fg-dds-event"),
  ...require("@opentelekomcloud-community/fg-dms4kafka-event"),
  ...require("@opentelekomcloud-community/fg-dms4rocketmq-event"),
  ...require("@opentelekomcloud-community/fg-kafkaopensource-event"),
  ...require("@opentelekomcloud-community/fg-lts-event"),
  ...require("@opentelekomcloud-community/fg-obss3-event"),
  ...require("@opentelekomcloud-community/fg-smn-event"),
  ...require("@opentelekomcloud-community/fg-timer-event")
};