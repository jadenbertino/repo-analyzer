#!/bin/bash

source ./env/.env.dev
export DOPPLER_TOKEN

doppler run -- next dev