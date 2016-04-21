#NoEnv
#SingleInstance, Off
#InstallKeybdHook

SendMode Input

DllCall("AttachConsole", "int", -1, "int")

stdout := FileOpen("*", "w`n")

~*Shift::
	If (GetKeyState("Control", "P"))
		ScreenName = alphabet-symbols
	Else
		ScreenName = alphabet-uppercase
	ChangeScreen(ScreenName . "-quick")
	KeyWait, Shift, T0.5
	If ErrorLevel = 1
	{
		ChangeScreen(ScreenName)
		KeyWait, Shift
	}
	Return

ChangeScreen(ScreenName)
{
	global stdout
	stdout.WriteLine("{""name"": ""screen"", ""value"": """ . ScreenName . """}")
	stdout.__Handle() # = Flush
}
