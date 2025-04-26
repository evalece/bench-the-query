#!/bin/bash
export PYTHONPATH=$(pwd)
uvicorn app.main:app --reload --env-file .env
