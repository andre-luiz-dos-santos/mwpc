#NoEnv
#SingleInstance, Off
#InstallKeybdHook

SendMode Input

DllCall("AttachConsole", "int", -1, "int")

stdout := FileOpen("*", "w`n")

~*Control::
	If (GetKeyState("Shift", "P"))
		ScreenName = alphabet-arrow
	Else
		ScreenName = alphabet-number
	ChangeScreen(ScreenName . "-quick")
	KeyWait, Control, T0.5
	If ErrorLevel = 1
	{
		ChangeScreen(ScreenName)
		KeyWait, Control
	}
	Return

ChangeScreen(ScreenName)
{
	global stdout
	stdout.WriteLine("{""name"": ""screen"", ""value"": """ . ScreenName . """}")
	stdout.__Handle() # = Flush
}
