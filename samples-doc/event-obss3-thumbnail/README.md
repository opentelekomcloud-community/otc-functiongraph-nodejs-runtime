# Event-obss3-thumbnail

This is a sample that processes an image uploaded to OBS, resizes it to fit within a maximum dimension, and uploads the resized image back to another OBS using FunctionGraph with OBS trigger event.

The start of the process is initiated by an `S3TriggerEvent` in FunctionGraph.

## Overview

Following diagram shows components used in this example:

![image](thumbnail.drawio.svg)