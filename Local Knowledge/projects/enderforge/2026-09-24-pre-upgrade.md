# Pre-upgrade settings capture

Captured 2026-09-24 18:58 Europe/London via OctoPrint. Commands: M115, M503, M119. Printer idle; no motion, heating, EEPROM writes or firmware flash. Serial logging enabled briefly then restored. This is a runtime settings report, not a firmware image backup or proof of saved EEPROM contents.

~~~text
2026-09-24 18:58:40,379 - Send: M115
2026-09-24 18:58:40,381 - Recv: FIRMWARE_NAME:Marlin 2.0.7.2 (Feb  4 2021 11:33:37) SOURCE_CODE_URL:https://github.com/MarlinFirmware/Marlin PROTOCOL_VERSION:1.0 MACHINE_TYPE:Ender-5 EXTRUDER_COUNT:1 UUID:[redacted]
2026-09-24 18:58:40,388 - Recv: Cap:SERIAL_XON_XOFF:0
2026-09-24 18:58:40,389 - Recv: Cap:BINARY_FILE_TRANSFER:0
2026-09-24 18:58:40,389 - Recv: Cap:EEPROM:1
2026-09-24 18:58:40,389 - Recv: Cap:VOLUMETRIC:1
2026-09-24 18:58:40,390 - Recv: Cap:AUTOREPORT_TEMP:1
2026-09-24 18:58:40,390 - Recv: Cap:PROGRESS:0
2026-09-24 18:58:40,390 - Recv: Cap:PRINT_JOB:1
2026-09-24 18:58:40,391 - Recv: Cap:AUTOLEVEL:0
2026-09-24 18:58:40,391 - Recv: Cap:RUNOUT:0
2026-09-24 18:58:40,391 - Recv: Cap:Z_PROBE:0
2026-09-24 18:58:40,391 - Recv: Cap:LEVELING_DATA:1
2026-09-24 18:58:40,391 - Recv: Cap:BUILD_PERCENT:1
2026-09-24 18:58:40,391 - Recv: Cap:SOFTWARE_POWER:0
2026-09-24 18:58:40,392 - Recv: Cap:TOGGLE_LIGHTS:0
2026-09-24 18:58:40,392 - Recv: Cap:CASE_LIGHT_BRIGHTNESS:0
2026-09-24 18:58:40,392 - Recv: Cap:EMERGENCY_PARSER:1
2026-09-24 18:58:40,393 - Recv: Cap:PROMPT_SUPPORT:0
2026-09-24 18:58:40,393 - Recv: Cap:SDCARD:1
2026-09-24 18:58:40,393 - Recv: Cap:AUTOREPORT_SD_STATUS:0
2026-09-24 18:58:40,393 - Recv: Cap:LONG_FILENAME:1
2026-09-24 18:58:40,393 - Recv: Cap:THERMAL_PROTECTION:1
2026-09-24 18:58:40,393 - Recv: Cap:MOTION_MODES:0
2026-09-24 18:58:40,394 - Recv: Cap:ARCS:0
2026-09-24 18:58:40,394 - Recv: Cap:BABYSTEPPING:1
2026-09-24 18:58:40,394 - Recv: Cap:CHAMBER_TEMPERATURE:0
2026-09-24 18:58:40,394 - Recv: ok
2026-09-24 18:58:40,394 - Send: M503
2026-09-24 18:58:40,408 - Recv: echo:  G21    ; Units in mm (mm)
2026-09-24 18:58:40,408 - Recv: echo:  M149 C ; Units in Celsius
2026-09-24 18:58:40,408 - Recv: 
2026-09-24 18:58:40,408 - Recv: echo:; Filament settings: Disabled
2026-09-24 18:58:40,409 - Recv: echo:  M200 S0 D1.75
2026-09-24 18:58:40,409 - Recv: echo:; Steps per unit:
2026-09-24 18:58:40,409 - Recv: echo: M92 X80.00 Y80.00 Z400.00 E93.00
2026-09-24 18:58:40,409 - Recv: echo:; Maximum feedrates (units/s):
2026-09-24 18:58:40,409 - Recv: echo:  M203 X500.00 Y500.00 Z5.00 E60.00
2026-09-24 18:58:40,410 - Recv: echo:; Maximum Acceleration (units/s2):
2026-09-24 18:58:40,410 - Recv: echo:  M201 X500.00 Y500.00 Z100.00 E5000.00
2026-09-24 18:58:40,410 - Recv: echo:; Acceleration (units/s2): P<print_accel> R<retract_accel> T<travel_accel>
2026-09-24 18:58:40,410 - Recv: echo:  M204 P500.00 R1000.00 T500.00
2026-09-24 18:58:40,411 - Recv: echo:; Advanced: B<min_segment_time_us> S<min_feedrate> T<min_travel_feedrate> J<junc_dev>
2026-09-24 18:58:40,411 - Recv: echo:  M205 B20000.00 S0.00 T0.00 J0.08
2026-09-24 18:58:40,411 - Recv: echo:; Home offset:
2026-09-24 18:58:40,411 - Recv: echo:  M206 X0.00 Y0.00 Z0.00
2026-09-24 18:58:40,411 - Recv: echo:; Mesh Bed Leveling:
2026-09-24 18:58:40,412 - Recv: echo:  M420 S0 Z0.00
2026-09-24 18:58:40,412 - Recv: echo:; Material heatup parameters:
2026-09-24 18:58:40,412 - Recv: echo:  M145 S0 H200 B60 F255
2026-09-24 18:58:40,412 - Recv: echo:  M145 S1 H235 B80 F255
2026-09-24 18:58:40,412 - Recv: echo:; PID settings:
2026-09-24 18:58:40,413 - Recv: echo:  M301 P21.73 I1.54 D76.55
2026-09-24 18:58:40,413 - Recv: ; Controller Fan
2026-09-24 18:58:40,413 - Recv: echo:  M710 S255 I0 A1 D60 ; (100% 0%)
2026-09-24 18:58:40,413 - Recv: echo:; Power-Loss Recovery:
2026-09-24 18:58:40,413 - Recv: echo:  M413 S1
2026-09-24 18:58:40,413 - Recv: echo:; Stepper driver current:
2026-09-24 18:58:40,413 - Recv: echo:  M906 X580 Y580 Z580
2026-09-24 18:58:40,414 - Recv: echo:  M906 T0 E650
2026-09-24 18:58:40,414 - Recv: 
2026-09-24 18:58:40,414 - Recv: echo:; Driver stepping mode:
2026-09-24 18:58:40,414 - Recv: echo:  M569 S1 X Y Z
2026-09-24 18:58:40,414 - Recv: echo:  M569 S1 T0 E
2026-09-24 18:58:40,414 - Recv: echo:; Filament load/unload lengths:
2026-09-24 18:58:40,415 - Recv: echo:  M603 L350.00 U550.00
2026-09-24 18:58:40,415 - Recv: ok
2026-09-24 18:58:40,415 - Send: M119
2026-09-24 18:58:40,435 - Recv: Reporting endstop status
2026-09-24 18:58:40,435 - Recv: x_max: open
2026-09-24 18:58:40,435 - Recv: y_max: open
2026-09-24 18:58:40,436 - Recv: z_min: open
2026-09-24 18:58:40,436 - Recv: ok
2026-09-24 18:58:40,436 - Send: M155 S2
2026-09-24 18:58:40,436 - Recv: ok
~~~
