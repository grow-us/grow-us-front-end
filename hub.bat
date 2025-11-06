@echo off
setlocal enabledelayedexpansion

REM ==============================
REM  Configurações
REM ==============================
set BRANCH_PRINCIPAL=main
set MENSAGEM_MERGE=Mesclando alterações da main automaticamente

echo ===========================================
echo   🚀 Aplicando commits da %BRANCH_PRINCIPAL% em todas as branches
echo ===========================================

REM Verifica se há alterações pendentes
git status --porcelain >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  O repositório Git não foi encontrado nesta pasta.
    pause
    exit /b
)

REM Comita mudanças na branch principal
echo.
echo 🔄 Mudando para a branch principal: %BRANCH_PRINCIPAL%
git checkout %BRANCH_PRINCIPAL%

echo 💾 Adicionando e comitando alterações...
git add .
git commit -m "Atualização automática" || echo Nenhuma alteração para commitar.

echo.
echo 🔄 Atualizando lista de branches...
for /f "tokens=*" %%b in ('git branch --format="%%(refname:short)"') do (
    set BRANCH=%%b
    if not "!BRANCH!"=="%BRANCH_PRINCIPAL%" (
        echo -------------------------------------------
        echo 🔁 Fazendo merge em: !BRANCH!
        git checkout !BRANCH!
        git merge %BRANCH_PRINCIPAL% -m "%MENSAGEM_MERGE%"
    )
)

echo.
echo ✅ Todas as branches foram atualizadas com sucesso!
echo ===========================================

REM Volta para a branch principal
git checkout %BRANCH_PRINCIPAL%

pause
