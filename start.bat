@REM http://ss64.com/nt/syntax-args.html
CD /D %~dp0
CD server
START /HIGH node web.js
