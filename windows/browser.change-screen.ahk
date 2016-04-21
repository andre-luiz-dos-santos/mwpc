#NoEnv
#SingleInstance, Off
#InstallKeybdHook

DllCall("AttachConsole", "int", -1, "int")

stdout := FileOpen("*", "w`n")
keyOrder = __
prevState = 00

~*Shift::HandleKeyEvent("S")
~*Shift UP::HandleReleaseEvent()
~*Control::HandleKeyEvent("C")
~*Control UP::HandleReleaseEvent()

GetCurrentState()
{
	Return GetKeyState("Control", "P") . GetKeyState("Shift", "P")
}

HandleKeyEvent(key)
{
	; Keep track of the order in which the last two keys were pressed.
	global keyOrder
	keyOrder := SubStr(keyOrder, 0) . key
	; Check whether a key was pressed down or released.
	global prevState
	state := GetCurrentState()
	if ( state != prevState )
	{
		StateChanged(state)
		prevState := state
	}
}

HandleReleaseEvent()
{
	if (GetCurrentState() = 0)
	{
		CancelNonQuickTimer()
		global prevState
		prevState = 00
	}
}

StateChanged(state)
{
	global keyOrder
	if state = 01
		screen = alphabet-uppercase
	else if state = 10
		screen = alphabet-symbols
	else if (state = "11" and keyOrder = "CS")
		screen = alphabet-number
	else if (state = "11" and keyOrder = "SC")
		screen = alphabet-arrow
	ChangeScreen(screen . "-quick")
	global lastScreen
	lastScreen := screen
	SetTimer, ChangeToNonQuick, -500
}

CancelNonQuickTimer()
{
	SetTimer, ChangeToNonQuick, Off
}

ChangeToNonQuick:
	ChangeScreen(lastScreen)
	Return

ChangeScreen(ScreenName)
{
	global stdout
	stdout.WriteLine("{""name"": ""screen"", ""value"": """ . ScreenName . """}")
	stdout.__Handle() # = Flush
}
