@echo off
cd /d "%~dp0"
if not exist backend\.env (
    echo DB_USERNAME=admin> backend\.env
    echo DB_PASSWORD=secret>> backend\.env
    echo DB_HOST=oracle>> backend\.env
    echo DB_PORT=1521>> backend\.env
    echo DB_SERVICE_NAME=FREEPDB1>> backend\.env
    echo PORT=3001>> backend\.env
)
if not exist frontend\.env.local (
    echo NEXT_PUBLIC_API_URL=http://localhost:3001> frontend\.env.local
)
docker compose up --build
pause
